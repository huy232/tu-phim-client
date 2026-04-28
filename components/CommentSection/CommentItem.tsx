"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
	deleteComment,
	toggleInteraction,
	getReplies,
} from "@/services/binh-luan"
import clsx from "clsx"
import CommentAvatar from "./CommentAvatar"
import CommentContent from "./CommentContent"
import CommentActions from "./CommentActions"
import CommentArea from "./CommentArea"
import { User } from "@supabase/supabase-js"
import { toast } from "sonner"

interface CommentItemProps {
	comment: CommentWithProfile
	episodeId?: string
	isReply?: boolean
	parentUser?: CommentWithProfile
	stickers: Sticker[]
	user: User | null
	profile: UserProfile | null
	authLoading: boolean
	onDeleteComment: (commentId: string) => void
	film: FilmInfo
	onAddReply?: (reply: CommentWithProfile) => void
	onDeleteReply?: (id: string) => void
}

const CommentItem = ({
	comment,
	episodeId,
	isReply = false,
	parentUser,
	stickers,
	user,
	profile,
	authLoading,
	onDeleteComment,
	film,
	onAddReply,
	onDeleteReply,
}: CommentItemProps) => {
	const [showReplyForm, setShowReplyForm] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	// ✅ FIX: KHÔNG mutate comment nữa
	const [content, setContent] = useState(comment.content)

	const [likes, setLikes] = useState(comment.likes_count || 0)
	const [dislikes, setDislikes] = useState(comment.dislikes_count || 0)
	const [userInteraction, setUserInteraction] = useState<
		"like" | "dislike" | null
	>(comment.user_interaction_type || null)

	const [isDeleting, setIsDeleting] = useState(false)

	const [showReplies, setShowReplies] = useState(false)
	const [replies, setReplies] = useState<CommentWithProfile[]>([])
	const [loadingReplies, setLoadingReplies] = useState(false)
	const [replyCount, setReplyCount] = useState(comment.replies_count || 0)

	const parentId = isReply ? comment.parent_id : comment.id
	const isRoot = !isReply

	// ---------------- LIKE ----------------
	const handleInteraction = async (type: "like" | "dislike") => {
		if (!user) {
			toast.warning("Vui lòng đăng nhập!")
			return
		}

		const oldType = userInteraction
		const isRemoving = oldType === type

		if (isRemoving) {
			setUserInteraction(null)
			type === "like" ? setLikes((l) => l - 1) : setDislikes((d) => d - 1)
		} else {
			if (oldType === "like") setLikes((l) => l - 1)
			if (oldType === "dislike") setDislikes((d) => d - 1)

			setUserInteraction(type)
			type === "like" ? setLikes((l) => l + 1) : setDislikes((d) => d + 1)
		}

		await toggleInteraction(comment.id, user.id, type)
	}

	// ---------------- DELETE ----------------
	const handleDelete = async () => {
		if (!user?.id) return
		if (!window.confirm("Xóa bình luận?")) return

		try {
			setIsDeleting(true)

			const { error } = await deleteComment(comment.id, user.id)

			if (!error) {
				if (isRoot) {
					onDeleteComment(comment.id)
				} else {
					onDeleteReply?.(comment.id)
				}
			}
		} finally {
			setIsDeleting(false)
		}
	}

	// ---------------- TOGGLE REPLIES ----------------
	const handleToggleReplies = async () => {
		if (!isRoot) return

		if (showReplies) {
			setShowReplies(false)
			return
		}

		if (replies.length === 0) {
			setLoadingReplies(true)
			const { data } = await getReplies(comment.id)
			if (data) setReplies(data)
			setLoadingReplies(false)
		}

		setShowReplies(true)
	}

	const authorProfile = {
		avatar_url: comment.avatar_url,
		equippedFrame: comment.equipped_frame,
		equippedFrameMask: comment.equipped_frame_mask,
	}

	return (
		<div className={clsx("group/item", isReply ? "mt-4" : "pt-2")}>
			<div className="flex gap-4">
				<div className="flex flex-col items-center">
					<CommentAvatar profile={authorProfile} size="xs" />
				</div>

				<div className="flex-1 min-w-0">
					{isEditing ? (
						<CommentArea
							mode="edit"
							defaultValue={content}
							commentId={comment.id}
							onCommentPosted={(updated) => {
								setContent(updated.content)
								setIsEditing(false)
							}}
							onCancel={() => setIsEditing(false)}
							stickers={stickers}
							user={user}
							profile={profile}
							authLoading={authLoading}
							film={film}
						/>
					) : (
						<CommentContent
							comment={{ ...comment, content }}
							isReply={isReply}
							stickers={stickers}
						/>
					)}

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
						canEdit={user?.id === comment.user_id}
						onEditClick={() => setIsEditing(true)}
					/>

					{isRoot && replyCount > 0 && (
						<button
							onClick={handleToggleReplies}
							className="text-xs text-purple-400 mt-2"
						>
							{showReplies ? "Ẩn phản hồi" : `Xem ${replyCount} phản hồi`}
						</button>
					)}

					<AnimatePresence>
						{showReplyForm && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1, marginTop: 16 }}
								exit={{ height: 0, opacity: 0 }}
							>
								<CommentArea
									episodeId={episodeId}
									parentId={parentId}
									onCommentPosted={(newReply) => {
										setShowReplyForm(false)

										if (isRoot) {
											setReplies((prev) => [newReply, ...prev])
											setShowReplies(true)
											setReplyCount((c) => c + 1)
										} else {
											onAddReply?.(newReply)
										}
									}}
									stickers={stickers}
									user={user}
									profile={profile}
									authLoading={authLoading}
									film={film}
								/>
							</motion.div>
						)}
					</AnimatePresence>

					{isRoot && showReplies && (
						<div className="ml-10 mt-3 space-y-2">
							{loadingReplies ? (
								<div className="text-xs text-white/40">Đang tải...</div>
							) : (
								replies.map((reply) => (
									<CommentItem
										key={reply.id}
										comment={reply}
										isReply
										parentUser={comment}
										episodeId={episodeId}
										stickers={stickers}
										user={user}
										profile={profile}
										authLoading={authLoading}
										onDeleteComment={onDeleteComment}
										film={film}
										onAddReply={(newReply) => {
											setReplies((prev) => [newReply, ...prev])
										}}
										onDeleteReply={(id) => {
											setReplies((prev) => prev.filter((r) => r.id !== id))
											setReplyCount((c) => c - 1)
										}}
									/>
								))
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CommentItem
