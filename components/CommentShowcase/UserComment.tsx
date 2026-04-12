import { renderCommentWithStickers } from "@/utilities"
import { Clock } from "lucide-react"
import SiteImage from "../ui/site-image"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

interface UserCommentProps {
	comment: CommentWithProfile
	stickers: Sticker[]
}

const UserComment = ({ comment, stickers }: UserCommentProps) => {
	const content = renderCommentWithStickers(comment.content, stickers)

	return (
		<div className="flex-1 p-4 flex flex-col gap-3 min-h-0">
			{/* User */}
			<div className="flex items-center gap-3">
				<SiteImage
					src={comment.avatar_url || "/default-avatar.png"}
					className="w-9 h-9 rounded-full object-cover"
					width={36}
					height={36}
					alt={comment.full_name}
				/>

				<div className="min-w-0">
					<p className="text-sm font-semibold text-white truncate">
						{comment.full_name}
					</p>
					<p className="text-[10px] text-white/40">Lv.{comment.level}</p>
				</div>
			</div>

			{/* Content */}
			<div className="text-sm text-white/80 line-clamp-3">{content}</div>
		</div>
	)
}

export default UserComment
