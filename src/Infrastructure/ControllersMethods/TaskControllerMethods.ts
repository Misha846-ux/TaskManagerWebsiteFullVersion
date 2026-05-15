import type { TaskGet, TaskPost, TaskUpdate } from "../../Domain/Task";
import type { UserGet } from "../../Domain/User";
import { getAccessToken } from "../LocalStorageMethods";

const API_URL = import.meta.env.VITE_API_URL + "/Task";

export async function getAllTasksAdmin(): Promise<TaskGet[]> {

    const response = await fetch(`${API_URL}/admin/GetAll`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: TaskGet[] = await response.json();
    data.map(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    })

    return data;
}

export async function getTasksByProject(projectId: number): Promise<TaskGet[]> {
    try{
        const response = await fetch(`${API_URL}/GetByProjectId/${projectId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
        )
        if(response.status === 404) {
            throw new Error("Task not found");
        }

        let data: TaskGet[] = await response.json();
        data.map(d => {
            d.createdAt = new Date(d.createdAt);
            d.deadLine = new Date(d.deadLine);
        })

        return data;
    }
    catch(error) {
        return [];
    }
}

export async function getAllTasksPaginated(count: number, side: number): Promise<TaskGet[]> {
    const response = await fetch(`${API_URL}/Filtred?count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: TaskGet[] = await response.json();
    data.map(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    })

    return data;
}

export async function getTasksByProjectPaginated(
    projectId: number, count: number, side: number): Promise<TaskGet[]> {
    const response = await fetch(
        `${API_URL}/FiltredWithProjectId?projectId=${projectId}&count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: TaskGet[] = await response.json();
    data.map(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    })

    return data;
}

export async function getTasksByNamePaginated(
    name: string, projectId: number, count: number, side: number): Promise<TaskGet[]> {

    const response = await fetch(
        `${API_URL}/Filtred/SearchByName?name=${encodeURIComponent(name)}&projectId=${projectId}&count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: TaskGet[] = await response.json();
    data.map(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    })

    return data;
}

export async function getTasksByUserId(userId: number): Promise<TaskGet[]> {
    try{
        const response = await fetch(`${API_URL}/user/GetAllById/${userId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
        )
        if(response.status === 404) {
            throw new Error("Task not found");
        }

        let data: TaskGet[] = await response.json();
        data.map(d => {
            d.createdAt = new Date(d.createdAt);
            d.deadLine = new Date(d.deadLine);
        })

        return data;
    }
    catch(error) {
        return [];
    }
}

export async function getTaskByIdAdmin(id: number): Promise<TaskGet> {
    const response = await fetch(`${API_URL}/admin/GetById/${id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: TaskGet = await response.json();
    data.createdAt = new Date(data.createdAt);
    data.deadLine = new Date(data.deadLine);

    return data;
}

export async function getTasksByName(name: string, projectId: number): Promise<TaskGet[]> {
    const response = await fetch(
        `${API_URL}/GetByName/${encodeURIComponent(name)}?projectId=${projectId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: TaskGet[] = await response.json();
    data.map(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    })

    return data;
}

export async function getTasksByDeadline(date: string, projectId: number): Promise<TaskGet[]> {
    const response = await fetch(`${API_URL}/GetByDate/${date}?projectId=${projectId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: TaskGet[] = await response.json();
    data.map(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    })

    return data;
}

export async function getTasksByStatus(status: string, projectId: number): Promise<TaskGet[]> {
    const response = await fetch(`${API_URL}/GetByStatus/${status}?projectId=${projectId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: TaskGet[] = await response.json();
    data.map(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    })

    return data;
}

export async function createTask(task: TaskPost): Promise<number> {

    const response = await fetch(`${API_URL}/AddTask`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(task),
    })

    let data: number = await response.json();

    return data;
}

export async function updateTaskAdmin(id: number, dto: TaskUpdate): Promise<TaskGet> {

    const response = await fetch(`${API_URL}/admin/UpdateById/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(dto),
        }
    )

    let data: TaskGet = await response.json();
    data.createdAt = new Date(data.createdAt);
    data.deadLine = new Date(data.deadLine);

    return data;
}

export async function updateTaskUser(id: number, dto: TaskUpdate): Promise<TaskGet> {

    const response = await fetch(`${API_URL}/user/UpdateById/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(dto),
        }
    )

    let data: TaskGet = await response.json();
    data.createdAt = new Date(data.createdAt);
    data.deadLine = new Date(data.deadLine);
    
    return data;
}

export async function deleteTaskAdmin(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/admin/DeleteById/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )
}

export async function deleteTaskUser(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/user/DeleteById/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )
}