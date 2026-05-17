import type { CompanyGet, CompanyOfUserUpdate, 
    CompanyPost, CompanyUpdate, CompanyUserGet } from "../../Domain/Company";
import { api } from "../ErrorHandler";

const API_URL = import.meta.env.VITE_API_URL + "/Company";


export async function getAllCompanies(): Promise<CompanyGet[]> {

    const response = await api.get<CompanyGet[]>(API_URL);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function getCompaniesPaginated(count: number, side: number): Promise<CompanyGet[]> {
    const response = await api.get<CompanyGet[]>(
        `${API_URL}/Filtred`,
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



export async function getMyCompanies(): Promise<CompanyGet[]> {

    const response = await api.get<CompanyGet[]>(`${API_URL}/MyCompanies`);

    const data = response.data;

    data.forEach(d => {
        d.createdAt = new Date(d.createdAt);
    });

    return data;
}



export async function getMyCompaniesPaginated(count: number, side: number): Promise<CompanyGet[]> {

    const response = await api.get<CompanyGet[]>(
        `${API_URL}/Filtred/MyCompanies`,
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



export async function getCompanyById(id: number): Promise<CompanyGet> {

    const response = await api.get<CompanyGet>(`${API_URL}/ById/${id}`);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);

    return data;
}



export async function getMyCompanyById(id: number): Promise<CompanyGet> {

    const response = await api.get<CompanyGet>(`${API_URL}/MyCompanyById/${id}`);

    const data = response.data;

    data.createdAt = new Date(data.createdAt);

    return data;
}



export async function getCompanyUsers(companyId: number): Promise<CompanyUserGet[]> {

    const response = await api.get<CompanyUserGet[]>(`${API_URL}/Get/Users/${companyId}`);

    return response.data;
}



export async function addCompany(company: CompanyPost): Promise<CompanyPost> {

    const response = await api.post<CompanyPost>(`${API_URL}/AddCompany`, company);

    return response.data;
}



export async function deleteCompanyByAdmin(id: number): Promise<void> {

    await api.delete(`${API_URL}/DeleteForAdmin/${id}`);
}



export async function deleteCompanyById(id: number): Promise<void> {

    await api.delete(`${API_URL}/Delete/${id}`);
}



export async function deleteCompanyUserById(id: number): Promise<void> {

    await api.delete(`${API_URL}/Delete/User/${id}`);
}



export async function updateCompanyForAdmin(company: CompanyUpdate): Promise<number> {

    const response = await api.put<number>(`${API_URL}/UpdateForAdmin`, company);

    return response.data;
}



export async function updateCompanyUser(company: CompanyOfUserUpdate): Promise<void> {

    await api.put(`${API_URL}/AddUser`,company);
}



export async function updateCompany(company: CompanyUpdate): Promise<void> {

    await api.put(`${API_URL}/UpdateCompany`,company);
}