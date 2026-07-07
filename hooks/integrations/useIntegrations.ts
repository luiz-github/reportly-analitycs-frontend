import { CONNECT_HANDLES } from "@/constants/integrations"
import disconnectIntegration from "@/services/integration/disconnectIntegration"
import listAllIntegrations from "@/services/integration/listAllIntegrations"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function useIntegrations() {
    const [integrations, setIntegrations] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function fetchIntegrations() {
        setLoading(true)
        setError(null)

        try {
            const response = await listAllIntegrations()

            if (response) setIntegrations(response)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleDisconnectIntegration(integration_id: number, integration_name: string) {
        setLoading(true)
        setError(null)

        try {
            await disconnectIntegration(integration_id)
            fetchIntegrations()
            toast.success(`${integration_name} disconnected successfully`);
        } catch (err: any) {
            toast.error(`Failed to disconnect ${integration_name}`);
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleConnectIntegration(integration_name: string, integration_key: string) {
        setLoading(true)
        setError(null)

        try {
            await CONNECT_HANDLES[integration_key as keyof typeof CONNECT_HANDLES]?.();
        } catch (err: any) {
            toast.error(`Failed to connect ${integration_name}`);
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchIntegrations()
    }, [])

    return { handleConnectIntegration, handleDisconnectIntegration, integrations, loading, error, refetch: fetchIntegrations }
}