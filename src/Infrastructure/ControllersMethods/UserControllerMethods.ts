import type { UserUpdate, AvatarPut, UserGet } from "../../Domain/User";
import { getAccessToken } from "../LocalStorageMethods";

const API_URL = import.meta.env.VITE_API_URL + "/User";

export async function getAllUsers(): Promise<UserGet[]> {
    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        credentials: "include",
    })

    let data: UserGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt))

    return data
}

export async function getUsersPaginated(count: number, side: number): Promise<UserGet[]> {
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

    let data: UserGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt))

    return data
}

export async function searchUsersByNamePaginated
(name: string, count: number, side: number): Promise<UserGet[]> {
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

    let data: UserGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt))

    return data
}

export async function searchUsersByName(name: string): Promise<UserGet[]> {
    const response = await fetch(`${API_URL}/SearchByName/${encodeURIComponent(name)}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
            credentials: "include",
        }
    )

    let data: UserGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt))

    return data
}

export async function getUserById(id: number): Promise<UserGet> {
    const response = await fetch(`${API_URL}/ById/${id}`, {
        method: "GET",
        headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        credentials: "include",
    })

    let data: UserGet = await response.json();
    data.CreatedAt = new Date(data.CreatedAt)

    return data
}

export async function getUserByEmail(email: string): Promise<UserGet> {
    const response = await fetch(`${API_URL}/ByEmail/${encodeURIComponent(email)}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
            credentials: "include",
        }
    )

    let data: UserGet = await response.json();

    return data
}

export async function getMe(): Promise<UserGet> {
    const response = await fetch(`${API_URL}/Get/Myself`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        credentials: "include",
    })

    let data: UserGet = await response.json();
    data.CreatedAt = new Date(data.CreatedAt)

    return data
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

export async function deleteUserByAdmin(id: number): Promise<number> {
    const response = await fetch(`${API_URL}/DeleteForAdmin/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        credentials: "include",
    })

    let data: number = await response.json()

    return data
}

export async function deleteMe() {
    const response = await fetch(`${API_URL}/Delete`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        credentials: "include",
    })
}

export async function updateUserByAdmin(user: UserUpdate): Promise<UserGet> {
    const response = await fetch(`${API_URL}/UpdateForAdmin`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
    })

    let data: UserGet = await response.json();
    data.CreatedAt = new Date(data.CreatedAt)

    return data
}

export async function updateMe(user: UserUpdate): Promise<UserGet> {
    const response = await fetch(`${API_URL}/Update`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
    })
    
    let data: UserGet = await response.json();
    data.CreatedAt = new Date(data.CreatedAt)
    
    return data
}

export async function updateAvatar(avatar: AvatarPut){
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
}