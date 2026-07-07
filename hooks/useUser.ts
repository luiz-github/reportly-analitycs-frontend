import { useUserContext } from '@/contexts/userProvider'

export function useUser() {
  const { user, loading, refetchUser, logout } = useUserContext()
  return { user, loading, refetchUser, logout }
}