"use client"

import { AnimatePresence, motion } from "framer-motion"
import CommentItem from "./CommentItem"
import { User } from "@supabase/supabase-js"

interface CommentListProps {
	comments: CommentWithProfile[]
	episodeId?: string
	stickers: Sticker[]
	user: User | null
	profile: UserProfile | null
	authLoading: boolean
	onDeleteComment: (commentId: string) => void
	film: FilmInfo
}

const CommentList = ({
	comments,
	episodeId,
	stickers,
	user,
	profile,
	authLoading,
	onDeleteComment,
	film,
}: CommentListProps) => {
	return (
		<AnimatePresence mode="popLayout">
			{comments.map((comment) => (
				<motion.div key={comment.id} layout>
					<CommentItem
						comment={comment}
						episodeId={episodeId}
						stickers={stickers}
						user={user}
						profile={profile}
						authLoading={authLoading}
						onDeleteComment={onDeleteComment}
						film={film}
					/>
				</motion.div>
			))}
		</AnimatePresence>
	)
}

export default CommentList
