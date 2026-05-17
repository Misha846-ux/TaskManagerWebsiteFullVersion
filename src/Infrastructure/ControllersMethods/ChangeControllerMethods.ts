import type { ChangeType } from "../../Domain/Change/Change";
import { api } from "../ErrorHandler";

const API_URL = import.meta.env.VITE_API_URL + "/Change";

export async function getChanges(): Promise<ChangeType[]> {
    const response = await api.get<ChangeType[]>(API_URL)
    return response.data;
}

export async function getUnreadChanges(): Promise<ChangeType[]> {

    const response = await api.get<ChangeType[]>(`${API_URL}/unread`);

    return response.data;
}



export async function getChangesPaginated(count: number, side: number): Promise<ChangeType[]> {
    const response = await api.get<ChangeType[]>(`${API_URL}/paginated`,
        {
            params: {
                count,
                side
            }
        }
    );

    return response.data;
}