"use client"
import YouTube from "react-youtube"
import { useState, useEffect } from "react"
import { getYoutubeId } from "@/utilities"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"

const YoutubePlayer = ({ url }: { url?: string }) => {
	const videoId = getYoutubeId(url)
	const [hasError, setHasError] = useState(false)
	const [isYTReady, setIsYTReady] = useState(false)
	const [showPlayer, setShowPlayer] = useState(false)

	const glitchVariants = {
		hidden: { opacity: 0, skew: 0 },
		visible: {
			opacity: 1,
			transition: { duration: 0.5 },
			skew: [0, -10, 10, -5, 0],
			x: [0, -2, 2, -1, 0],
			textShadow: [
				"0 0 0px #fff",
				"2px 0px #ff00ff, -2px 0px #00ffff",
				"0 0 10px #a855f7",
				"0 0 0px #fff",
			],
		},
	}

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (isYTReady) {
			timer = setTimeout(() => {
				setShowPlayer(true)
			}, 2500)
		}
		return () => clearTimeout(timer)
	}, [isYTReady])

	if (!videoId || hasError) return null

	return (
		<div className={clsx(`w-full space-y-5`, !isYTReady ? "hidden" : "block")}>
			<AnimatePresence>
				{showPlayer && (
					<motion.h2
						variants={glitchVariants}
						initial="hidden"
						animate="visible"
						className="text-xl md:text-2xl font-black uppercase tracking-widest text-white italic flex items-center gap-4"
					>
						<span className="bg-purple-600 w-2 h-8 block" />
						Có thể bạn tò mò?
					</motion.h2>
				)}
			</AnimatePresence>

			<div className="flex items-center justify-between px-1">
				<div className="flex items-center gap-3">
					<div className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
					</div>
					<motion.span
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 2, repeat: Infinity }}
						className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400/80 italic"
					>
						{showPlayer
							? "● HỆ THỐNG: ĐÃ GIẢI MÃ THÀNH CÔNG"
							: "● HỆ THỐNG: ĐANG GIẢI MÃ TRAILER..."}
					</motion.span>
				</div>
				<span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest hidden sm:block italic">
					API: #youtube_{videoId}
				</span>
			</div>

			<div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-purple-500/10 bg-[#050505] group">
				<div
					className={clsx(
						"w-full h-full transition-all duration-1000",
						"transform-gpu backface-hidden",
						showPlayer
							? "opacity-100 scale-100"
							: "opacity-0 scale-100 absolute",
					)}
					style={{ willChange: "transform, opacity" }}
				>
					<YouTube
						videoId={videoId}
						className="w-full h-full"
						iframeClassName="w-full h-full"
						opts={{
							width: "100%",
							height: "100%",
							playerVars: {
								autoplay: 1,
								mute: 1,
								loop: 1,
								controls: 1,
								rel: 0,
								modestbranding: 1,
							},
						}}
						onReady={() => setIsYTReady(true)}
						onError={() => setHasError(true)}
					/>
				</div>

				<AnimatePresence>
					{!showPlayer && isYTReady && (
						<motion.div
							exit={{ opacity: 0, filter: "blur(20px)" }}
							className="absolute inset-0 z-20"
						>
							<div className="absolute inset-0 bg-cover bg-center brightness-[0.3] grayscale-[0.5]" />

							<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
								<div className="w-full h-full relative overflow-hidden">
									<motion.div
										animate={{ top: ["-10%", "110%"] }}
										transition={{
											duration: 1.5,
											repeat: Infinity,
											ease: "linear",
										}}
										className="absolute left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_25px_#a855f7] z-30"
									/>
								</div>
								<span className="absolute bottom-10 text-[9px] font-mono text-purple-500 animate-pulse tracking-[0.5em] uppercase">
									Quét giao diện...
								</span>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{showPlayer && (
					<div className="absolute inset-0 border border-purple-500/20 rounded-2xl pointer-events-none z-10 shadow-[inset_0_0_30px_rgba(168,85,247,0.1)]" />
				)}
			</div>
		</div>
	)
}

export default YoutubePlayer
