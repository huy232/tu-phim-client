import { WEB_URL } from "@/constants"
interface FetchOptions {
	page?: number
	limit?: number
	sort_field?: "modified.time" | "year" | "_id" | "view"
	sort_type?: "desc" | "asc"
	nam_san_xuat?: string
	quoc_gia?: string
	the_loai?: string
	tmdb?: number
	loc_trailer?: number
}

export async function getFilmByCountry(
	slug: string,
	{
		page = 1,
		limit = 20,
		sort_field = "modified.time",
		sort_type = "desc",
		nam_san_xuat,
		tmdb = 0,
		loc_trailer = 0,
	}: FetchOptions = {},
) {
	const params = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString(),
		sort_field,
		sort_type,
		tmdb: tmdb.toString(),
		loc_trailer: loc_trailer.toString(),
	})

	if (nam_san_xuat) params.append("nam_san_xuat", nam_san_xuat)

	const url = `${WEB_URL}/api/quoc-gia/${slug}?${params.toString()}`

	const res = await fetch(url, {
		next: { revalidate: 3600 },
	})

	if (!res.ok) throw new Error(`Fetch failed for ${slug}`)
	return res.json()
}
