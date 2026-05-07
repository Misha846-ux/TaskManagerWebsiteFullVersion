import type { ChangeType } from "../../Domain/Change/Change";
import { getAccessToken } from "../LocalStorageMethods";

const API_URL = import.meta.env.VITE_API_URL + "/Change";

export async function getChanges(): Promise<ChangeType[]> {
    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: ChangeType[] = await response.json();

    return data;
}

export async function getUnreadChanges(): Promise<ChangeType[]> {

    const response = await fetch(`${API_URL}/unread`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
        credentials: "include",
    })

    let data: ChangeType[] = await response.json();

    return data;
}

export async function getChangesPaginated(
    count: number, side: number): Promise<ChangeType[]> {

    const response = await fetch(
        `${API_URL}/paginated?count=${count}&side=${side}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            credentials: "include",
        }
    )

    let data: ChangeType[] = await response.json();

    return data;
}