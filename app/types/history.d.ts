interface HistoryProgress {
	id?: string
	user_id?: string
	film_id?: string
	episode_slug: string
	episode_name?: string
	current_time_seconds: number
	duration_seconds: number
	percent_complete?: number
	updated_at?: string
}

type ResumeFn = () => void
