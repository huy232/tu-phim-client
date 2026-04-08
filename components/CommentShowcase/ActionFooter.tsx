import { Play, ThumbsDown, ThumbsUp } from "lucide-react"
import SiteImage from "../ui/site-image"
import { IMAGE_URL } from "@/constants"
import Link from "next/link"

interface ActionFooterProps {
	comment: CommentWithProfile
}

const ActionFooter = ({ comment }: ActionFooterProps) => (
	<div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-white/5 pointer-events-auto">
		{/* Like/Dislike */}
		<div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/10 mt-6">
			<div className="flex items-center gap-4 px-3 py-1">
				<button className="flex items-center gap-1.5 text-white/30 hover:text-purple-400 transition-all hover:scale-110">
					<ThumbsUp
						size={16}
						className={
							comment.user_interaction_type === "like"
								? "fill-purple-500 text-purple-500"
								: ""
						}
					/>
					<span className="text-xs font-black">{comment.likes_count || 0}</span>
				</button>
				<div className="w-px h-3 bg-white/10" />
				<button className="flex items-center gap-1.5 text-white/30 hover:text-red-400 transition-all hover:scale-110">
					<ThumbsDown
						size={16}
						className={
							comment.user_interaction_type === "dislike"
								? "fill-red-500 text-red-500"
								: ""
						}
					/>
					<span className="text-xs font-black">
						{comment.dislikes_count || 0}
					</span>
				</button>
			</div>
		</div>

		<Link
			href={`/xem-phim/${comment.film_slug}`}
			className="group/watch flex items-center gap-4 mt-6 pointer-events-auto cursor-pointer"
		>
			<span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover/watch:text-purple-400 transition-colors duration-300 pointer-events-auto">
				Xem ngay
			</span>

			<div
				className="relative w-12 h-16 rounded-lg overflow-hidden border-2 border-white/10 shadow-2xl transition-all duration-500 
    group-hover/watch:scale-110 
    group-hover/watch:-rotate-12 
    group-hover/watch:border-purple-500/50 
    group-hover/watch:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
			>
				<SiteImage
					src={`${IMAGE_URL}/${comment.film_thumbnail}`}
					width={48}
					height={64}
					className="w-full h-full object-cover transition-transform duration-700 group-hover/watch:scale-125"
					alt="thumb"
				/>

				{/* Play Icon - Hiện lên khi hover vào vùng Link */}
				<div className="absolute inset-0 bg-purple-600/40 opacity-0 group-hover/watch:opacity-100 flex items-center justify-center transition-all duration-300">
					<Play size={16} className="text-white fill-current animate-pulse" />
				</div>
			</div>
		</Link>
	</div>
)

export default ActionFooter
