import { LoginRequest } from "@/types/auth"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default async function login(data: LoginRequest) {
    try {
        const response = await fetch(`${BASE_URL}/accounts/login/`, {
            method:      "POST",
            headers:     { "Content-Type": "application/json" },
            body:        JSON.stringify(data),
            credentials: "include",
        })

        const json = await response.json()

        if (!response.ok) {
            throw new Error(json.detail || "Login failed")
        }

        return json
    } catch (error) {
        throw error
    }
}