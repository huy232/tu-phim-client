"use client"

import Link from "next/link"
import FilmHeader from "./CommentHeader"
import UserComment from "./UserComment"
import ActionFooter from "./ActionFooter"

const CommentCard = ({
	comment,
	stickers,
}: {
	comment: CommentWithProfile
	stickers: Sticker[]
}) => {
	return (
		<div className="group relative w-full h-[700px]">
			<div className="relative z-10 w-full h-full bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] flex flex-col overflow-hidden transition-all duration-500 group-hover:border-purple-500/40 group-hover:shadow-[0_8px_30px_-12px_rgba(168,85,247,0.5)] group-hover:-translate-y-2">
				<Link
					href={`/thong-tin/${comment.film_slug}`}
					className="absolute inset-0 z-0"
				/>

				<div className="relative z-10 flex flex-col h-full pointer-events-none">
					<div className="pointer-events-auto">
						<FilmHeader comment={comment} />
					</div>
					<div className="flex-1 pointer-events-auto">
						<UserComment comment={comment} stickers={stickers} />
					</div>
					<div className="pointer-events-auto">
						<ActionFooter comment={comment} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default CommentCard
