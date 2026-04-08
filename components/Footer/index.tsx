"use client"
import { FOOTER_DATA } from "@/constants/footerData"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Spark {
	id: number
	left: string
	duration: number
	delay: number
	size: number
}

export default function Footer() {
	const [sparks, setSparks] = useState<Spark[]>([])
	const [time, setTime] = useState<string>("")
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const timerId = setTimeout(() => {
			const generatedSparks: Spark[] = Array.from({ length: 15 }).map(
				(_, i) => ({
					id: i,
					left: `${Math.random() * 100}%`,
					duration: Math.random() * 5 + 5,
					delay: Math.random() * 5,
					size: Math.random() * 2 + 1,
				}),
			)
			setSparks(generatedSparks)
		}, 0)

		const clockInterval = setInterval(() => {
			setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }))
			setProgress((prev) =>
				prev >= 100 ? 0 : prev + Math.floor(Math.random() * 5 + 1),
			)
		}, 1000)

		return () => {
			clearTimeout(timerId)
			clearInterval(clockInterval)
		}
	}, [])

	const GlitchLink = ({ children }: { children: string }) => (
		<motion.div
			whileHover={{
				x: [0, -2, 2, -2, 2, 0],
				textShadow: [
					"none",
					"2px 0px #ff00ff, -2px 0px #00ffff",
					"-2px 0px #ff00ff, 2px 0px #00ffff",
					"none",
				],
			}}
			transition={{ duration: 0.2, repeat: Infinity }}
			className="hover:text-purple-400 transition-colors duration-300 block py-1 cursor-pointer"
		>
			{children}
		</motion.div>
	)

	return (
		<footer className="relative bg-[#050505] text-gray-400 py-16 overflow-hidden border-t border-purple-900/30 z-0">
			{/* 1. LỚP HẠT BỤI & GRID LINES (Mới) */}
			<div
				className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay"
				style={{
					backgroundImage: `url('https://grainy-gradients.vercel.app')`,
				}}
			/>
			<div
				className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)",
					backgroundSize: "40px 40px",
				}}
			/>

			{/* 2. BACKGROUND ORBS */}
			<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
				<motion.div
					animate={{ x: [0, 40, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
					transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
					className="absolute -bottom-32 -left-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
				/>
				<motion.div
					animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
					transition={{
						duration: 15,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1,
					}}
					className="absolute -top-32 -right-20 w-[600px] h-[600px] bg-indigo-700/10 rounded-full blur-[130px]"
				/>
			</div>

			{/* 3. HIỆU ỨNG SPARKS */}
			<div className="absolute inset-0 z-10 pointer-events-none">
				{sparks.map((spark) => (
					<motion.div
						key={spark.id}
						initial={{ opacity: 0 }}
						animate={{
							y: [0, -120],
							x: [0, spark.id % 2 === 0 ? 40 : -40],
							opacity: [0, 0.4, 0],
						}}
						transition={{
							duration: spark.duration,
							repeat: Infinity,
							delay: spark.delay,
							ease: "linear",
						}}
						style={{
							left: spark.left,
							bottom: "-5%",
							width: `${spark.size}px`,
							height: `${spark.size}px`,
						}}
						className="absolute bg-purple-400 rounded-full blur-[1px]"
					/>
				))}
			</div>

			{/* 4. NỘI DUNG CHÍNH */}
			<motion.div
				className="relative z-20 w-full md:max-w-7xl mx-auto px-6"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-16">
					{/* Cột 1: Brand & User Activity */}
					<div className="lg:col-span-2">
						<h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-600 tracking-tighter uppercase italic">
							TU <span className="text-purple-500">PHIM</span>
						</h2>
						<p className="text-sm font-extralight leading-relaxed mb-6 text-gray-500 max-w-xs">
							Nền tảng streaming phim chất lượng cao. Đắm chìm trong không gian
							điện ảnh của riêng bạn.
						</p>

						{/* VÔ TRI 1: LOADING PROGRESS */}
						<div className="flex flex-col space-y-2 font-mono text-[10px] text-purple-400/50 uppercase tracking-[0.2em]">
							<div className="flex items-center gap-2">
								<span>SYSTEM_TIME: {time || "--:--:--"}</span>
							</div>
							<div className="flex flex-col gap-1 w-32">
								<div className="flex justify-between text-[8px]">
									<span>INDEXING_DATA</span>
									<span>{progress}%</span>
								</div>
								<div className="h-0.5 w-full bg-purple-900/30 rounded-full overflow-hidden">
									<motion.div
										className="h-full bg-purple-500"
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<span className="w-1 h-1 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]" />
								<motion.span
									animate={{
										opacity: [1, 0.8, 1, 0.5, 1, 0.9, 0.4, 1],
										textShadow: [
											"0 0 4px #22c55e",
											"0 0 0px #22c55e",
											"0 0 8px #22c55e",
											"0 0 2px #22c55e",
										],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										repeatType: "mirror",
										times: [0, 0.1, 0.2, 0.4, 0.5, 0.7, 0.8, 1],
										ease: "easeInOut",
									}}
									className="text-green-500/70"
								>
									SITE_STATUS: ONLINE
								</motion.span>
							</div>
						</div>
					</div>

					{FOOTER_DATA.map((section) => (
						<div key={section.footerHeading}>
							<h3 className="text-white font-medium mb-5 uppercase tracking-[0.2em] text-[11px] opacity-80">
								{section.footerHeading}
							</h3>
							<ul className="space-y-2 text-xs">
								{section.footerDetail.map((item) => (
									<li key={item.slug}>
										<Link href={item.slug}>
											<GlitchLink>{item.name}</GlitchLink>
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Cột Kết nối */}
					<div>
						<h3 className="text-white font-medium mb-5 uppercase tracking-[0.2em] text-[11px] opacity-80">
							Kết nối
						</h3>
						<div className="grid grid-cols-2 gap-2 max-w-20">
							{["FB", "TG", "DS", "YT"].map((s) => (
								<motion.div
									key={s}
									whileHover={{ scale: 1.1, skewX: -3 }}
									className="aspect-square rounded border border-purple-900/30 bg-gray-900/50 flex items-center justify-center hover:border-purple-500 hover:text-white transition-all cursor-pointer text-[9px] font-bold text-gray-600 italic"
								>
									{s}
								</motion.div>
							))}
						</div>
					</div>

					<div className="flex flex-col items-center lg:items-end">
						<h3 className="text-white font-medium mb-5 uppercase tracking-[0.2em] text-[11px] opacity-80 text-right w-full">
							Donate
						</h3>
						<div className="relative p-1 bg-white/95 rounded-sm w-24 h-24 shadow-[0_0_25px_rgba(168,85,247,0.15)] group overflow-hidden">
							<Image
								src="/img/donate.jpg"
								alt="QR Support"
								fill
								className="p-1 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 object-contain"
								loading="lazy"
							/>
							<motion.div
								animate={{ top: ["0%", "100%", "0%"] }}
								transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
								className="absolute left-0 right-0 h-[1.5px] bg-purple-500/80 z-10 shadow-[0_0_10px_#a855f7]"
							/>
						</div>
						<span className="text-[9px] mt-2 text-purple-500/40 font-mono tracking-tighter uppercase italic">
							#Buy-me-a-coffee
						</span>
					</div>
				</div>

				{/* 5. MARQUEE NỘI DUNG (Mới - Làm đầy footer) */}
				<div className="relative w-full py-4 border-y border-purple-900/10 overflow-hidden mb-8">
					<motion.div
						animate={{ x: [0, -1000] }}
						transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
						className="flex whitespace-nowrap gap-10 text-[9px] font-mono uppercase tracking-[0.4em] text-gray-700"
					>
						{Array.from({ length: 8 }).map((_, i) => (
							<span key={i} className="flex items-center gap-4">
								<span>● CDN STATUS:</span>{" "}
								<span className="text-purple-900/60">OPTIMIZED</span>
								<span>● SERVER:</span>{" "}
								<span className="text-purple-900/60">SGN-GATEWAY</span>
								<span>● STREAM:</span>{" "}
								<span className="text-purple-900/60">BUFFER-FREE</span>
								<span>● ENCRYPTION:</span>{" "}
								<span className="text-purple-900/60">AES-256</span>
								<span>● VIBE:</span>{" "}
								<span className="text-purple-900/60">ULTRA-CHILL</span>
							</span>
						))}
					</motion.div>
				</div>

				{/* Bottom info */}
				<div className="flex justify-between items-center text-[9px] font-mono tracking-tighter text-gray-700 uppercase">
					<p>© {new Date().getFullYear()} TU PHIM CORE_SYS V1.0.8</p>
					<div className="hidden md:flex space-x-6 opacity-50">
						<span className="hover:text-purple-500 cursor-pointer transition-colors">
							Security Protocol
						</span>
						<span className="hover:text-purple-500 cursor-pointer transition-colors">
							Database: v8.4.2
						</span>
						<span className="text-green-900 font-bold tracking-widest">
							200 OK
						</span>
					</div>
				</div>
			</motion.div>
		</footer>
	)
}
