import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { getAccessToken, getCompanyId, setAccessToken } from "./LocalStorageMethods";

const axi = axios.create({
    withCredentials: true,
});

interface RetryRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

const refreshUrl = `${import.meta.env.VITE_API_URL}/Authorization/Refresh`;

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
    refreshSubscribers.push(callback);
}

function onRefreshed(token: string) {
    refreshSubscribers.forEach(callback => callback(token));
    refreshSubscribers = [];
}

async function refreshToken(): Promise<string> {
    const companyId = getCompanyId();

    if (!companyId) {
        throw new Error("No companyId available for token refresh");
    }

    const response = await axios.post(refreshUrl, companyId, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    const accessToken = response.data?.accessToken;
    if (!accessToken) {
        throw new Error("Refresh endpoint did not return accessToken");
    }

    setAccessToken(accessToken);
    return accessToken;
}

axi.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token && config.headers) {
        const headers = config.headers as Record<string, unknown>;
        if (!headers.Authorization && !headers.authorization) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    config.withCredentials = true;
    return config;
});

axi.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig | undefined;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    subscribeTokenRefresh((token: string) => {
                        if (!token) {
                            reject(error);
                            return;
                        }
                        if (!originalRequest.headers) {
                            originalRequest.headers = {};
                        }
                        (originalRequest.headers as Record<string, unknown>).Authorization = `Bearer ${token}`;
                        resolve(axi(originalRequest));
                    });
                });
            }

            isRefreshing = true;
            try {
                const newToken = await refreshToken();
                onRefreshed(newToken);
                isRefreshing = false;

                if (originalRequest.headers) {
                    (originalRequest.headers as Record<string, unknown>).Authorization = `Bearer ${newToken}`;
                } else {
                    originalRequest.headers = { Authorization: `Bearer ${newToken}` };
                }

                return axi(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                onRefreshed("");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export async function apiRequest<T = any>(config: AxiosRequestConfig): Promise<T> {
    const response = await axi.request<T>(config);
    return response.data;
}

export { axi };