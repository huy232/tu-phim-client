"use client"
import { motion, Variants } from "framer-motion"
import { EyeOff, Fingerprint, Lock, Key, ShieldCheck } from "lucide-react"

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
}

const cardVariants: Variants = {
	hidden: { scale: 0.9, opacity: 0, y: 20 },
	visible: {
		scale: 1,
		opacity: 1,
		y: 0,
		transition: { type: "spring", damping: 15, stiffness: 100 },
	},
}

const PRIVACY_ITEMS = [
	{
		icon: <Fingerprint />,
		title: "Dấu Ấn Thần Thức",
		desc: "Chúng tôi chỉ thu thập những thông tin cần thiết như Username và Email để định danh đạo hữu trên Linh Đài. Tuyệt đối không xâm phạm vào ký ức riêng tư.",
	},
	{
		icon: <Lock />,
		title: "Trận Pháp Bảo Hộ",
		desc: "Mọi dữ liệu được phong ấn bằng thuật toán băm (Hashing) và mã hóa nhiều lớp. Dù có là đại năng cũng khó lòng phá giải cấm chế này.",
	},
	{
		icon: <EyeOff />,
		title: "Vô Ảnh Vô Hình",
		desc: "Chúng tôi không chia sẻ bí mật của đạo hữu cho bất kỳ thế lực ma đạo hay bên thứ ba nào, trừ khi có yêu cầu thực thi pháp luật từ Thiên Đình.",
	},
	{
		icon: <Key />,
		title: "Quyền Kiểm Soát",
		desc: "Đạo hữu có toàn quyền chỉnh sửa hoặc yêu cầu xóa bỏ vĩnh viễn ấn ký của mình khỏi Linh Đài bất cứ lúc nào thông qua mục Cài đặt.",
	},
]

export default function Privacy() {
	return (
		<div className="min-h-screen bg-[#020617] text-slate-300 py-24 px-4 relative overflow-hidden">
			{/* Hiệu ứng tia sáng quét ngang (Scanning light) */}
			<motion.div
				animate={{ x: ["-100%", "200%"] }}
				transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
				className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent skew-x-12 pointer-events-none"
			/>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-5xl mx-auto relative z-10"
			>
				{/* Header Section */}
				<div className="text-center mb-24">
					<motion.div
						variants={cardVariants}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
					>
						<ShieldCheck size={16} /> Bảo mật tuyệt đối
					</motion.div>
					<motion.h1
						variants={cardVariants}
						className="text-5xl md:text-7xl font-black text-white mb-6"
					>
						THẦN THỨC <span className="text-emerald-500">ẤN KÝ</span>
					</motion.h1>
					<motion.p
						variants={cardVariants}
						className="max-w-xl mx-auto text-slate-500 italic"
					>
						Tại Linh Đài, sự riêng tư của đạo hữu được coi là đạo tâm. Chúng tôi
						bảo vệ nó như bảo vệ chính mạng mạch của mình.
					</motion.p>
				</div>

				{/* Grid Section */}
				<div className="grid md:grid-cols-2 gap-8">
					{PRIVACY_ITEMS.map((item, i) => (
						<motion.div
							key={i}
							variants={cardVariants}
							whileHover={{ y: -8, transition: { duration: 0.3 } }}
							className="relative p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-2xl overflow-hidden group"
						>
							{/* Lớp phủ sáng xanh khi hover */}
							<div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

							<div className="relative z-10">
								<div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-2xl shadow-emerald-500/20">
									{item.icon}
								</div>
								<h3 className="text-2xl font-bold text-white mb-4">
									{item.title}
								</h3>
								<p className="leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
									{item.desc}
								</p>
							</div>

							{/* Họa tiết trang trí kiểu vi mạch (Circuit) mờ */}
							<div className="absolute -bottom-6 -right-6 text-emerald-500/5 rotate-12">
								<ShieldCheck size={120} />
							</div>
						</motion.div>
					))}
				</div>

				{/* Thông báo cuối */}
				<motion.p
					variants={cardVariants}
					className="text-center mt-20 text-xs text-slate-600 uppercase tracking-[0.3em]"
				>
					An toàn • Bảo mật • Bất khả xâm phạm
				</motion.p>
			</motion.div>
		</div>
	)
}
