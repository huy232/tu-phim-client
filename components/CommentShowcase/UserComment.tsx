import { renderCommentWithStickers } from "@/utilities"
import { Clock } from "lucide-react"
import SiteImage from "../ui/site-image"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

interface UserCommentProps {
	comment: CommentWithProfile
	stickers: Sticker[]
}

const UserComment = ({ comment, stickers }: UserCommentProps) => (
	<div className="flex-1 p-6 flex flex-col gap-4 min-h-0">
		<div className="flex items-center gap-3 pointer-events-auto">
			<div className="relative shrink-0">
				<SiteImage
					src={comment.avatar_url || "/default-avatar.png"}
					className="w-10 h-10 rounded-full border-2 border-purple-500/20 object-cover"
					width={40}
					height={40}
					alt={comment.full_name}
				/>
			</div>
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<h4 className="text-sm font-black text-white truncate">
						{comment.full_name}
					</h4>
					<span className="text-[9px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-black border border-purple-500/10">
						Lv.{comment.level}
					</span>
				</div>
				<span className="text-[10px] text-white/30 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
					<Clock size={10} />{" "}
					{formatDistanceToNow(new Date(comment.created_at), {
						addSuffix: true,
						locale: vi,
					})}
				</span>
			</div>
		</div>

		<div className="relative bg-white/3 border border-white/5 rounded-2xl p-4 flex-1 overflow-hidden pointer-events-none group-hover:bg-white/5 transition-colors">
			<div className="text-[14px] text-white/90 leading-relaxed font-extralight line-clamp-3">
				{renderCommentWithStickers(comment.content, stickers)}
			</div>
		</div>
	</div>
)

export default UserComment
