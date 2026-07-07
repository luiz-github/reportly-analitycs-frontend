import createClient from "@/services/clients/createClient";
import { Client } from "@/types/client";
import { useState } from "react";
import { toast } from "sonner";

export function useCreateClient(refetch: () => void) {
    const [loading, setLoading] = useState(false);

    async function handleCreateClient(data: Client) {
        setLoading(true);
        try {
            await createClient(data);
            refetch();
            toast.success("Client created successfully");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Create client failed");
        } finally {
            setLoading(false);
        }
    }

    return { handleCreateClient, loading };
}