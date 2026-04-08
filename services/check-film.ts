import { SupabaseClient } from "@supabase/supabase-js"

export async function ensureFilmExists(
	supabase: SupabaseClient,
	film: FilmInfo,
) {
	const { data, error } = await supabase
		.from("films")
		.upsert(
			{
				external_id: film._id,
				name: film.name,
				origin_name: film.origin_name,
				slug: film.slug,
				type: film.type,
				poster_url: film.poster_url || film.thumb_url,
				thumb_url: film.thumb_url,
				year: film.year,
				category: film.category || [],
				country: film.country || [],
				lang: film.lang,
				quality: film.quality,
				time: film.time,
				content: film.content,
			},
			{ onConflict: "external_id" },
		)
		.select("id")

	if (error) {
		console.error("❌ Lỗi Upsert Phim:", error.message)
		return null
	}

	return data && data.length > 0 ? data[0].id : null
}
