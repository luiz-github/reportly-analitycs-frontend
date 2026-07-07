import deleteClient from "@/services/clients/deleteClient";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteClient(refetch: () => void) {
    const [loading, setLoading] = useState(false);

    async function handleDeleteClient(client_id: number) {
        setLoading(true);
        try {
            await deleteClient(client_id);
            refetch();
            toast.success("Client deleted successfully");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Delete client failed");
        } finally {
            setLoading(false);
        }
    }

    return { handleDeleteClient, loading };
}