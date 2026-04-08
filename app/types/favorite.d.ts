interface Favorite {
	name: string
	origin_name: string
	slug: string
	type: string
	lang: string
	poster_url: string
	thumb_url: string
	country: { id: string; name: string; slug: string }[]
	category: { id: string; name: string; slug: string }[]
}

interface FavoriteFilmItem {
	id: string
	film: SupabaseFilm
	created_at: Date
	user_id: string
	film_id: string
}
