"use server"

import { ensureFilmExists } from "@/services/check-film"
import { createClient } from "@/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitReviewAction(payload: {
	film: FilmInfo
	userId: string
	rating: number
	content: string
	is_spoiler: boolean
}) {
	const supabase = await createClient()

	const filmUuid = await ensureFilmExists(supabase, payload.film)

	if (!filmUuid) throw new Error("Không thể đồng bộ dữ liệu phim.")

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
		if (error.message.includes("level")) throw new Error("Cấp độ không đủ")
		throw error
	}

	return { success: true }
}
