import type {UserPost, UserLogin} from "../Domain/User"

const API_URL = import.meta.env.VITE_API_URL + "/Authorization";



export async function signUp(user: UserPost): Promise<Response> {
    const response = await fetch(`${API_URL}/SingUp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    return response;
}

export async function login(user: UserLogin): Promise<Response> {
    const response = await fetch(`${API_URL}/LogIn`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(user),
    });

    return response;
}

export async function refreshAccessToken(companyId: number): Promise<Response> {
    const response = await fetch(`${API_URL}/Refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(companyId),
    });
    return response;
}

export async function forgotPassword(email: string): Promise<Response> {
    const response = await fetch(`${API_URL}/ForgotPassword/GetToken${encodeURIComponent(email)}`, {
        method: "PUT",
        credentials: "include"
    });
    return response;
}

export async function loginWithRecoveryToken(user: UserLogin): Promise<Response> {
    const response = await fetch(`${API_URL}/ForgotPassword/LoginWithToken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(user),
    });

    return response;
}

export async function getMyCompanies(): Promise<Response> {
    const response = await fetch(`${API_URL}/MyCompanies`, {
        method: "GET",
        credentials: "include", 
    });

    return response;
}

