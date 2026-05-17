import type { UserUpdate, AvatarPut, UserGet } from "../../Domain/User";
import { api } from "../ErrorHandler";

const API_URL = import.meta.env.VITE_API_URL + "/User";

export async function getAllUsers(): Promise<UserGet[]> {

    const response = await api.get<UserGet[]>(API_URL);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function getUsersPaginated(count: number, side: number): Promise<UserGet[]> {

    const response = await api.get<UserGet[]>(`${API_URL}/Filtred`,
        {
            params: {
                count,
                side
            }
        }
    );

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function searchUsersByNamePaginated(name: string, count: number,
    side: number): Promise<UserGet[]> {

    const response = await api.get<UserGet[]>(`${API_URL}/Filtred/SearchByName`,
        {
            params: {
                name,
                count,
                side
            }
        }
    );

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function searchUsersByName(name: string): Promise<UserGet[]> {

    const response = await api.get<UserGet[]>(`${API_URL}/SearchByName/${encodeURIComponent(name)}`);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function getUserById(id: number): Promise<UserGet> {

    const response = await api.get<UserGet>(`${API_URL}/ById/${id}`);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);

    return data;
}



export async function getUserByEmail(email: string): Promise<UserGet> {

    const response = await api.get<UserGet>(`${API_URL}/ByEmail/${encodeURIComponent(email)}`);

    return response.data;
}



export async function getMe(): Promise<UserGet> {

    const response = await api.get<UserGet>(`${API_URL}/Get/Myself`);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);

    return data;
}



export async function getUserAvatar(id: number): Promise<Blob> {

    const response = await api.get(`${API_URL}/Get/Avatar/${id}`,
        {
            responseType: "blob"
        }
    );

    return response.data;
}



export async function deleteUserByAdmin(id: number): Promise<number> {

    const response = await api.delete<number>(`${API_URL}/DeleteForAdmin/${id}`);

    return response.data;
}



export async function deleteMe(): Promise<void> {

    await api.delete(`${API_URL}/Delete`);
}



export async function updateUserByAdmin(user: UserUpdate): Promise<UserGet> {

    const response = await api.put<UserGet>(`${API_URL}/UpdateForAdmin`, user);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);

    return data;
}



export async function updateMe(user: UserUpdate): Promise<UserGet> {

    const response = await api.put<UserGet>(`${API_URL}/Update`, user);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);

    return data;
}



export async function updateAvatar(avatar: AvatarPut): Promise<void> {

    const formData = new FormData();

    formData.append(
        "userAvata",
        avatar.userAvata
    );

    await api.put(`${API_URL}/Update/UserAvatar`, formData);
}