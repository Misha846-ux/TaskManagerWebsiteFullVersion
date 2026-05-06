import type { UserUpdate, AvatarPut } from "../Domain/User";
import { getAccessToken } from "./LocalStorageMethods";

const API_URL = import.meta.env.VITE_API_URL + "/User";

export async function getAllUsers(): Promise<Response> {
    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        credentials: "include",
    })
    return response
}

export async function getUsersPaginated(count: number, side: number): Promise<Response> {
    const response = await fetch(
        `${API_URL}/Filtred?count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
            credentials: "include",
        }
    )

    return response
}

export async function searchUsersPaginated(name: string, count: number, side: number): Promise<Response> {
    const response = await fetch(
        `${API_URL}/Filtred/SearchByName?name=${encodeURIComponent(name)}&count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
            credentials: "include",
        }
    )

    return response
}

export async function searchUsersByName(name: string): Promise<Response> {
    const response = await fetch(`${API_URL}/SearchByName/${encodeURIComponent(name)}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
            credentials: "include",
        }
    )

    return response
}

export async function getUserById(id: number): Promise<Response> {
    const response = await fetch(`${API_URL}/ById/${id}`, {
        method: "GET",
        headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        credentials: "include",
    })

    return response
}

export async function getUserByEmail(email: string): Promise<Response> {
    const response = await fetch(`${API_URL}/ByEmail/${encodeURIComponent(email)}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
            credentials: "include",
        }
    )

    return response
}

export async function getMe(): Promise<Response> {
    const response = await fetch(`${API_URL}/Get/Myself`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        credentials: "include",
    })

    return response
}

export async function getUserAvatar(id: number): Promise<Response> {
    const response = await fetch(`${API_URL}/Get/Avatar/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        credentials: "include",
    })

    return response
    //return response.blob()
}

export async function deleteUserByAdmin(id: number): Promise<Response> {
    const response = await fetch(`${API_URL}/DeleteForAdmin${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        credentials: "include",
    })

    return response
}

export async function deleteMe(): Promise<Response> {
    const response = await fetch(`${API_URL}/Delete`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        credentials: "include",
    })

    return response
}

export async function updateUserByAdmin(user: UserUpdate): Promise<Response> {
    const response = await fetch(`${API_URL}/UpdateForAdmin`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
    })

    return response
}

export async function updateMe(user: UserUpdate): Promise<Response> {
    const response = await fetch(`${API_URL}/Update`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
    })

    return response
}

export async function updateAvatar(avatar: AvatarPut): Promise<Response> {
    const formData = new FormData()
    formData.append("UserAvata", avatar.UserAvata)

    const response = await fetch(`${API_URL}/Update/UserAvatar`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
        body: formData,
    })

    return response
}