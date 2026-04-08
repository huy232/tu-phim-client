"use client"
import { Eye, EyeOff } from "lucide-react"
import clsx from "clsx"

const CommentSpoilerButton = ({
	isActive,
	onClick,
}: {
	isActive: boolean
	onClick: () => void
}) => (
	<button
		type="button"
		onClick={onClick}
		className={clsx(
			"flex items-center gap-2 text-[10px] font-black transition-all px-3 py-1.5 rounded-lg border tracking-tighter",
			isActive
				? "bg-red-500/10 border-red-500/50 text-red-400"
				: "bg-white/5 border-white/10 text-white/40 hover:bg-white/10",
		)}
	>
		{isActive ? <EyeOff size={12} /> : <Eye size={12} />}
		<span className="hidden xs:inline">
			{isActive ? "CÓ SPOILER" : "KHÔNG SPOILER"}
		</span>
	</button>
)
export default CommentSpoilerButton
