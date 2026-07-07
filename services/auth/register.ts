import { RegisterRequest } from "@/types/auth"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default async function register(data: RegisterRequest) {
    try {
        const response = await fetch(`${BASE_URL}/accounts/register/`, {
            method:      "POST",
            headers:     { "Content-Type": "application/json" },
            body:        JSON.stringify(data),
            credentials: "include",
        })

        const json = await response.json()

        if (!response.ok) {
            if (json["email"]) throw new Error(json.email)
            throw new Error(json.detail || "Registration failed")
        }

        return json
    } catch (error) {
        throw error
    }
}