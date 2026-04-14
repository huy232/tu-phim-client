"use server"
import { createClient } from "@/supabase/server"

/**
 * Lấy danh sách các slug tập phim đã từng xem của 1 bộ phim
 */
export async function getWatchedEpisodes(filmSlug: string) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) return { data: {} }

	const { data, error } = await supabase
		.from("user_watched_history")
		.select(
			`
      watched_slugs,
      films!inner(slug) 
    `,
		)
		.eq("user_id", user.id)
		.eq("films.slug", filmSlug)
		.maybeSingle()

	if (error) {
		console.error("❌ Lỗi Query History:", error.message)
		return { data: {} }
	}

	// Trả về Object: { "A_vietsub": [...], "B_tm": [...] }
	return { data: (data?.watched_slugs as Record<string, string[]>) || {} }
}

export async function getGlobalWatchHistory(
	page: number = 1,
	limit: number = 12,
) {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) return { data: [], count: 0 }

	const from = (page - 1) * limit
	const to = from + limit - 1

	const { data, error, count } = await supabase
		.from("user_watched_history")
		.select(
			`
      last_episode_name,
      last_episode_slug,
      last_server_key,
      last_watched_at,
      films (
        name,
        slug,
        poster_url,
        thumb_url,
        type
      )
    `,
			{ count: "exact" },
		)
		.eq("user_id", user.id)
		.order("last_watched_at", { ascending: false })
		.range(from, to)

	if (error) {
		console.error("❌ Lỗi lấy lịch sử tổng quát:", error.message)
		return { data: [], count: 0 }
	}

	return { data, count: count || 0 }
}
