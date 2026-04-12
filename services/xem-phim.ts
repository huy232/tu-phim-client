import { API } from "@/constants"

export async function fetchWatchInfoFromBackend(film_slug: string) {
	try {
		const res = await fetch(`${API}/xem-phim/${film_slug}`, {
			next: { revalidate: 10800 },
		})

		if (!res.ok) return null
		return await res.json()
	} catch (error) {
		console.error(`❌ Lỗi fetch link xem phim ${film_slug}:`, error)
		return null
	}
}
