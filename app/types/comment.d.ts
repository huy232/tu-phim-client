interface CommentWithProfile {
	// 1. THÔNG TIN BÌNH LUẬN (COMMENT)
	id: string
	user_id: string
	content: string // Nội dung bình luận
	parent_id: string | null
	episode_id: string | null
	is_spoiler: boolean
	created_at: string

	// 2. TOÀN BỘ THÔNG TIN PHIM
	film_id: string
	film_external_id: string
	film_title: string
	film_origin_name: string | null
	film_slug: string
	film_type: string | null
	film_poster: string | null
	film_thumbnail: string | null
	film_year: number | null
	film_category: { name: string; slug: string; id: string }[]
	film_country: { name: string; slug: string; id: string }[]
	film_lang: string | null
	film_quality: string | null
	film_time: string | null
	film_content: string | null
	film_created_at: string

	// 3. THÔNG TIN NGƯỜI DÙNG (PROFILE)
	full_name: string
	avatar_url: string
	username: string
	exp: number
	level: number

	// 4. THỐNG KÊ VÀ TƯƠNG TÁC (STATS)
	replies_count: number
	likes_count: number
	dislikes_count: number
	user_interaction_type: "like" | "dislike" | null

	// 5.
	equipped_frame: string | null
	equipped_frame_mask: string | null
}
