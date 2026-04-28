"use client"
import { deleteComment, toggleInteraction } from "@/services/binh-luan"
import { User } from "@supabase/supabase-js"

export const useCommentActions = (user: User | null) => {
	const toggleLike = async (
		commentId: string,
		current: "like" | "dislike" | null,
		type: "like" | "dislike",
	) => {
		if (!user) return { error: "unauthorized" }

		return toggleInteraction(commentId, user.id, type)
	}

	const remove = async (commentId: string) => {
		if (!user) return { error: "unauthorized" }
		return deleteComment(commentId, user.id)
	}

	const edit = async (commentId: string, content: string) => {
		// return updateComment(commentId, content)
	}

	return { toggleLike, remove, edit }
}
