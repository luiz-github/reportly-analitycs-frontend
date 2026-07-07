import { useState } from "react"
import register from "@/services/auth/register"
import { RegisterRequest } from "@/types/auth"

export function useRegister() {
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState<string | null>(null)

    async function handleRegister(data: RegisterRequest) {
        setLoading(true)
        setError(null)

        try {
            if (!data.email || !data.password || !data.agency_name) {
                setError("Please fill in all fields")
                return
            }
            const response = await register(data)
            return response
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { handleRegister, loading, error }
}