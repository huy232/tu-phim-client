"use client"
import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

const NeonRankingHeader = ({ filmType }: { filmType: string }) => {
	const flickerVariants = {
		initial: { opacity: 0.8 },
		animate: {
			opacity: [0.9, 0.4, 0.9, 0.2, 1, 0.7, 1],
			transition: {
				duration: 3,
				ease: "easeInOut" as const,
				repeat: Infinity,
				repeatType: "reverse" as const,
			},
		},
	}

	return (
		<div className="relative mb-10 mt-4 group">
			<div className="absolute -inset-x-10 -top-10 bottom-0 bg-radial-gradient from-purple-600/10 via-transparent to-transparent blur-3xl opacity-60 pointer-events-none" />

			<div className="relative flex flex-col items-center text-center space-y-2">
				<motion.div
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3, type: "spring" }}
					className="relative"
				>
					<Trophy
						size={28}
						className="text-yellow-400 filter drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
					/>
					<motion.div
						animate={{ opacity: [0, 1, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
						className="absolute inset-0 blur-md bg-yellow-400/50 scale-150 -z-10"
					/>
				</motion.div>

				<motion.span
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="text-xs uppercase font-bold tracking-[0.3em] text-purple-400 filter drop-shadow-[0_0_5px_rgba(168,85,247,0.4)]"
				>
					Bảng xếp hạng
				</motion.span>

				<div className="relative h-16 flex items-center justify-center">
					<span className="absolute text-5xl md:text-6xl font-black italic tracking-tighter text-purple-600 blur-xl select-none opacity-80">
						TOP 10
					</span>

					<motion.span
						variants={flickerVariants}
						initial="initial"
						animate="animate"
						style={{ WebkitTextStroke: "2px #c084fc" }}
						className="absolute text-5xl md:text-6xl font-black italic tracking-tighter text-transparent select-none drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
					>
						TOP 10
					</motion.span>

					<span className="relative text-5xl md:text-6xl font-black italic tracking-tighter text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.9)]">
						TOP 10
					</span>
				</div>

				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="px-4 py-1 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-300 uppercase tracking-wider"
				>
					✨ {filmType} ✨
				</motion.div>

				<div className="relative w-24 h-0.5 mt-4 overflow-hidden">
					<div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-500 to-transparent" />
					<motion.div
						animate={{ x: ["-100%", "100%"] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
						className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-70"
					/>
				</div>
			</div>
		</div>
	)
}

export default NeonRankingHeader
