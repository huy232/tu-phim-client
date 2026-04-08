import { useState } from "react"
import { ShieldAlert } from "lucide-react"
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
		<>
			<div className="flex items-center gap-2 mb-1.5">
				<span className="text-sm font-bold text-white/90 truncate">
					{comment.full_name}
				</span>
				<span className="px-1.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[9px] font-black tracking-tighter uppercase border border-purple-500/20">
					LV.{comment.level}
				</span>
				<span
					className="text-[10px] text-white/20 font-mono"
					suppressHydrationWarning
				>
					{formatDistanceToNow(new Date(comment.created_at), {
						addSuffix: true,
						locale: vi,
					})}
				</span>
			</div>

			<div className="relative">
				{comment.is_spoiler && !isRevealed ? (
					<button
						onClick={() => setIsRevealed(true)}
						className="w-full p-4 rounded-2xl bg-red-500/5 border border-red-500/20 flex items-center justify-center gap-3 group/spoiler transition-all hover:bg-red-500/10"
					>
						<ShieldAlert size={16} className="text-red-500/50" />
						<span className="text-xs font-bold text-red-500/70 tracking-tight">
							Bình luận chứa Spoil. Nhấn để xem.
						</span>
					</button>
				) : (
					<div
						className={clsx(
							"text-sm leading-relaxed p-4 rounded-2xl transition-all",
							isReply
								? "bg-white/[0.02] border border-white/5"
								: "bg-white/[0.04] border border-white/10",
						)}
					>
						<div className="flex-1 overflow-hidden relative mb-4">
							<div className="text-white/80 wrap-break-word flex flex-wrap items-center">
								{renderCommentWithStickers(comment.content, stickers)}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
export default CommentContent
