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
	film,
	stickers,
	user,
	profile,
	authLoading,
	onDeleteComment,
}: CommentListProps) => (
	<AnimatePresence mode="popLayout">
		{comments.map((comment: CommentWithProfile) => (
			<motion.div
				key={`${comment.id}-${comment.likes_count}`}
				layout
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
			>
				<CommentItem
					key={`${comment.id}-${comment.likes_count}`}
					comment={comment}
					episodeId={episodeId}
					stickers={stickers}
					user={user}
					profile={profile}
					authLoading={authLoading}
					onDeleteComment={onDeleteComment}
					isReply={false}
					film={film}
				/>
			</motion.div>
		))}
	</AnimatePresence>
)

export default CommentList
