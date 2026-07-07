const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchWithRefresh(url: string, options = {}) {
    let response = await fetch(url, { credentials: "include", ...options })

    if (response.status === 401) {
        await fetch(`${BASE_URL}/accounts/refresh/`, {
            method:      "POST",
            credentials: "include",
        })

        response = await fetch(url, { credentials: "include", ...options })
    }

    return response
}