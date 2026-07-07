import { fetchWithRefresh } from "@/lib/fetchWithRefresh";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default async function getCurrentUser() {

    try {
        const response = await fetchWithRefresh(`${BASE_URL}/accounts/me/`, {
            cache: "no-store",
        });

        const json = await response.json()
        if (!response.ok) {
            throw new Error(json.detail || "Get current user failed")
        }
        
        return json
    } catch (error) {
        throw error
    }
}