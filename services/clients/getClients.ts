import { fetchWithRefresh } from "@/lib/fetchWithRefresh";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function getClients() {
    const response = await fetchWithRefresh(`${BASE_URL}/clients/all/`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail ?? "Get client failed");
    }

    return response.json();
}