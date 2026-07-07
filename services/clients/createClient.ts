import { fetchWithRefresh } from "@/lib/fetchWithRefresh";
import { Client } from "@/types/client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function createClient(data: Client) {
    
    const response = await fetchWithRefresh(`${BASE_URL}/clients/new/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail ?? "Create client failed");
    }

    return response.json();
}