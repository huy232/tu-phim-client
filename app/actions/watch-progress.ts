"use server"
import { ensureFilmExists } from "@/services/check-film"
import { createClient } from "@/supabase/server"

export async function saveProgressAction(payload: {
	film: FilmInfo
	userId: string
	episode: { slug: string; name: string }
	currentTime: number
	duration: number
}) {
	const { film, userId, episode, currentTime, duration } = payload
	const supabase = await createClient()
	const percent = (currentTime / duration) * 100

	try {
		const internalFilmId = await ensureFilmExists(supabase, film)
		if (!internalFilmId) throw new Error("Không thể xác định phim")

		// Nếu xem trên 80% -> Xóa lịch sử
		if (percent > 80) {
			await supabase
				.from("user_progress")
				.delete()
				.match({ user_id: userId, film_id: internalFilmId })
			return { status: "finished", success: true }
		}

		// Cập nhật tiến độ
		const { error: upsertError } = await supabase.from("user_progress").upsert(
			{
				user_id: userId,
				film_id: internalFilmId,
				episode_slug: episode.slug,
				episode_name: episode.name,
				current_time_seconds: Math.floor(currentTime),
				duration_seconds: Math.floor(duration),
				percent_complete: percent,
				updated_at: new Date().toISOString(),
			},
			{ onConflict: "user_id, film_id" },
		)

		if (upsertError) throw upsertError

		// Giữ limit 10 slot
		const { data: list } = await supabase
			.from("user_progress")
			.select("id")
			.eq("user_id", userId)
			.order("updated_at", { ascending: false })

		if (list && list.length > 10) {
			const idsToDelete = list.slice(10).map((i) => i.id)
			await supabase.from("user_progress").delete().in("id", idsToDelete)
		}

		return { success: true }
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error)
		console.error("💀 saveProgressAction Error:", message)
		return { error: message }
	}
}

export async function getWatchProgressAction(
	externalId: string,
	userId: string,
) {
	const supabase = await createClient()

	const { data, error } = await supabase
		.from("user_progress")
		.select(
			`
      current_time_seconds, 
      duration_seconds, 
      episode_slug,
      films!inner (external_id)
    `,
		)
		.eq("user_id", userId)
		.eq("films.external_id", externalId)
		.maybeSingle()

	if (error) {
		console.error("Lỗi lấy tiến độ:", error.message)
		return { error: error.message }
	}

	return { data }
}
