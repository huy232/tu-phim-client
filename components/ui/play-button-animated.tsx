"use client"
import { PlayButton } from "@/assets/icons"
import { motion } from "framer-motion"
import Link from "next/link"

const PlayButtonAnimated = ({ filmSlug }: { filmSlug: string }) => {
	return (
		<Link href={`/xem-phim/${filmSlug}`}>
			<motion.button
				className="relative z-30 cursor-pointer lg:px-3 xl:px-4 py-2 border-[0.5px] border-purple/50 rounded-full flex items-center gap-2 h-12.5 bg-purple/80 text-white shadow-lg overflow-hidden group"
				whileHover={{
					scale: 1.05,
					backgroundColor: "#a855f7",
					boxShadow: "0px 0px 25px 5px rgba(168, 85, 247, 0.7)",
				}}
				whileTap={{ scale: 0.95 }}
				animate={{
					boxShadow: [
						"0px 0px 10px rgba(168, 85, 247, 0.2)",
						"0px 0px 20px rgba(168, 85, 247, 0.5)",
						"0px 0px 10px rgba(168, 85, 247, 0.2)",
					],
				}}
				transition={{
					boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
				}}
			>
				<motion.div
					className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full"
					whileHover={{ x: "120%" }}
					transition={{ duration: 0.6 }}
				/>

				<PlayButton className="w-4 h-4 fill-current drop-shadow-[0_0_5px_white]" />
				<span className="lg:text-sm xl:text-md font-bold uppercase tracking-wider relative z-10">
					Xem ngay
				</span>
			</motion.button>
		</Link>
	)
}

export default PlayButtonAnimated
