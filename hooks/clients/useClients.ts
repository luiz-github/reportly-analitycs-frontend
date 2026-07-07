import { useClientsContext } from '@/contexts/clientProvider'

export function useClients() {
  const { clients, loading, error, refetch } = useClientsContext()
  return { clients, loading, error, refetch }
}