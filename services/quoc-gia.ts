import { API } from "@/constants"
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
	try {
		const params = new URLSearchParams({
			page: page.toString(),
			limit: limit.toString(),
			sort_field,
			sort_type,
			tmdb: tmdb.toString(),
			loc_trailer: loc_trailer.toString(),
		})

		if (nam_san_xuat) params.append("nam_san_xuat", nam_san_xuat)

		const url = `${API}/quoc-gia/${slug}?${params.toString()}`

		const res = await fetch(url, {
			next: { revalidate: 10800 },
		})

		if (!res.ok) return { data: { items: [] } }

		return res.json()
	} catch (error) {
		console.log("Lỗi getFilmByCountry:", error)
		return { data: { items: [] } }
	}
}
