"use client"
// import { createClient } from "@/supabase/server"
import { supabase } from "@/supabase/client"

export const getNotifications = async ({
	cursor,
	limit = 10,
}: {
	cursor?: string
	limit?: number
}) => {
	let query = supabase
		.from("notifications")
		.select(
			`
			*,
			actors:notification_actors (
				actor_id,
				profiles (
					id,
					username,
					full_name,
					avatar_url
				)
			)
		`,
		)
		.order("created_at", { ascending: false })
		.limit(limit)

	if (cursor) {
		query = query.lt("created_at", cursor)
	}

	const { data, error } = await query

	if (error) throw error

	return {
		data: data as Notification[],
		nextCursor: data?.length ? data[data.length - 1].created_at : null,
	}
}

export const markAsRead = async (id: string) => {
	// const supabase = await createClient()
	const { error } = await supabase
		.from("notifications")
		.update({ is_read: true })
		.eq("id", id)

	if (error) throw error
}

export const markAllAsRead = async () => {
	// const supabase = await createClient()
	const { error } = await supabase
		.from("notifications")
		.update({ is_read: true })
		.eq("is_read", false)

	if (error) throw error
}

export const getUnreadCount = async () => {
	// const supabase = await createClient()

	const { count, error } = await supabase
		.from("notifications")
		.select("*", { count: "exact", head: true })
		.eq("is_read", false)

	if (error) throw error

	return count || 0
}
