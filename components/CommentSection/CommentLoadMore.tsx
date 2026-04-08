import { Loader2, ChevronDown } from "lucide-react"

interface Props {
	hasMore: boolean
	loading: boolean
	onLoadMore: () => void
	hasComments: boolean
}

const CommentLoadMore = ({
	hasMore,
	loading,
	onLoadMore,
	hasComments,
}: Props) => {
	if (!hasMore) {
		return hasComments ? (
			<p className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/10">
				Đã hiển thị tất cả thảo luận
			</p>
		) : null
	}

	return (
		<div className="mt-12 flex justify-center">
			<button
				onClick={onLoadMore}
				disabled={loading}
				className="group flex flex-col items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-purple-400 transition-all duration-300"
			>
				{loading ? (
					<Loader2 className="animate-spin text-purple-500" size={20} />
				) : (
					<>
						<span className="group-hover:tracking-[0.4em] transition-all">
							Xem thêm bình luận
						</span>
						<ChevronDown size={16} className="animate-bounce mt-1" />
					</>
				)}
			</button>
		</div>
	)
}
export default CommentLoadMore
