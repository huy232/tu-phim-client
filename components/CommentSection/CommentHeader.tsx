import { motion } from "framer-motion"

const CommentHeader = () => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		className="flex flex-col md:flex-row items-center gap-4 mb-10 px-2"
	>
		<h3 className="text-xl font-black tracking-widest uppercase bg-linear-to-r from-white to-white/40 bg-clip-text text-transparent">
			Thảo luận
		</h3>
		<div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
		<span className="text-xs font-mono text-white/30">Cộng đồng</span>
	</motion.div>
)
export default CommentHeader
