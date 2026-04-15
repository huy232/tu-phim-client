"use server"

import { ensureFilmExists } from "@/services/check-film"
import { createClient } from "@/supabase/server"

export async function submitReviewAction(payload: {
	film: FilmInfo
	userId: string
	rating: number
	content: string
	is_spoiler: boolean
}) {
	try {
		const supabase = await createClient()

		const filmUuid = await ensureFilmExists(supabase, payload.film)

		if (!filmUuid) {
			return { success: false, error: "Không thể đồng bộ dữ liệu phim." }
		}

		const { error } = await supabase.from("film_reviews").upsert(
			{
				film_id: filmUuid,
				user_id: payload.userId,
				rating: payload.rating,
				content: payload.content,
				is_spoiler: payload.is_spoiler,
				updated_at: new Date().toISOString(),
			},
			{
				onConflict: "user_id, film_id",
			},
		)

		if (error) {
			if (error.message.includes("level")) {
				return { success: false, error: "Cấp độ không đủ" }
			}

			return { success: false, error: error.message }
		}

		return { success: true }
	} catch (err) {
		return { success: false, error: "Lỗi không xác định" }
	}
}
