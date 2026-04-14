import { supabase } from "@/supabase/client"

export async function getFilmReviews(
	externalFilmId: string,
	page: number = 1,
	limit: number = 10,
) {
	const { data: film, error: filmErr } = await supabase
		.from("films")
		.select("id")
		.eq("external_id", externalFilmId)
		.maybeSingle()

	if (filmErr) console.error("Lỗi tìm film:", filmErr)
	if (!film) {
		return { reviews: [], totalCount: 0, hasNextPage: false }
	}

	const from = (page - 1) * limit
	const to = from + limit - 1

	const { data, error, count } = await supabase
		.from("film_reviews")
		.select(
			`
      id,
      film_id,
      user_id,
      rating,
      content,
      is_spoiler,
      helpful_count,
      view_count,
      created_at,
      updated_at,
      profiles:user_id (username, full_name, avatar_url, level, rank_title)
    `,
			{ count: "exact" },
		)
		.eq("film_id", film.id)
		.order("created_at", { ascending: false })
		.range(from, to)

	if (error) throw error

	const reviews = data as unknown as ReviewWithProfile[]

	return {
		reviews,
		totalCount: count || 0,
		hasNextPage: count ? to < count - 1 : false,
	}
}

export async function upsertReview(payload: {
	film_id: string
	user_id: string
	rating: number
	content?: string
	is_spoiler?: boolean
}) {
	const { data, error } = await supabase
		.from("film_reviews")
		.upsert(
			{
				...payload,
				updated_at: new Date().toISOString(),
			},
			{
				onConflict: "user_id, film_id",
			},
		)
		.select()
		.single()

	if (error) {
		if (error.message.includes("level")) {
			throw new Error("Cấp độ của bạn chưa đủ để thực hiện đánh giá.")
		}
		throw error
	}
	return data
}

export async function deleteReview(reviewId: string) {
	const { error } = await supabase
		.from("film_reviews")
		.delete()
		.eq("id", reviewId)

	if (error) throw error
	return true
}

export async function incrementHelpfulCount(reviewId: string) {
	const { error } = await supabase.rpc("increment_review_helpful", {
		review_id: reviewId,
	})

	if (error) throw error
}
