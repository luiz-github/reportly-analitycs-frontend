import { fetchWithRefresh } from "@/lib/fetchWithRefresh"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default async function logout() {
    try {
        const response = await fetchWithRefresh(`${BASE_URL}/accounts/logout/`, {
            method:      "POST",
            credentials: "include",
        })

        if (!response.ok) {
            throw new Error("Logout failed")
        }

        return
    } catch (error) {
        throw error
    }
}