interface ReviewWithProfile {
	id: string
	film_id: string
	user_id: string
	rating: number
	content: string
	is_spoiler: boolean
	helpful_count: number
	view_count: number
	created_at: string
	updated_at: string
	profiles: {
		username: string
		full_name: string
		avatar_url: string
		level: numbẻ
		rank_title: string
	}
}
