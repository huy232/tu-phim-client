import { WEB_URL } from "@/constants"
export async function getFilmByInfo(film_slug: string) {
	const url = `${WEB_URL}/api/thong-tin/${film_slug}`

	const res = await fetch(url, {
		next: { revalidate: 3600 },
	})

	if (!res.ok) throw new Error(`Fetch failed for ${film_slug}`)
	return res.json()
}

export async function getActorByInfo(film_slug: string) {
	const url = `${WEB_URL}/api/dien-vien/${film_slug}`

	const res = await fetch(url, {
		next: { revalidate: 3600 },
	})

	if (!res.ok) throw new Error(`Fetch failed for ${film_slug}`)
	return res.json()
}
