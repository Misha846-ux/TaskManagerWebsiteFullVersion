import type { ProjectGet, ProjectPost, ProjectUpdate } from "../../Domain/Project";
import type { UserGet } from "../../Domain/User";
import { api } from "../ErrorHandler";


const API_URL = import.meta.env.VITE_API_URL + "/Projects";




export async function getAllProjects(): Promise<ProjectGet[]> {

    const response = await api.get<ProjectGet[]>(API_URL);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function getProjectsPaginated(count: number,side: number): Promise<ProjectGet[]> {

    const response = await api.get<ProjectGet[]>(`${API_URL}/filtered`,
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



export async function getProjectById(id: number): Promise<ProjectGet> {

    const response = await api.get<ProjectGet>(`${API_URL}/Get/${id}`);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);

    return data;
}



export async function getProjectsByName(name: string): Promise<ProjectGet[]> {

    const response = await api.get<ProjectGet[]>(`${API_URL}/by-name/${encodeURIComponent(name)}`);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function getMyProjectById(projectId: number): Promise<ProjectGet> {

    const response = await api.get<ProjectGet>(`${API_URL}/my/${projectId}`);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);

    return data;
}



export async function getMyProjectsByName(name: string): Promise<ProjectGet[]> {

    const response = await api.get<ProjectGet[]>(`${API_URL}/my/by-name/${encodeURIComponent(name)}`);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function getProjectsByCompanyId(companyId: number): Promise<ProjectGet[]> {

    const response = await api.get<ProjectGet[]>(`${API_URL}/by-company/${companyId}`);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function getProjectsByCompanyPaginated(companyId: number, count: number,
    side: number): Promise<ProjectGet[]> {

    const response = await api.get<ProjectGet[]>(`${API_URL}/by-company/${companyId}/filtered`,
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



export async function getMyProjects(): Promise<ProjectGet[]> {

    const response = await api.get<ProjectGet[]>(`${API_URL}/my-projects`);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function getMyProjectsPaginated(count: number, side: number): Promise<ProjectGet[]> {

    const response = await api.get<ProjectGet[]>(`${API_URL}/my-projects/filtered`,
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



export async function getProjectUsers(projectId: number): Promise<UserGet[]> {

    const response = await api.get<UserGet[]>(`${API_URL}/${projectId}/users`);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function createProject(dto: ProjectPost): Promise<number> {

    const response = await api.post<number>(API_URL, dto);

    return response.data;
}



export async function updateProject(id: number, newProject: ProjectUpdate): Promise<number> {

    const response = await api.put<number>(`${API_URL}/Update/${id}`, newProject);

    return response.data;
}



export async function updateMyProject(id: number, newProject: ProjectUpdate): Promise<number> {

    const response = await api.put<number>(`${API_URL}/Update/my/${id}`, newProject);

    return response.data;
}



export async function deleteProject(id: number): Promise<number> {

    const response = await api.delete<number>(`${API_URL}/Delete/${id}`);

    return response.data;
}



export async function deleteMyProject(id: number): Promise<number> {

    const response = await api.delete<number>(`${API_URL}/Delete/my/${id}`);

    return response.data;
}