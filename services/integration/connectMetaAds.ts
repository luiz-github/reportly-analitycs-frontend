import { fetchWithRefresh } from "@/lib/fetchWithRefresh"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default async function connectMetaAds() {
  const response = await fetchWithRefresh(`${BASE_URL}/integrations/meta/connect/`, {
    credentials: "include",
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Meta Ads connection failed")
  }

  const data = await response.json()

  if (!data.redirect_url) {
    throw new Error("No redirect URL returned from server")
  }

  window.location.href = data.redirect_url
}