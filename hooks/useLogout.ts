'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import logout from '@/services/auth/logout'

export function useLogout() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown>(null)

    async function handleLogout() {
        setLoading(true)
        setError(null)

        try {
            await logout()
            setUser(null)
            router.push('/login')
        } catch (err) {
            console.error('Erro no logout:', err)
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return { handleLogout, loading, error }
}