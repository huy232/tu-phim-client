"use client"
import { motion, Variants } from "framer-motion"
import { Eye, Ghost, CloudLightning, Info, AlertTriangle } from "lucide-react"

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
}

const itemVariants: Variants = {
	hidden: { y: 20, opacity: 0, scale: 0.95 },
	visible: {
		y: 0,
		opacity: 1,
		scale: 1,
		transition: { type: "spring", stiffness: 120 },
	},
}

const LEGAL_CLAUSES = [
	{
		icon: <CloudLightning className="text-blue-400" />,
		title: "Nguồn Gốc Bí Tịch",
		content:
			"Mọi thước phim tại Linh Đài đều được thu thập từ các đại lộ thênh thang trên mạng lưới thiên thạch (Internet). Chúng tôi không trực tiếp rèn đúc (lưu trữ) chúng trên linh thạch của mình.",
	},
	{
		icon: <Ghost className="text-zinc-500" />,
		title: "Vô Ảnh Vô Hình",
		content:
			"Linh Đài hoạt động như một tấm gương phản chiếu (search engine). Nếu vị đại năng nào sở hữu bản quyền bí tịch muốn thu hồi, xin hãy nhắn nhủ nhẹ nhàng, chúng tôi sẽ lập tức niệm chú để nó biến mất.",
	},
	{
		icon: <Eye className="text-emerald-400" />,
		title: "Thức Tỉnh Đạo Tâm",
		content:
			"Chúng tôi không chịu trách nhiệm nếu đạo hữu vì quá mê phim mà quên ăn quên ngủ, dẫn đến tẩu hỏa nhập ma. Tu luyện là việc cả đời, xem phim phải có chừng mực!",
	},
	{
		icon: <AlertTriangle className="text-amber-500" />,
		title: "Cảnh Báo Thiên Kiếp",
		content:
			"Các nội dung quảng cáo trong phim (nếu có) là do các tiểu ma đầu phương nào chèn vào nguồn gốc. Đạo hữu đừng dại dột tin theo kẻo mất linh thạch trong túi nhé.",
	},
]

export default function Legal() {
	return (
		<div className="min-h-screen bg-[#050505] text-zinc-400 py-24 px-4 relative overflow-hidden">
			<div className="absolute inset-0 pointer-events-none">
				<motion.div
					animate={{ x: [-200, 200], opacity: [0.1, 0.2, 0.1] }}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
					className="absolute top-1/2 left-0 w-full h-1/2 bg-linear-to-r from-purple-500/10 via-transparent to-blue-500/10 blur-[150px]"
				/>
			</div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-4xl mx-auto relative z-10"
			>
				{/* Header Section */}
				<div className="text-center mb-24">
					<motion.div
						variants={itemVariants}
						className="inline-block p-4 rounded-full bg-zinc-900 border border-white/5 mb-8 shadow-2xl"
					>
						<Info size={40} className="text-purple-500 animate-pulse" />
					</motion.div>
					<motion.h1
						variants={itemVariants}
						className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-widest leading-relaxed"
					>
						VÔ ẢNH{" "}
						<span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600 py-2">
							THỦ ẤN
						</span>
					</motion.h1>
					<motion.p
						variants={itemVariants}
						className="text-zinc-500 italic text-lg"
					>
						Tuyên bố miễn trừ trách nhiệm - Thiên cơ bất khả lộ, nhưng pháp lý
						phải rõ ràng.
					</motion.p>
				</div>

				{/* Legal Grid */}
				<div className="grid gap-12">
					{LEGAL_CLAUSES.map((clause, i) => (
						<motion.div
							key={i}
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							className="group flex flex-col md:flex-row gap-8 items-center md:items-start p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-purple-500/20 transition-all"
						>
							<div className="shrink-0 w-16 h-16 rounded-2xl bg-black flex items-center justify-center border border-white/10 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all">
								{clause.icon}
							</div>
							<div className="text-center md:text-left">
								<h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
									{clause.title}
								</h3>
								<p className="text-zinc-500 leading-relaxed italic group-hover:text-zinc-400 transition-colors">
									{clause.content}
								</p>
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					variants={itemVariants}
					className="mt-24 p-12 rounded-[3rem] bg-linear-to-b from-zinc-900/50 to-transparent border-t border-white/10 text-center"
				>
					<p className="text-xs tracking-[0.4em] text-zinc-600 uppercase mb-4">
						Ấn ký bảo chứng
					</p>
					<div className="w-20 h-20 mx-auto border-4 border-purple-500/20 rounded-full flex items-center justify-center opacity-40">
						<div className="w-12 h-12 border-2 border-purple-500/40 rounded-full animate-ping" />
					</div>
					<p className="mt-8 text-sm text-zinc-500 italic font-mono">
						Mọi tranh chấp về linh quyền xin vui lòng gửi thư truyền tin. <br />
						Chúng tôi luôn tôn trọng đạo hạnh của các vị tác giả.
					</p>
				</motion.div>
			</motion.div>
		</div>
	)
}
