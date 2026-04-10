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

interface WatchedEpisode {
	episode_slug: string
	episode_name?: string
	last_watched_at?: string
}

interface WatchedEpisodesResponse {
	data: string[]
	error?: string
}

interface WatchedData {
	[serverKey: string]: string[]
}

interface HistoryItem {
	last_episode_name: string
	last_episode_slug: string
	last_server_key: string
	last_watched_at: string
	films: {
		name: string
		slug: string
		poster_url: string
		thumb_url: string
		type: string
	}
}
