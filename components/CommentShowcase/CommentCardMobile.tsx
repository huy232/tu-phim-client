import Link from "next/link"
import SiteImage from "../ui/site-image"
import { renderCommentWithStickers } from "@/utilities"
import { Play } from "lucide-react"
import { IMAGE_URL } from "@/constants"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

const CommentCardMobile = ({
	comment,
	stickers,
}: {
	comment: CommentWithProfile
	stickers: Sticker[]
}) => {
	return (
		<div className="rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden">
			{/* ===== HEADER ===== */}
			<div className="flex items-center gap-3 p-3 border-b border-white/5">
				<SiteImage
					src={comment.avatar_url || "/default-avatar.png"}
					width={40}
					height={40}
					className="w-10 h-10 rounded-full object-cover border border-white/10"
					alt={comment.full_name}
				/>

				<div className="min-w-0 flex-1">
					<p className="text-sm font-bold text-white truncate">
						{comment.full_name}
					</p>

					<p className="text-[11px] text-white/40 flex items-center gap-1">
						⏱{" "}
						{formatDistanceToNow(new Date(comment.created_at), {
							addSuffix: true,
							locale: vi,
						})}
					</p>
				</div>
			</div>

			{/* ===== FILM + CTA ROW ===== */}
			<div className="flex items-center gap-3 px-3 pt-3">
				{/* poster */}
				<Link
					href={`/xem-phim/${comment.film_slug}`}
					className="w-12 h-16 rounded-md overflow-hidden border border-white/10 shrink-0"
				>
					<SiteImage
						src={`${IMAGE_URL}/${comment.film_thumbnail}`}
						width={48}
						height={64}
						className="w-full h-full object-cover"
						alt="film"
					/>
				</Link>

				{/* info */}
				<div className="min-w-0 flex-1">
					<p className="text-[13px] font-bold text-white line-clamp-1">
						{comment.film_title || "Phim"}
					</p>

					{/* CTA SAME ROW */}
					<div className="flex items-center gap-2 mt-2">
						<Link
							href={`/xem-phim/${comment.film_slug}`}
							className="flex items-center gap-1 px-2 py-1 text-[10px] rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30"
						>
							<Play size={10} />
							Xem
						</Link>

						<Link
							href={`/thong-tin/${comment.film_slug}`}
							className="px-2 py-1 text-[10px] rounded-md bg-white/10 text-white/70 border border-white/10"
						>
							Thông tin
						</Link>
					</div>
				</div>
			</div>

			{/* ===== COMMENT ===== */}
			<div className="p-3 pt-2">
				<div className="text-sm text-white/80 leading-relaxed">
					{renderCommentWithStickers(comment.content, stickers)}
				</div>

				{/* FOOTER */}
				<div className="mt-3 flex gap-4 items-center text-[11px] text-white/40">
					<span>👍 {comment.likes_count || 0}</span>
					<span>👎 {comment.dislikes_count || 0}</span>
				</div>
			</div>
		</div>
	)
}

export default CommentCardMobile
