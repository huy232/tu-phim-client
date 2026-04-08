"use client"
import { supabase } from "@/supabase/client"
import { RealtimeChannel } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export const useReplies = (parentId: string, enabled: boolean) => {
	const [replies, setReplies] = useState<CommentWithProfile[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!parentId || !enabled) return

		let channel: RealtimeChannel

		const fetchAndListen = async () => {
			try {
				setLoading(true)

				const { data } = await supabase
					.from("comments")
					.select("*, profiles:user_id(full_name, avatar_url)")
					.eq("parent_id", parentId)
					.order("created_at", { ascending: true })

				if (data) {
					const formatted = data.map((item) => ({
						...item,
						full_name: item.profiles?.full_name,
						avatar_url: item.profiles?.avatar_url,
					}))
					setReplies(formatted)
				}

				channel = supabase
					.channel(`replies-${parentId}`)
					.on(
						"postgres_changes",
						{
							event: "INSERT",
							schema: "public",
							table: "comments",
							filter: `parent_id=eq.${parentId}`,
						},
						async (payload) => {
							const { data: newData } = await supabase
								.from("comments")
								.select("*, profiles:user_id(full_name, avatar_url)")
								.eq("id", payload.new.id)
								.single()

							if (newData) {
								const formatted = {
									...newData,
									full_name: newData.profiles?.full_name,
									avatar_url: newData.profiles?.avatar_url,
								}
								setReplies((prev) => [...prev, formatted])
							}
						},
					)
					.on(
						"postgres_changes",
						{
							event: "DELETE",
							schema: "public",
							table: "comments",
						},
						(payload) => {
							setReplies((prev) => prev.filter((r) => r.id !== payload.old.id))
						},
					)
					.subscribe()
			} catch (error) {
				console.error("Lỗi fetch replies:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchAndListen()

		return () => {
			if (channel) {
				supabase.removeChannel(channel)
			}
		}
	}, [enabled, parentId])

	return { replies, loading }
}
