import { fetchWithRefresh } from "@/lib/fetchWithRefresh"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default async function disconnectIntegration(integration_id: number) {
  const response = await fetchWithRefresh(`${BASE_URL}/integrations/disconnect/${integration_id}/`, {
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
  })

  if (response.status !== 204) {
    throw new Error("Disconnection failed")
  }
}