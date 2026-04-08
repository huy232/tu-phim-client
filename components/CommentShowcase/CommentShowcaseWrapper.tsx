"use server"
import { createClient } from "@/supabase/server"
import { getStickers } from "@/services/emoji"
import CommentShowcaseClient from "."

export default async function ShowcaseWrapper({ limit = 10 }) {
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

	const initialComments = (commentsRes.data as CommentWithProfile[]) || []

	return (
		<CommentShowcaseClient
			initialComments={initialComments}
			initialStickers={stickersData || []}
			limit={limit}
		/>
	)
}
