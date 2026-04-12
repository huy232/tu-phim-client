import { API } from "@/constants"

export async function fetchTopAnimeFromBackend() {
	try {
		const res = await fetch(`${API}/top-hoat-hinh`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			next: { revalidate: 10800 },
		})

		if (!res.ok) return null
		return await res.json()
	} catch (error) {
		console.error("❌ Lỗi fetch Top Hoạt Hình từ Backend:", error)
		return null
	}
}
