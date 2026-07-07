import { fetchWithRefresh } from "@/lib/fetchWithRefresh"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default async function listAllIntegrations() {
    try {
        const response = await fetchWithRefresh(`${BASE_URL}/integrations/all/`, {
            credentials: "include",
            cache: "no-store",
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.detail || "List integrations failed")
        }

        return data

    } catch (error) {
        throw error
    }


}