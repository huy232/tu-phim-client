"use client"
import { supabase } from "@/supabase/client"
import { useEffect, useState } from "react"

export const useRealtimeComments = (
	initialComments: CommentWithProfile[],
	limit: number = 10,
) => {
	const [comments, setComments] =
		useState<CommentWithProfile[]>(initialComments)

	useEffect(() => {
		const channelName = `showcase-${Math.random().toString(36).substring(7)}`
		const channel = supabase.channel(channelName)

		channel
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "comments" },
				async (payload) => {
					if (payload.new.is_spoiler) return

					await new Promise((resolve) => setTimeout(resolve, 5000))

					const { data: fullComment } = await supabase
						.from("comment_with_stats")
						.select("*")
						.eq("id", payload.new.id)
						.single()

					if (fullComment) {
						setComments((prev) =>
							[fullComment as CommentWithProfile, ...prev].slice(0, limit),
						)
					}
				},
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [limit])

	return comments
}
