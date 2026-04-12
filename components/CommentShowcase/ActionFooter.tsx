import { Play, ThumbsDown, ThumbsUp } from "lucide-react"
import SiteImage from "../ui/site-image"
import { IMAGE_URL } from "@/constants"
import Link from "next/link"

interface ActionFooterProps {
	comment: CommentWithProfile
}

const ActionFooter = ({ comment }: ActionFooterProps) => (
	<div className="p-4 pt-0 mt-auto flex items-center justify-between border-t border-white/5 pointer-events-auto">
		{/* Like/Dislike */}
		<div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10 mt-4">
			<div className="flex items-center gap-3 px-2 py-1">
				<button className="flex items-center gap-1 text-white/30 hover:text-purple-400 transition-all hover:scale-105">
					<ThumbsUp
						size={14}
						className={
							comment.user_interaction_type === "like"
								? "fill-purple-500 text-purple-500"
								: ""
						}
					/>
					<span className="text-[11px] font-bold">
						{comment.likes_count || 0}
					</span>
				</button>

				<div className="w-px h-3 bg-white/10" />

				<button className="flex items-center gap-1 text-white/30 hover:text-red-400 transition-all hover:scale-105">
					<ThumbsDown
						size={14}
						className={
							comment.user_interaction_type === "dislike"
								? "fill-red-500 text-red-500"
								: ""
						}
					/>
					<span className="text-[11px] font-bold">
						{comment.dislikes_count || 0}
					</span>
				</button>
			</div>
		</div>

		<Link
			href={`/xem-phim/${comment.film_slug}`}
			className="group/watch flex items-center gap-3 mt-4 pointer-events-auto cursor-pointer"
		>
			<span className="text-[9px] font-black text-white/20 uppercase tracking-[0.15em] group-hover/watch:text-purple-400 transition-colors duration-300">
				Xem ngay
			</span>

			<div
				className="relative w-10 h-14 rounded-md overflow-hidden border border-white/10 shadow-xl transition-all duration-500 
				group-hover/watch:scale-105 
				group-hover/watch:-rotate-6 
				group-hover/watch:border-purple-500/50 
				group-hover/watch:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
			>
				<SiteImage
					src={`${IMAGE_URL}/${comment.film_thumbnail}`}
					width={40}
					height={56}
					className="w-full h-full object-cover transition-transform duration-700 group-hover/watch:scale-110"
					alt="thumb"
				/>

				<div className="absolute inset-0 bg-purple-600/40 opacity-0 group-hover/watch:opacity-100 flex items-center justify-center transition-all duration-300">
					<Play size={14} className="text-white fill-current" />
				</div>
			</div>
		</Link>
	</div>
)

export default ActionFooter
