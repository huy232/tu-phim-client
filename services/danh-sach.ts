import { API } from "@/constants"

export async function fetchFilmListFromBackend(
	slug: string,
	queryString: string = "",
) {
	try {
		const backendUrl = `${API}/danh-sach/${slug}${queryString ? `?${queryString}` : ""}`

		const res = await fetch(backendUrl, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			next: { revalidate: 10800 },
		})

		if (!res.ok) return null
		return await res.json()
	} catch (error) {
		console.error(`❌ Lỗi linh mạch tại slug ${slug}:`, error)
		return null
	}
}
