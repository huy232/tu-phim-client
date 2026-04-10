"use client"

import { ChevronDown, Loader2 } from "lucide-react"
import CommentItem from "./CommentItem"
import { User } from "@supabase/supabase-js"
import { useReplies } from "@/hooks/useReplies"
import { useState } from "react"

interface CommentRepliesProps {
	parentId: string
	episodeId?: string
	stickers: Sticker[]
	user: User | null
	profile: UserProfile | null
	authLoading: boolean
	onDeleteComment: (commentId: string) => void
	totalReplies: number
	film: FilmInfo
}

const CommentReplies = ({
	parentId,
	episodeId,
	stickers,
	user,
	profile,
	authLoading,
	onDeleteComment,
	totalReplies,
	film,
}: CommentRepliesProps) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const { replies, loading } = useReplies(parentId, isExpanded)

	if (!isExpanded) {
		if (!totalReplies || totalReplies <= 0) return null
		return (
			<button
				onClick={() => setIsExpanded(true)}
				className="mt-4 flex items-center gap-2 text-[10px] font-black text-purple-400/50 hover:text-purple-400 transition-all uppercase tracking-widest group/more ml-10"
			>
				<div className="w-8 h-[1px] bg-purple-500/20 group-hover/more:w-12 transition-all" />
				<ChevronDown size={14} />
				<span>Xem {totalReplies} phản hồi</span>
			</button>
		)
	}

	if (loading && replies.length === 0) {
		return (
			<div className="flex items-center gap-2 mt-4 ml-10">
				<Loader2 size={12} className="animate-spin text-purple-500/50" />
				<span className="text-[10px] text-white/20 uppercase">Đang tải...</span>
			</div>
		)
	}

	if (!loading && replies.length === 0) {
		return null
	}

	return (
		<div className="space-y-2 ml-10 border-l border-white/5 pl-4 mt-4">
			{replies.map((reply) => (
				<CommentItem
					key={reply.id}
					comment={reply}
					isReply={true}
					episodeId={episodeId}
					stickers={stickers}
					user={user}
					profile={profile}
					authLoading={authLoading}
					onDeleteComment={onDeleteComment}
					film={film}
				/>
			))}
		</div>
	)
}

export default CommentReplies
