"use client"
import { FOOTER_DATA } from "@/constants/footerData"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export default function Footer() {
	const [time, setTime] = useState<string>("")
	const [progress, setProgress] = useState(0)

	const isMobile = useMediaQuery("(max-width: 640px)")
	const isTablet = useMediaQuery("(max-width: 1024px)")

	const sparkCount = isMobile ? 0 : isTablet ? 5 : 15

	useEffect(() => {
		const interval = setInterval(
			() => {
				if (document.hidden) return

				setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }))

				setProgress((prev) => (prev >= 100 ? 0 : prev + (isMobile ? 1 : 3)))
			},
			isMobile ? 2000 : 1000,
		)

		return () => clearInterval(interval)
	}, [isMobile])

	const GlitchLink = ({ children }: { children: string }) => {
		if (isMobile) {
			return (
				<span className="hover:text-purple-400 transition-colors duration-300 block py-1 cursor-pointer">
					{children}
				</span>
			)
		}

		return (
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
				transition={{ duration: 0.2 }}
				className="hover:text-purple-400 transition-colors duration-300 block py-1 cursor-pointer"
			>
				{children}
			</motion.div>
		)
	}

	return (
		<footer className="relative bg-[#050505] text-gray-400 py-12 sm:py-16 overflow-hidden border-t border-purple-900/30">
			{/* ================= EFFECTS ================= */}

			{/* GRID */}
			{!isMobile && (
				<>
					<div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay" />
					<div
						className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
						style={{
							backgroundImage:
								"linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)",
							backgroundSize: "40px 40px",
						}}
					/>
				</>
			)}

			{/* ORBS */}
			{!isMobile && (
				<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
					<motion.div
						animate={{ x: [0, 40, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
						transition={{ duration: isTablet ? 20 : 10, repeat: Infinity }}
						className="absolute -bottom-32 -left-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
					/>
					<motion.div
						animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
						transition={{ duration: isTablet ? 25 : 15, repeat: Infinity }}
						className="absolute -top-32 -right-20 w-[600px] h-[600px] bg-indigo-700/10 rounded-full blur-[130px]"
					/>
				</div>
			)}

			{/* SPARKS */}
			{!isMobile && (
				<div className="absolute inset-0 z-10 pointer-events-none">
					{Array.from({ length: sparkCount }).map((_, i) => (
						<div key={i} className="spark" />
					))}
				</div>
			)}

			{/* ================= CONTENT ================= */}
			<motion.div className="relative z-20 w-full md:max-w-7xl mx-auto px-4 sm:px-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 sm:gap-8 mb-12 sm:mb-16 text-center sm:text-left">
					{/* BRAND */}
					<div className="lg:col-span-2 flex flex-col items-center sm:items-start">
						<h2 className="text-xl sm:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-600 uppercase italic">
							TU <span className="text-purple-500">PHIM</span>
						</h2>

						<p className="text-xs sm:text-sm text-gray-500 mb-6 max-w-xs">
							Nền tảng streaming phim chất lượng cao.
						</p>

						<div className="flex flex-col items-center sm:items-start text-[9px] sm:text-[10px] text-purple-400/50 uppercase">
							<span>SYSTEM_TIME: {time || "--:--:--"}</span>

							<div className="w-28 mt-2">
								<div className="flex justify-between text-[8px]">
									<span>INDEXING</span>
									<span>{progress}%</span>
								</div>
								<div className="h-0.5 bg-purple-900/30 rounded-full">
									<div
										className="h-full bg-purple-500 transition-all duration-500"
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* LINKS */}
					{FOOTER_DATA.map((section) => (
						<div key={section.footerHeading}>
							<h3 className="text-white mb-4 text-[10px] uppercase opacity-80">
								{section.footerHeading}
							</h3>
							<ul className="space-y-1 text-xs">
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

					{/* SOCIAL */}
					<div className="flex flex-col items-center lg:items-start">
						<h3 className="text-white mb-4 text-[10px] uppercase opacity-80">
							Kết nối
						</h3>
						<div className="grid grid-cols-4 sm:grid-cols-2 gap-2">
							{["FB", "TG", "DS", "YT"].map((s) => (
								<div
									key={s}
									className="w-8 h-8 flex items-center justify-center border border-purple-900/30 text-[9px]"
								>
									{s}
								</div>
							))}
						</div>
					</div>

					{/* DONATE */}
					<div className="flex flex-col items-center group relative py-4 w-full max-w-[300px] mx-auto">
						<h3 className="text-purple-400/60 mb-6 text-[9px] uppercase font-bold tracking-[0.3em] flex items-center gap-2">
							<span className="w-1 h-1 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
							#Khai-Mở-Tiên-Duyên
						</h3>

						<div className="w-32 h-32 sm:w-36 sm:h-36 relative">
							<div className="w-full h-full relative rounded overflow-hidden border border-white/5 shadow-md">
								<Image
									src="/img/donate.jpg"
									alt="QR Cúng Dường"
									fill
									loading="lazy"
									className="object-contain p-2"
								/>
							</div>

							<div className="absolute -bottom-1 -right-1 bg-purple-600 text-[8px] text-white px-2 py-1 rounded font-bold italic tracking-tighter">
								Linh Thạch
							</div>
						</div>

						<div className="mt-6 text-center">
							<p className="text-[12px] text-zinc-500 leading-relaxed">
								Chút lòng thành{" "}
								<span className="text-purple-400/80 font-medium">
									tùy hỷ cúng dường
								</span>{" "}
								là linh khí quý giá giúp duy trì TuPhim.
							</p>

							<b className="text-purple-500/60 block mt-2 uppercase tracking-widest text-[10px] font-bold">
								Đa tạ đại ân đại đức của các quý nhân!
							</b>
						</div>
					</div>
				</div>

				<div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[9px] text-gray-700 text-center md:text-left">
					<p>© {new Date().getFullYear()} TU PHIM</p>

					<div className="flex gap-4 opacity-50 flex-wrap justify-center">
						<span>Security</span>
						<span>Database</span>
						<span className="text-green-500">200 OK</span>
					</div>
				</div>
			</motion.div>
		</footer>
	)
}
