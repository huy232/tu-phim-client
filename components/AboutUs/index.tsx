"use client"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ShieldCheck, Zap, ScrollText, Users, Sparkles } from "lucide-react"
import { useEffect } from "react"

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
}

const itemVariants = {
	hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: {
			type: "spring",
			stiffness: 80,
		},
	},
} as const

export default function AboutPage() {
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX)
			mouseY.set(e.clientY)
		}
		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [mouseX, mouseY])

	const spotLightX = useSpring(mouseX, { stiffness: 50, damping: 20 })
	const spotLightY = useSpring(mouseY, { stiffness: 50, damping: 20 })

	return (
		<div className="min-h-screen bg-[#050505] text-zinc-300 py-24 px-4 overflow-hidden relative selection:bg-purple-500/30">
			{/* 1. Spotlight Background - Linh lực theo bước chân */}
			<motion.div
				className="pointer-events-none fixed inset-0 z-30 opacity-50"
				style={{
					background: useTransform(
						[spotLightX, spotLightY],
						([x, y]) =>
							`radial-gradient(600px at ${x}px ${y}px, rgba(168, 85, 247, 0.15), transparent 80%)`,
					),
				}}
			/>

			<div className="absolute inset-0 pointer-events-none">
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-purple-500 rounded-full"
						initial={{
							left: `${(i * 7) % 100}%`,
							top: `${(i * 13) % 100}%`,
							opacity: ((i % 5) + 2) / 10,
						}}
						animate={{
							y: [0, -100, 0],
							opacity: [0.2, 0.8, 0.2],
						}}
						transition={{
							duration: 5 + (i % 10),
							repeat: Infinity,
							ease: "easeInOut",
							delay: i * 0.5,
						}}
					/>
				))}
			</div>

			<motion.div
				animate={{ rotate: 360 }}
				transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-purple-500/5 rounded-full border-dashed pointer-events-none"
			/>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-4xl mx-auto relative z-10"
			>
				{/* Header múa may hơn */}
				<div className="relative mb-20">
					<motion.div
						variants={itemVariants}
						className="flex justify-center mb-4"
					>
						<span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] uppercase font-black tracking-[0.2em]">
							Thiên Địa Hữu Tình
						</span>
					</motion.div>

					<motion.h1
						variants={itemVariants}
						className="text-5xl md:text-7xl font-black text-white text-center mb-8 tracking-tighter"
					>
						KHỞI NGUYÊN <br />
						<span className="text-transparent bg-clip-text bg-linear-to-b from-purple-400 to-purple-800">
							LINH ĐÀI
						</span>
					</motion.h1>

					<motion.div
						variants={itemVariants}
						className="flex items-center justify-center gap-4 text-zinc-500"
					>
						<div className="h-px w-12 bg-linear-to-r from-transparent to-zinc-800" />
						<p className="text-center text-lg italic font-lobster">
							Vượt ranh giới phàm trần
						</p>
						<div className="h-px w-12 bg-linear-to-l from-transparent to-zinc-800" />
					</motion.div>
				</div>

				{/* Grid Features với hiệu ứng xịn hơn */}
				<div className="grid md:grid-cols-2 gap-6 relative">
					{[
						{
							title: "Sứ mệnh",
							icon: <Zap size={24} />,
							desc: "Truyền tải những thước phim đỉnh cao với tốc độ phi quang.",
							color: "bg-amber-500",
						},
						{
							title: "Cộng đồng",
							icon: <Users size={24} />,
							desc: "Nơi đàm đạo, chia sẻ tâm đắc về từng bộ phim.",
							color: "bg-blue-500",
						},
						{
							title: "Bảo mật",
							icon: <ShieldCheck size={24} />,
							desc: "Thần thức của đạo hữu luôn được bảo vệ nghiêm ngặt.",
							color: "bg-emerald-500",
						},
						{
							title: "Pháp bảo",
							icon: <ScrollText size={24} />,
							desc: "Hệ thống level và huy hiệu độc bản cho thành viên.",
							color: "bg-purple-500",
						},
					].map((feature, idx) => (
						<motion.div
							key={idx}
							variants={itemVariants}
							whileHover={{ y: -5 }}
							className="group relative p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5 backdrop-blur-md overflow-hidden"
						>
							{/* Hiệu ứng tia sáng chạy quanh border khi hover */}
							<div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

							<div className="relative z-10">
								<div
									className={`w-12 h-12 rounded-2xl ${feature.color}/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
								>
									{feature.icon}
								</div>
								<h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
									{feature.title}
									<Sparkles
										size={14}
										className="opacity-0 group-hover:opacity-100 text-purple-400 transition-all"
									/>
								</h3>
								<p className="text-zinc-500 leading-relaxed text-sm group-hover:text-zinc-400 transition-colors">
									{feature.desc}
								</p>
							</div>

							{/* Góc decor kiểu cổ trang */}
							<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
								<div className="w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-lg" />
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Footer mờ ảo */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 2 }}
				className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
			>
				<p className="text-[10px] tracking-[0.5em] text-zinc-600 uppercase font-bold">
					Thiên giới hữu hạn • Linh đài vô biên
				</p>
			</motion.div>
		</div>
	)
}
