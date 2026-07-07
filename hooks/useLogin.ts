import { useState } from "react"
import login from "@/services/auth/login"
import { LoginRequest } from "@/types/auth"

export function useLogin() {
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState<string | null>(null)

    async function handleLogin(data: LoginRequest) {
        setLoading(true)
        setError(null)

        try {
            if (!data.email || !data.password) {
                setError("Please fill in all fields")
                return
            }
            const response = await login(data)
            return response
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { handleLogin, loading, error }
}