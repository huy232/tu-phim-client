import { WEB_URL } from "@/constants"
export async function getWatchInfo(film_slug: string) {
	const url = `${WEB_URL}/api/xem-phim/${film_slug}`

	const res = await fetch(url)

	if (!res.ok) throw new Error(`Fetch failed for ${film_slug}`)
	return res.json()
}
