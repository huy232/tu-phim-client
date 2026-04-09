"use client"
import { WEB_URL } from "@/constants"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BackToFilmInfoProps {
	filmName: string
	filmSlug: string
}

const BackToFilmInfo = ({ filmName, filmSlug }: BackToFilmInfoProps) => {
	return (
		<Link
			href={`${WEB_URL}/thong-tin/${filmSlug}`}
			className="block w-full max-w-[280px]"
		>
			<motion.div
				className="relative group cursor-pointer"
				whileHover="hover"
				whileTap={{ scale: 0.98 }}
			>
				<div className="absolute -inset-0.5 bg-linear-to-r from-purple-600/50 via-pink-600/50 to-blue-600/50 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

				<div className="relative flex items-center gap-3 px-4 py-2.5 bg-[#0a0a0a]/90 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl">
					<motion.div
						className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
						variants={{
							hover: {
								x: ["-100%", "100%"],
								transition: { duration: 0.5, ease: "linear" },
							},
						}}
						style={{ transform: "translateX(-100%)" }}
					/>

					<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg border border-white/5">
						<motion.div
							variants={{
								hover: { x: -2 },
							}}
						>
							<ArrowLeft
								size={16}
								className="text-purple-400 group-hover:text-purple-300 transition-colors"
							/>
						</motion.div>
					</div>

					<div className="flex flex-col items-start min-w-0">
						<span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">
							Thông tin về
						</span>
						<h3 className="text-xs font-bold text-zinc-200 w-full group-hover:text-white transition-colors">
							{filmName}
						</h3>
					</div>
				</div>
			</motion.div>
		</Link>
	)
}

export default BackToFilmInfo
