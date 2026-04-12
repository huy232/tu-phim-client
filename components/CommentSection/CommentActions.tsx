import { Heart, MessageCircle, ThumbsDown, Trash2, Loader2 } from "lucide-react"
import clsx from "clsx"

interface Props {
	likes: number
	dislikes: number
	isLiked: boolean
	isDisliked: boolean
	isReplyActive: boolean
	canDelete: boolean
	onReplyClick: () => void
	onLikeClick: () => void
	onDislikeClick: () => void
	onDeleteClick: () => void
	isDeleting?: boolean
}

const CommentActions = ({
	likes,
	dislikes,
	isLiked,
	isDisliked,
	isReplyActive,
	canDelete,
	onReplyClick,
	onLikeClick,
	onDislikeClick,
	onDeleteClick,
	isDeleting,
}: Props) => (
	<div className="mt-3 px-1 flex flex-wrap items-center gap-x-4 gap-y-2">
		{/* LEFT ACTIONS */}
		<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
			{/* LIKE */}
			<button
				onClick={onLikeClick}
				className={clsx(
					"flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
					isLiked ? "text-red-500" : "text-white/30 hover:text-red-500",
				)}
			>
				<span className="hidden sm:inline">Ưng</span>
				<Heart
					size={13}
					fill={isLiked ? "currentColor" : "none"}
					className="transition-transform"
				/>
				{likes || 0}
			</button>

			{/* DISLIKE */}
			<button
				onClick={onDislikeClick}
				className={clsx(
					"flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
					isDisliked
						? "text-orange-500"
						: "text-white/30 hover:text-orange-500",
				)}
			>
				<span className="hidden sm:inline">Chê</span>
				<ThumbsDown size={13} />
				{dislikes || 0}
			</button>

			{/* REPLY */}
			<button
				onClick={onReplyClick}
				className={clsx(
					"flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
					isReplyActive
						? "text-purple-400"
						: "text-white/30 hover:text-purple-400",
				)}
			>
				<MessageCircle size={13} />
				<span className="hidden sm:inline">Phản hồi</span>
			</button>
		</div>

		{/* DELETE */}
		{canDelete && (
			<button
				onClick={onDeleteClick}
				disabled={isDeleting}
				className={clsx(
					"ml-auto sm:ml-0 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
					isDeleting ? "text-white/10" : "text-white/20 hover:text-red-500",
				)}
			>
				{isDeleting ? (
					<Loader2 size={13} className="animate-spin" />
				) : (
					<Trash2 size={13} />
				)}
				<span className="hidden sm:inline">
					{isDeleting ? "Đang xóa..." : "Xóa"}
				</span>
			</button>
		)}
	</div>
)

export default CommentActions
