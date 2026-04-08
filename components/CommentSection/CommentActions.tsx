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
	<div className="flex items-center gap-6 mt-3 px-1">
		{/* NÚT LIKE */}
		<button
			onClick={onLikeClick}
			className={clsx(
				"flex items-center gap-2 text-[10px] font-black transition-colors uppercase tracking-widest group",
				isLiked ? "text-red-500" : "text-white/20 hover:text-red-500",
			)}
		>
			<span>Ưng</span>
			<Heart
				size={13}
				fill={isLiked ? "currentColor" : "none"}
				className="group-hover:scale-110 transition-transform"
			/>
			{likes || 0}
		</button>

		{/* NÚT DISLIKE */}
		<button
			onClick={onDislikeClick}
			className={clsx(
				"flex items-center gap-2 text-[10px] font-black transition-colors uppercase tracking-widest group",
				isDisliked ? "text-orange-500" : "text-white/20 hover:text-orange-500",
			)}
		>
			<span>Chê</span>
			<ThumbsDown
				size={13}
				fill={isDisliked ? "currentColor" : "none"}
				className="group-hover:scale-110 transition-transform"
			/>
			{dislikes || 0}
		</button>

		{/* NÚT PHẢN HỒI */}
		<button
			onClick={onReplyClick}
			className={clsx(
				"flex items-center gap-2 text-[10px] font-black transition-colors uppercase tracking-widest",
				isReplyActive
					? "text-purple-400"
					: "text-white/20 hover:text-purple-400",
			)}
		>
			<MessageCircle size={13} /> Phản hồi
		</button>

		{canDelete && (
			<button
				onClick={onDeleteClick}
				disabled={isDeleting}
				className={clsx(
					"flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-auto transition-colors",
					isDeleting ? "text-white/5" : "text-white/10 hover:text-red-500",
				)}
			>
				{isDeleting ? (
					<Loader2 size={13} className="animate-spin" />
				) : (
					<Trash2 size={13} />
				)}
				<span>{isDeleting ? "Đang xóa..." : "Xóa"}</span>
			</button>
		)}
	</div>
)

export default CommentActions
