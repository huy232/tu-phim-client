import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

const CommentEmpty = () => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		className="
			py-16 md:py-20
			flex flex-col items-center justify-center
			border border-dashed border-white/5
			rounded-2xl md:rounded-3xl
			bg-white/[0.01]
			px-4
			text-center
		"
	>
		<div className="w-14 h-14 md:w-16 md:h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center text-white/20">
			<MessageCircle size={28} className="md:!size-8" />
		</div>

		<h4
			className="
			text-sm md:text-sm
			font-bold text-white/40 uppercase tracking-wide md:tracking-widest
			max-w-[90%]
		"
		>
			Chưa có thảo luận nào
		</h4>

		<p
			className="
			text-[11px] md:text-xs
			text-white/20 mt-2
			max-w-[260px] md:max-w-none
			leading-relaxed
		"
		>
			Hãy là người đầu tiên để lại ý kiến về phim này!
		</p>
	</motion.div>
)

export default CommentEmpty
