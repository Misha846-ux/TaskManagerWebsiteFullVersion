import type { TaskGet, TaskPost, TaskUpdate } from "../../Domain/Task";
import { api } from "../ErrorHandler";

const API_URL = import.meta.env.VITE_API_URL + "/Task";

export async function getAllTasksAdmin(): Promise<TaskGet[]> {

    const response = await api.get<TaskGet[]>(`${API_URL}/admin/GetAll`);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    });

    return data;
}



export async function getTasksByProject(projectId: number): Promise<TaskGet[]> {

    try {

        const response = await api.get<TaskGet[]>(`${API_URL}/GetByProjectId/${projectId}`);

        const data = response.data;

        data.forEach(d => {
            d.createdAt = new Date(d.createdAt);
            d.deadLine = new Date(d.deadLine);
        });

        return data;

    } catch {

        return [];
    }
}



export async function getAllTasksPaginated(count: number, side: number): Promise<TaskGet[]> {

    const response = await api.get<TaskGet[]>(`${API_URL}/Filtred`,
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
        d.deadLine = new Date(d.deadLine);
    });

    return data;
}



export async function getTasksByProjectPaginated(projectId: number, count: number, 
    side: number): Promise<TaskGet[]> {

    const response = await api.get<TaskGet[]>(`${API_URL}/FiltredWithProjectId`,
        {
            params: {
                projectId,
                count,
                side
            }
        }
    );

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    });

    return data;
}



export async function getTasksByNamePaginated(name: string, projectId: number,
    count: number, side: number): Promise<TaskGet[]> {

    const response = await api.get<TaskGet[]>(`${API_URL}/Filtred/SearchByName`,
        {
            params: {
                name,
                projectId,
                count,
                side
            }
        }
    );

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    });

    return data;
}



export async function getTasksByUserId(userId: number): Promise<TaskGet[]> {

    try {

        const response = await api.get<TaskGet[]>(`${API_URL}/user/GetAllById/${userId}`);

        const data = response.data;

        data.forEach(d => {
            d.createdAt = new Date(d.createdAt);
            d.deadLine = new Date(d.deadLine);
        });

        return data;

    } catch {

        return [];
    }
}



export async function getTaskByIdAdmin(id: number): Promise<TaskGet> {

    const response = await api.get<TaskGet>(`${API_URL}/admin/GetById/${id}`);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);
    data.deadLine = new Date(data.deadLine);

    return data;
}



export async function getTasksByName(name: string, projectId: number): Promise<TaskGet[]> {

    const response = await api.get<TaskGet[]>(`${API_URL}/GetByName/${encodeURIComponent(name)}`,
        {
            params: {
                projectId
            }
        }
    );

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    });

    return data;
}



export async function getTasksByDeadline(date: string, projectId: number): Promise<TaskGet[]> {

    const response = await api.get<TaskGet[]>(`${API_URL}/GetByDate/${date}`,
        {
            params: {
                projectId
            }
        }
    );

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    });

    return data;
}



export async function getTasksByStatus(status: string, projectId: number): Promise<TaskGet[]> {

    const response = await api.get<TaskGet[]>(`${API_URL}/GetByStatus/${status}`,
        {
            params: {
                projectId
            }
        }
    );

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
        d.deadLine = new Date(d.deadLine);
    });

    return data;
}



export async function createTask(task: TaskPost): Promise<number> {

    const response = await api.post<number>(`${API_URL}/AddTask`, task);

    return response.data;
}



export async function updateTaskAdmin(id: number, dto: TaskUpdate): Promise<TaskGet> {

    const response = await api.put<TaskGet>(`${API_URL}/admin/UpdateById/${id}`, dto);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);
    data.deadLine = new Date(data.deadLine);

    return data;
}



export async function updateTaskUser(id: number, dto: TaskUpdate): Promise<TaskGet> {

    const response = await api.put<TaskGet>(`${API_URL}/user/UpdateById/${id}`, dto);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);
    data.deadLine = new Date(data.deadLine);

    return data;
}



export async function deleteTaskAdmin(id: number): Promise<void> {

    await api.delete(`${API_URL}/admin/DeleteById/${id}`);
}



export async function deleteTaskUser(id: number): Promise<void> {

    await api.delete(`${API_URL}/user/DeleteById/${id}`);
}