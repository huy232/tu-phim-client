"use client"
import { memo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import clsx from "clsx"

const EpisodeButton = ({
	filmSlug,
	ep,
	serverSupply,
	isWatchPage,
	activeEpisodeSlug,
	index,
	activeEpisodeIndex,
	playingServer,
	isWatched,
}: {
	filmSlug: string
	ep: Episode
	serverSupply: Episodes
	isWatchPage: boolean
	activeEpisodeSlug: string
	index: number
	activeEpisodeIndex: number
	playingServer: Episodes
	isWatched: boolean
}) => {
	// Tạo URL query: ?ep=1&sid=A&svt=vietsub
	// ep: slug tập phim
	// sid: source id (A, B, C)
	// svt: server type (vietsub, long-tieng...)

	const href = `/xem-phim/${filmSlug}?ep=${ep.slug}&sid=${serverSupply.server_source}&svt=${serverSupply.server_type}`

	const isActive =
		isWatchPage &&
		activeEpisodeSlug === ep.slug &&
		playingServer &&
		serverSupply.server_source === playingServer.server_source

	return (
		<Link href={href} className="block relative">
			<motion.div
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className={clsx(
					"aspect-video flex items-center justify-center border rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer",
					isActive
						? "bg-purple-600 text-white border-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-105"
						: isWatched
							? "bg-purple-900/30 border-purple-500/40 text-purple-300 shadow-[inset_0_0_10px_rgba(168,85,247,0.1)]"
							: "bg-white/5 border-white/10 text-gray-400 hover:bg-purple-600/20 hover:border-purple-600/40 hover:text-purple-400",
				)}
			>
				{ep.name}
			</motion.div>
		</Link>
	)
}

export default memo(EpisodeButton)
