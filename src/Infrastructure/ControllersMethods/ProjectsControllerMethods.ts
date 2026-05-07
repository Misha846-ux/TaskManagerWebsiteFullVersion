import type { ProjectGet, ProjectPost, ProjectUpdate } from "../../Domain/Project";
import type { UserGet } from "../../Domain/User";
import { getAccessToken } from "../LocalStorageMethods";

const API_URL = import.meta.env.VITE_API_URL + "/Projects";

export async function getAllProjects(): Promise<ProjectGet[]> {

    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: ProjectGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt));

    return data;
}

export async function getProjectsPaginated(count: number, side: number): Promise<ProjectGet[]> {

    const response = await fetch(`${API_URL}/filtered?count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: ProjectGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt));

    return data;
}

export async function getProjectById(id: number): Promise<ProjectGet> {

    const response = await fetch(`${API_URL}/Get/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: ProjectGet = await response.json();
    data.CreatedAt = new Date(data.CreatedAt);

    return data;
}

export async function getProjectsByName(name: string): Promise<ProjectGet[]> {

    const response = await fetch(`${API_URL}/by-name/${encodeURIComponent(name)}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )
    
    let data: ProjectGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt));

    return data;
}

export async function getMyProjectById(projectId: number): Promise<ProjectGet> {

    const response = await fetch(`${API_URL}/my/${projectId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: ProjectGet = await response.json();
    data.CreatedAt = new Date(data.CreatedAt);

    return data;
}

export async function getMyProjectsByName(name: string): Promise<ProjectGet[]> {
    const response = await fetch(`${API_URL}/my/by-name/${encodeURIComponent(name)}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: ProjectGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt));

    return data;
}

export async function getProjectsByCompanyId(companyId: number): Promise<ProjectGet[]> {

    const response = await fetch(`${API_URL}/by-company/${companyId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: ProjectGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt));

    return data;
}

export async function getProjectsByCompanyPaginated(
    companyId: number, count: number, side: number): Promise<ProjectGet[]> {
    const response = await fetch(
        `${API_URL}/by-company/${companyId}/filtered?count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: ProjectGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt));

    return data;
}

export async function getMyProjects(): Promise<ProjectGet[]> {

    const response = await fetch(`${API_URL}/my-projects`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: ProjectGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt));

    return data;
}

export async function getMyProjectsPaginated(count: number, side: number): Promise<ProjectGet[]> {

    const response = await fetch(`${API_URL}/my-projects/filtered?count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: ProjectGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt));

    return data;
}

export async function getProjectUsers(projectId: number): Promise<UserGet[]> {
    const response = await fetch(`${API_URL}/${projectId}/users`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: UserGet[] = await response.json();
    data.map(d => d.CreatedAt = new Date(d.CreatedAt));

    return data;
}

export async function createProject(dto: ProjectPost): Promise<number> {

    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dto),
    })

    let data: number = await response.json();

    return data;
}

export async function updateProject(
    id: number, newProject: ProjectUpdate): Promise<number> {

    const response = await fetch(`${API_URL}/Update/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newProject),
    })

    let data: number = await response.json();
    return data;
}

export async function updateMyProject(
    id: number, newProject: ProjectUpdate): Promise<number> {

    const response = await fetch(`${API_URL}/Update/my/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newProject),
    })

    let data: number = await response.json();
    return data;
}

export async function deleteProject(id: number): Promise<number> {

    const response = await fetch(`${API_URL}/Delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: number = await response.json();

    return data;
}

export async function deleteMyProject(id: number): Promise<number> {

    const response = await fetch(`${API_URL}/Delete/my/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: number = await response.json();
    return data;
}