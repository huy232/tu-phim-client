"use client"
import { motion } from "framer-motion"
import { PlayIcon, MessageSquare, Heart, Share2, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { FavoriteWrapper } from "../FavoriteWrapper"
import clsx from "clsx"

const ActionButtons = ({
	firstEpisode,
	film,
}: {
	firstEpisode: string
	film: FilmInfo
}) => {
	const [copied, setCopied] = useState(false)

	const scrollToComments = () => {
		const commentSection = document.getElementById("comment-section")

		if (commentSection) {
			commentSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
		}
	}

	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Lỗi copy link:", err)
		}
	}

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { staggerChildren: 0.1 },
		},
	}

	const buttonVariants = {
		initial: { scale: 1 },
		hover: { scale: 1.05, y: -2 },
		tap: { scale: 0.95 },
	}

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="flex flex-wrap items-center gap-3 mt-4"
		>
			{/* Nút Xem Ngay */}
			<Link href={firstEpisode} className="block">
				<motion.div
					variants={buttonVariants}
					whileHover="hover"
					whileTap="tap"
					className="relative group bg-purple-600 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
				>
					<PlayIcon size={16} fill="currentColor" />
					<span className="relative z-10">Xem Ngay</span>
					<motion.div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
				</motion.div>
			</Link>

			{/* Nút Bình Luận - Thêm onClick scrollToComments */}
			<motion.button
				onClick={scrollToComments}
				variants={buttonVariants}
				whileHover="hover"
				whileTap="tap"
				className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3.5 rounded-xl font-bold text-xs uppercase flex items-center gap-2 transition-colors cursor-pointer"
			>
				<MessageSquare size={16} />
				Bình Luận
			</motion.button>

			{/* Nút Yêu Thích */}
			<FavoriteWrapper film={film}>
				{({ isFavorited, handleToggle, loading }) => (
					<motion.button
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
						onClick={handleToggle}
						disabled={loading}
						className={clsx(
							"p-3.5 rounded-xl border transition-all duration-300 cursor-pointer",
							isFavorited
								? "bg-pink-500 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]"
								: "bg-pink-500/10 border-pink-500/20 text-pink-500 hover:bg-pink-500 hover:text-white",
						)}
					>
						<motion.div
							animate={isFavorited ? { scale: [1, 1.3, 1] } : {}}
							whileHover={{ scale: [1, 1.2, 1] }}
							transition={{ duration: 0.4 }}
						>
							<Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
						</motion.div>
					</motion.button>
				)}
			</FavoriteWrapper>

			{/* Nút Chia Sẻ - Thêm onClick handleShare */}
			<motion.button
				onClick={handleShare}
				variants={buttonVariants}
				whileHover="hover"
				whileTap="tap"
				className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
					copied
						? "bg-green-500/20 border-green-500/50 text-green-500"
						: "bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white"
				}`}
			>
				<motion.div whileHover={!copied ? { rotate: 15 } : {}}>
					{copied ? <Check size={18} /> : <Share2 size={18} />}
				</motion.div>
			</motion.button>
		</motion.div>
	)
}

export default ActionButtons
