import { fetchWithRefresh } from "@/lib/fetchWithRefresh";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function deleteClient(client_id: number) {
    
    const response = await fetchWithRefresh(`${BASE_URL}/clients/delete/${client_id}/`, {
        method: "DELETE",
        cache: "no-store",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail ?? "Delete client failed");
    }

    return response.json();
}