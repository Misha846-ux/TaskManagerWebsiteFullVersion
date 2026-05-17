import axios from "axios";
import {
    getAccessToken,
    getCompanyId,
    setAccessToken
} from "./LocalStorageMethods";

import { refreshAccessToken } from "./ControllersMethods/AuthorizationControllerMethods";

export const api = axios.create({
    withCredentials: true,
});


api.interceptors.request.use(config => {

    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});



// ОБРАБОТКА ОШИБОК
api.interceptors.response.use(
    response => response,

    async error => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {

                const newToken = await refreshAccessToken(
                    getCompanyId()
                );

                setAccessToken(newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);

            } catch {

                localStorage.removeItem("accessToken");

                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);