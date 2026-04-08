import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

const CommentEmpty = () => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		className="py-20 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]"
	>
		<div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center text-white/20">
			<MessageCircle size={32} />
		</div>
		<h4 className="text-sm font-bold text-white/40 uppercase tracking-widest">
			Chưa có thảo luận nào
		</h4>
		<p className="text-xs text-white/20 mt-1">
			Hãy là người đầu tiên để lại ý kiến về phim này!
		</p>
	</motion.div>
)
export default CommentEmpty
