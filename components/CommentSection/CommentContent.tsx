import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import clsx from "clsx"
import { renderCommentWithStickers } from "@/utilities"

const CommentContent = ({
	comment,
	isReply,
	stickers,
}: {
	comment: CommentWithProfile
	isReply: boolean
	stickers: Sticker[]
}) => {
	const [isRevealed, setIsRevealed] = useState(!comment.is_spoiler)

	return (
		<div className="w-full min-w-0">
			{/* header */}
			<div className="flex flex-wrap items-center gap-2 mb-2">
				<span className="text-sm font-bold text-white/90 truncate max-w-[60vw] sm:max-w-[180px]">
					{comment.full_name}
				</span>

				<span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[9px] font-black uppercase border border-purple-500/20">
					LV.{comment.level}
				</span>

				<span className="text-[10px] text-white/20">
					{formatDistanceToNow(new Date(comment.created_at), {
						addSuffix: true,
						locale: vi,
					})}
				</span>
			</div>

			{/* content */}
			<div className="w-full min-w-0">
				{comment.is_spoiler && !isRevealed ? (
					<button className="w-full p-3 md:p-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-center">
						<span className="text-xs text-red-400 break-words">
							Bình luận chứa spoiler. Nhấn để xem
						</span>
					</button>
				) : (
					<div
						className={clsx(
							"p-3 md:p-4 rounded-2xl text-sm w-full min-w-0",
							isReply
								? "bg-white/2 border border-white/5"
								: "bg-white/4 border border-white/10",
						)}
					>
						<div className="flex flex-wrap items-center text-white/80 text-[12px] break-words w-full">
							{renderCommentWithStickers(comment.content, stickers)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
export default CommentContent
