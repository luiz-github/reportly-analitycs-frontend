const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default async function verify() {
    try {
        const response = await fetch(`${BASE_URL}/accounts/verify/`, {
            method:      "POST",
            headers:     { "Content-Type": "application/json" },
            credentials: "include",
        })

        const json = await response.json()

        if (!response.ok) {
            throw new Error(json.detail || "Verify failed")
        }

        return json
    } catch (error) {
        throw error
    }
}