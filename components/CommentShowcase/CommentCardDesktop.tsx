"use client"

import FilmHeader from "./CommentHeader"
import UserComment from "./UserComment"
import ActionFooter from "./ActionFooter"

const CommentCardDesktop = ({
	comment,
	stickers,
}: {
	comment: CommentWithProfile
	stickers: Sticker[]
}) => {
	return (
		<div className="group relative w-full h-[640px]">
			<div className="flex flex-col h-full rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-500 hover:border-purple-500/40 hover:-translate-y-2">
				<FilmHeader comment={comment} />
				<UserComment comment={comment} stickers={stickers} />
				<ActionFooter comment={comment} />
			</div>
		</div>
	)
}

export default CommentCardDesktop
