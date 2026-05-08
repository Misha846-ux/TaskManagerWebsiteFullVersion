import type {UserPost, UserLogin} from "../../Domain/User"
import type { CompanyGet } from "../../Domain/Company";

const API_URL = import.meta.env.VITE_API_URL + "/Authorization";



export async function signUp(user: UserPost): Promise<Boolean> {
    const response = await fetch(`${API_URL}/SingUp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if(response.status != 201){
        return false;
    }

    return true;
}

export async function login(user: UserLogin): Promise<boolean> {
    const response = await fetch(`${API_URL}/LogIn`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(user),
    });

    if(!response.ok){
        return false;
    }
    return true;
}

export async function refreshAccessToken(companyId: number): Promise<string> {
    const response = await fetch(`${API_URL}/Refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(companyId),
    });

    let data: string = await response.json()

    return data;
}

export async function forgotPassword(email: string) {
    const response = await fetch(`${API_URL}/ForgotPassword/GetToken${encodeURIComponent(email)}`, {
        method: "PUT",
        credentials: "include"
    });
}

export async function loginWithRecoveryToken(user: UserLogin): Promise<Boolean> {
    const response = await fetch(`${API_URL}/ForgotPassword/LoginWithToken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(user),
    });

    if(!response.ok){
        return false;
    }
    return true;
}

export async function getMyCompanies(): Promise<CompanyGet[]> {
    const response = await fetch(`${API_URL}/MyCompanies`, {
        method: "GET",
        credentials: "include", 
    });

    let data: CompanyGet[] = await response.json()
    data.map(d => d.CreatedAt = new Date(d.CreatedAt))

    return data;
}

