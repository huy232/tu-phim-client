"use client"
import { useState } from "react"

export const useComments = (filmId: string, episodeId?: string) => {
	const [comments, setComments] = useState<CommentWithProfile[]>([])

	const addComment = (c: CommentWithProfile) => {
		setComments((prev) => [c, ...prev])
	}

	const updateComment = (id: string, content: string) => {
		setComments((prev) =>
			prev.map((c) => (c.id === id ? { ...c, content } : c)),
		)
	}

	const removeComment = (id: string) => {
		setComments((prev) => prev.filter((c) => c.id !== id))
	}

	return {
		comments,
		setComments,
		addComment,
		updateComment,
		removeComment,
	}
}
