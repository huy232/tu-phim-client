import { WEB_URL } from "@/constants"
interface FetchOptions {
	page?: number
	limit?: number
	sort_field?: "modified.time" | "year" | "_id" | "view"
	sort_type?: "desc" | "asc"
	year?: string
	country?: string
	category?: string
	tmdb?: number
}

export async function getFilmByList(
	slug: string,
	{
		page = 1,
		limit = 20,
		sort_field = "modified.time",
		sort_type = "desc",
		year,
		country = "",
		category = "",
		tmdb = 0,
	}: FetchOptions = {},
) {
	const params = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString(),
		sort_field,
		sort_type,
		country,
		category,
		tmdb: tmdb.toString(),
	})

	if (year) params.append("year", year)

	const url = `${WEB_URL}/api/danh-sach/${slug}?${params.toString()}`

	const res = await fetch(url, {
		next: { revalidate: 3600 },
	})

	if (!res.ok) throw new Error(`Fetch failed for ${slug}`)
	return res.json()
}
