"use client"

import getClients from "@/services/clients/getClients"
import { Client } from "@/types/client"
import { createContext, useContext, useEffect, useState } from "react"

interface ClientsContextType {
    clients:  Client[]
    loading:  boolean
    error:    string | null
    refetch:  () => void
}

const ClientsContext = createContext<ClientsContextType | null>(null)

export function ClientsProvider({ children }: { children: React.ReactNode }) {
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState<string | null>(null)

    async function handleGetClients() {
        setLoading(true)
        try {
            const data = await getClients()
            setClients(data)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetClients()
    }, [])

    return (
        <ClientsContext.Provider value={{ clients, loading, error, refetch: handleGetClients }}>
            {children}
        </ClientsContext.Provider>
    )
}

export function useClientsContext() {
    const context = useContext(ClientsContext)
    if (!context) throw new Error("useClients must be used within a ClientsProvider")
    return context
}