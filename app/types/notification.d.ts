type NotificationActor = {
	actor_id: string
	profile: {
		id: string
		username: string
		full_name: string
		avatar_url: string
	} | null
}

type AppNotification = {
	id: string
	type: string
	entity_id: string
	entity_type: string
	actors_count: number
	is_read: boolean
	created_at: string

	actors: NotificationActor[]
}
