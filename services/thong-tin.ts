import { API } from "@/constants"

export async function fetchFilmInfoFromBackend(film_slug: string) {
	try {
		const res = await fetch(`${API}/thong-tin/${film_slug}`, {
			next: { revalidate: 10800 },
		})
		if (!res.ok) return null
		return await res.json()
	} catch (error) {
		console.error(`❌ Lỗi fetch thông tin phim ${film_slug}:`, error)
		return null
	}
}

export async function fetchActorInfoFromBackend(film_slug: string) {
	try {
		const res = await fetch(`${API}/dien-vien/${film_slug}`, {
			next: { revalidate: 10800 },
		})
		if (!res.ok) return null
		return await res.json()
	} catch (error) {
		console.error(`❌ Lỗi fetch diễn viên phim ${film_slug}:`, error)
		return null
	}
}
