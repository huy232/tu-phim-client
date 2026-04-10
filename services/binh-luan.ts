"use server"

import { createClient } from "@/supabase/server"
import { getStickers } from "@/services/emoji"
import { ensureFilmExists } from "./check-film"

/**
 * 1. LẤY DANH SÁCH COMMENT CHÍNH
 */
export const getMainComments = async (
	externalFilmId: string,
	page = 1,
	limit = 10,
	episodeId?: string,
	sortBy: "newest" | "oldest" | "popular" = "newest",
) => {
	const supabase = await createClient()

	const { data: film } = await supabase
		.from("films")
		.select("id")
		.eq("external_id", externalFilmId)
		.single()

	if (!film) return { data: [], count: 0, error: null }

	const from = (page - 1) * limit
	const to = from + limit - 1

	let query = supabase
		.from("comment_with_stats")
		.select("*", { count: "exact" })
		.eq("film_id", film.id)
		.is("parent_id", null)

	if (episodeId?.trim()) {
		query = query.eq("episode_id", episodeId)
	}

	if (sortBy === "newest")
		query = query.order("created_at", { ascending: false })
	else if (sortBy === "oldest")
		query = query.order("created_at", { ascending: true })
	else if (sortBy === "popular") {
		query = query
			.order("likes_count", { ascending: false })
			.order("created_at", { ascending: false })
	}

	return await query.range(from, to)
}

/**
 * 2. LẤY DANH SÁCH PHẢN HỒI (Giữ nguyên vì dùng UUID comment)
 */
export const getReplies = async (parentId: string, page = 1, limit = 5) => {
	const supabase = await createClient()
	const from = (page - 1) * limit
	const to = from + limit - 1

	return await supabase
		.from("comment_with_stats")
		.select("*")
		.eq("parent_id", parentId)
		.order("created_at", { ascending: true }) // Phản hồi nên để ascending để đọc theo luồng
		.range(from, to)
}

/**
 * 3. GỬI COMMENT MỚI (Tự động Upsert Phim)
 */
export const postComment = async (payload: {
	film: FilmInfo
	user_id: string
	content: string
	episode_id?: string | null
	parent_id?: string | null
	is_spoiler?: boolean
}) => {
	try {
		// A. Đảm bảo phim đã có trong DB

		const supabase = await createClient()

		const internalFilmId = await ensureFilmExists(supabase, payload.film)
		// B. Insert comment với film_id là UUID
		const { data: insertedData, error: insertError } = await supabase
			.from("comments")
			.insert([
				{
					film_id: internalFilmId,
					user_id: payload.user_id,
					content: payload.content,
					parent_id: payload.parent_id,
					episode_id: payload.episode_id,
					is_spoiler: payload.is_spoiler,
				},
			])
			.select("id") // Chỉ lấy ID
			.single()

		if (insertError) throw insertError
		const { data, error } = await supabase
			.from("comment_with_stats")
			.select("*")
			.eq("id", insertedData.id)
			.single()

		return { data, error }
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String(error)
		return { data: null, error: message }
	}
}

/**
 * 4. TƯƠNG TÁC & XÓA (Giữ nguyên logic UUID)
 */
export const toggleInteraction = async (
	commentId: string,
	userId: string,
	type: "like" | "dislike",
) => {
	const supabase = await createClient()
	return await supabase.rpc("toggle_comment_interaction", {
		p_comment_id: commentId,
		p_user_id: userId,
		p_type: type,
	})
}

export const deleteComment = async (commentId: string, userId: string) => {
	const supabase = await createClient()
	return await supabase
		.from("comments")
		.delete()
		.eq("id", commentId)
		.eq("user_id", userId)
}

// LẤY 20 COMMENTS CỦA CHÍNH USER
export const getUserCommentHistory = async (userId: string) => {
	const supabase = await createClient()

	const { data, error } = await supabase
		.from("comment_with_stats")
		.select("*")
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.limit(20)

	return { data, error }
}

export async function getInitialShowcase(limit: number = 10) {
	const supabase = await createClient()

	const [commentsRes, stickersData] = await Promise.all([
		supabase
			.from("comment_with_stats")
			.select("*")
			.eq("is_spoiler", false)
			.order("created_at", { ascending: false })
			.limit(limit),
		getStickers(),
	])

	return {
		initialComments: (commentsRes.data as CommentWithProfile[]) || [],
		initialStickers: stickersData || [],
	}
}
