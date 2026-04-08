"use client"
import { motion, Variants } from "framer-motion"
import { Scale, ShieldAlert, Gavel, Scroll, Ban } from "lucide-react"

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
}

const ruleVariants: Variants = {
	hidden: { x: -20, opacity: 0, filter: "blur(5px)" },
	visible: {
		x: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { type: "spring", stiffness: 100 },
	},
}

const TERMS = [
	{
		icon: <Scale className="text-amber-400" />,
		title: "Chấp Thuận Thiên Luật",
		content:
			"Khi bước chân vào Linh Đài, đạo hữu mặc định đã ký kết vào khế ước này. Nếu không đồng ý, xin hãy thu hồi thần thức và rời đi.",
	},
	{
		icon: <ShieldAlert className="text-red-400" />,
		title: "Cấm Chế Hành Vi",
		content:
			"Nghiêm cấm dùng tà thuật (DDOS, Scan, Crawl) phá hoại trận pháp bảo hộ. Kẻ vi phạm sẽ bị phong ấn linh căn (Banned IP) vĩnh viễn.",
	},
	{
		icon: <Ban className="text-rose-500" />,
		title: "Khẩu Nghiệp & Đạo Đức",
		content:
			"Đàm đạo phải văn minh. Tuyệt đối không phỉ báng đồng đạo, lan truyền ma đạo ấn ký (link độc hại) hoặc gây hấn.",
	},
	{
		icon: <Scroll className="text-purple-400" />,
		title: "Bản Quyền Bí Tịch",
		content:
			"Mọi thước phim đều là linh sản của các vị đại năng. Đạo hữu chỉ được phép xem tại chỗ, không được tự ý đóng gói mang đi (re-upload).",
	},
]

export default function TermsOfService() {
	return (
		<div className="min-h-screen bg-[#050505] text-zinc-400 py-20 px-4 relative overflow-hidden">
			{/* Background Decor - Vệt sáng thanh tao */}
			<div className="absolute top-0 right-0 w-[300px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-4xl mx-auto relative z-10"
			>
				{/* Header Section */}
				<motion.div variants={ruleVariants} className="text-center mb-20">
					<div className="inline-block p-3 rounded-2xl bg-zinc-900/50 border border-white/5 mb-6">
						<Gavel size={40} className="text-purple-500" />
					</div>
					<h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
						THIÊN LUẬT <span className="text-purple-500">LINH ĐÀI</span>
					</h1>
					<p className="italic font-phudu text-zinc-500">
						Thiên địa hữu quy, Linh đài hữu luật. Vui lòng tuân thủ để tránh
						kiếp nạn.
					</p>
				</motion.div>

				{/* Rules List */}
				<div className="grid gap-8">
					{TERMS.map((term, i) => (
						<motion.div
							key={i}
							variants={ruleVariants}
							whileHover={{ x: 10 }}
							className="group relative p-1 rounded-2xl transition-all duration-500"
						>
							{/* Hiệu ứng viền phát sáng khi hover */}
							<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity" />

							<div className="relative bg-zinc-900/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
								<div className="p-4 rounded-xl bg-black/40 border border-white/5 group-hover:border-purple-500/30 transition-colors">
									{term.icon}
								</div>
								<div>
									<h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
										{i + 1}. {term.title}
									</h3>
									<p className="leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
										{term.content}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Footer Warning */}
				<motion.div
					variants={ruleVariants}
					className="mt-20 p-8 rounded-3xl border border-dashed border-red-500/20 bg-red-500/5 text-center"
				>
					<p className="text-sm text-red-400/80 italic font-medium">
						Lưu ý: Chúng tôi có quyền cập nhật Thiên Luật bất cứ lúc nào tùy
						theo biến động của Thiên Đạo. Đạo hữu nên thường xuyên quay lại đây
						để cập nhật thần thức.
					</p>
				</motion.div>
			</motion.div>
		</div>
	)
}
