"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { deleteComment, toggleInteraction } from "@/services/binh-luan"
import clsx from "clsx"
import CommentAvatar from "./CommentAvatar"
import CommentContent from "./CommentContent"
import CommentActions from "./CommentActions"
import CommentArea from "./CommentArea"
import CommentReplies from "./CommentReplies"
import { User } from "@supabase/supabase-js"
import { toast } from "sonner"

interface CommentItemProps {
	comment: CommentWithProfile
	episodeId?: string
	isReply?: boolean
	stickers: Sticker[]
	user: User | null
	profile: UserProfile | null
	authLoading: boolean
	onDeleteComment: (commentId: string) => void
	film: FilmInfo
}

const CommentItem = ({
	comment,
	episodeId,
	isReply = false,
	stickers,
	user,
	profile,
	authLoading,
	onDeleteComment,
	film,
}: CommentItemProps) => {
	const [showReplyForm, setShowReplyForm] = useState(false)
	const [likes, setLikes] = useState(comment.likes_count || 0)
	const [dislikes, setDislikes] = useState(comment.dislikes_count || 0)
	const [userInteraction, setUserInteraction] = useState<
		"like" | "dislike" | null
	>(comment.user_interaction_type || null)
	const [isDeleting, setIsDeleting] = useState(false)

	const actualParentId = isReply ? comment.parent_id : comment.id

	const handleInteraction = async (type: "like" | "dislike") => {
		if (!user) {
			toast.warning("Vui lòng đăng nhập để thực hiện chức năng này!")
			return
		}

		const oldType = userInteraction
		const isRemoving = oldType === type

		if (isRemoving) {
			setUserInteraction(null)
			if (type === "like") {
				setLikes((l) => l - 1)
			} else {
				setDislikes((d) => d - 1)
			}
		} else {
			if (oldType === "like") setLikes((l) => l - 1)
			if (oldType === "dislike") setDislikes((d) => d - 1)

			setUserInteraction(type)
			if (type === "like") {
				setLikes((l) => l + 1)
			} else {
				setDislikes((d) => d + 1)
			}
		}

		const { error } = await toggleInteraction(comment.id, user.id, type)

		if (error) {
			setUserInteraction(oldType)
		}
	}

	const handleDelete = async () => {
		if (!user?.id) return
		if (!window.confirm("Bạn có chắc muốn xóa bình luận này không?")) return

		setIsDeleting(true)
		const { error } = await deleteComment(comment.id, user.id)
		if (!error) {
			if (!isReply) {
				onDeleteComment(comment.id)
			}
		} else {
			setIsDeleting(false)
		}
	}

	const authorProfile = {
		avatar_url: comment.avatar_url,
		equippedFrame: comment.equipped_frame,
		equippedFrameMask: comment.equipped_frame_mask,
	}

	return (
		<div className={clsx("group/item", isReply ? "mt-6" : "pt-2")}>
			<div className="flex gap-4">
				<div className="flex flex-col items-center">
					<CommentAvatar profile={authorProfile} />
					{!isReply && comment.replies_count > 0 && (
						<div className="w-[2px] flex-1 bg-gradient-to-b from-white/10 to-transparent mt-2 mb-1" />
					)}
				</div>

				<div className="flex-1 min-w-0">
					<CommentContent
						comment={comment}
						isReply={isReply}
						stickers={stickers}
					/>

					<CommentActions
						likes={likes}
						dislikes={dislikes}
						isLiked={userInteraction === "like"}
						isDisliked={userInteraction === "dislike"}
						onLikeClick={() => handleInteraction("like")}
						onDislikeClick={() => handleInteraction("dislike")}
						isReplyActive={showReplyForm}
						onReplyClick={() => setShowReplyForm(!showReplyForm)}
						canDelete={user?.id === comment.user_id}
						onDeleteClick={handleDelete}
						isDeleting={isDeleting}
					/>

					{/* Form Reply */}
					<AnimatePresence>
						{showReplyForm && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1, marginTop: 24 }}
								exit={{ height: 0, opacity: 0 }}
							>
								<CommentArea
									episodeId={episodeId}
									parentId={actualParentId}
									placeholder={`Đang trả lời ${comment.full_name}...`}
									onCommentPosted={() => setShowReplyForm(false)}
									stickers={stickers}
									user={user}
									profile={profile}
									authLoading={authLoading}
									film={film}
								/>
							</motion.div>
						)}
					</AnimatePresence>

					{!isReply && (
						<CommentReplies
							parentId={comment.id}
							episodeId={episodeId}
							stickers={stickers}
							user={user}
							profile={profile}
							authLoading={authLoading}
							onDeleteComment={onDeleteComment}
							totalReplies={comment.replies_count}
							film={film}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default CommentItem
