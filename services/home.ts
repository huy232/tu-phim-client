import { API } from "@/constants"

export async function fetchHomeDataFromBackend() {
	try {
		const res = await fetch(`${API}/trang-chu`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			next: { revalidate: 3600 },
		})

		if (!res.ok) return null
		return await res.json()
	} catch (error) {
		console.error("❌ Error fetching home from Backend:", error)
		return null
	}
}
