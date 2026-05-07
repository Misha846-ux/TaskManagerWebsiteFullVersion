import type { CompanyGet, CompanyOfUserUpdate, 
    CompanyPost, CompanyUpdate, CompanyUserGet } from "../../Domain/Company";
import { getAccessToken } from "../LocalStorageMethods";

const API_URL = import.meta.env.VITE_API_URL + "/Company";

export async function getAllCompanies(): Promise<CompanyGet[]> {

    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: CompanyGet[] = await response.json()
    data.map(d => d.CreatedAt = new Date(d.CreatedAt))

    return data
}

export async function getCompaniesPaginated(count: number, side: number): Promise<CompanyGet[]> {

    const response = await fetch(`${API_URL}/Filtred?count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: CompanyGet[] = await response.json()
    data.map(d => d.CreatedAt = new Date(d.CreatedAt))

    return data
}

export async function getMyCompanies(): Promise<CompanyGet[]> {

    const response = await fetch(`${API_URL}/MyCompanies`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: CompanyGet[] = await response.json()
    data.map(d => d.CreatedAt = new Date(d.CreatedAt))

    return data
}

export async function getMyCompaniesPaginated(count: number, side: number): Promise<CompanyGet[]> {

    const response = await fetch(`${API_URL}/Filtred/MyCompanies?count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: CompanyGet[] = await response.json()
    data.map(d => d.CreatedAt = new Date(d.CreatedAt))

    return data
}

export async function getCompanyById(id: number): Promise<CompanyGet> {

    const response = await fetch(`${API_URL}/ById/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: CompanyGet = await response.json()
    data.CreatedAt = new Date(data.CreatedAt)

    return data
}

export async function getMyCompanyById(id: number): Promise<CompanyGet> {

    const response = await fetch(`${API_URL}/MyCompanyById/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: CompanyGet = await response.json()
    data.CreatedAt = new Date(data.CreatedAt)

    return data
}

export async function getCompanyUsers(companyId: number): Promise<CompanyUserGet[]> {

    const response = await fetch(`${API_URL}/Get/Users/${companyId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: CompanyUserGet[] = await response.json()

    return data
}

export async function addCompany(company: CompanyPost): Promise<CompanyPost> {

    const response = await fetch(`${API_URL}/AddCompany`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(company),
    })

    let data: CompanyPost = await response.json()

    return data
}

export async function deleteCompanyByAdmin(id: number): Promise<void> {

    const response = await fetch(`${API_URL}/DeleteForAdmin/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })
}

export async function deleteCompanyById(id: number): Promise<void> {

    const response = await fetch(`${API_URL}/Delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })
}

export async function deleteCompanyUserById(id: number): Promise<void> {

    const response = await fetch(`${API_URL}/Delete/User/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })
}

export async function updateCompanyForAdmin(company: CompanyUpdate): Promise<number> {

    const response = await fetch(`${API_URL}/UpdateForAdmin`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(company),
    })

    let data: number = await response.json()

    return data
}

export async function updateCompanyUser(company: CompanyOfUserUpdate): Promise<void> {

    const response = await fetch(`${API_URL}/AddUser`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(company),
    })
}

export async function updateCompany(company: CompanyUpdate): Promise<void> {
    const response = await fetch(`${API_URL}/UpdateCompany`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(company),
    })
}