"use client"
import React, { useState, useMemo, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import EpisodeButton from "./EpisodeButton"

interface GridModeProps {
	data: Episode[]
	serverSupply: Episodes
	filmSlug: string
	activeEpisodeIndex: number
	isWatchPage: boolean
	activeEpisodeSlug: string
	playingServer: Episodes
}

const GridMode = ({
	data,
	serverSupply,
	filmSlug,
	activeEpisodeIndex,
	isWatchPage,
	activeEpisodeSlug,
	playingServer,
}: GridModeProps) => {
	const [displayLimit, setDisplayLimit] = useState(() => {
		if (activeEpisodeIndex >= 0) {
			return Math.max(100, activeEpisodeIndex + 20)
		}
		return 100
	})

	const containerRef = useRef<HTMLDivElement>(null)

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
		if (scrollHeight - scrollTop <= clientHeight + 200) {
			if (displayLimit < data.length) {
				setDisplayLimit((prev) => prev + 100)
			}
		}
	}

	useEffect(() => {
		if (activeEpisodeIndex >= 0 && containerRef.current) {
			const el = containerRef.current.querySelector(
				`[data-ep-index="${activeEpisodeIndex}"]`,
			)

			if (el) {
				el.scrollIntoView({
					behavior: "smooth",
					block: "center",
				})
			}
		}
	}, [activeEpisodeIndex, displayLimit])

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			ref={containerRef}
			onScroll={handleScroll}
			className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 px-4 py-4 max-h-125 overflow-y-auto custom-scrollbar my-4 border border-white/5 rounded-xl bg-white/5"
		>
			{data.slice(0, displayLimit).map((ep, idx) => (
				<div key={idx} data-ep-index={idx}>
					<EpisodeButton
						ep={ep}
						filmSlug={filmSlug}
						serverSupply={serverSupply}
						isWatchPage={isWatchPage}
						activeEpisodeSlug={activeEpisodeSlug}
						activeEpisodeIndex={activeEpisodeIndex}
						index={idx}
						playingServer={playingServer}
					/>
				</div>
			))}

			{displayLimit < data.length && (
				<div className="col-span-full text-center py-2 text-[10px] text-gray-500 uppercase tracking-widest animate-pulse">
					Đang tải thêm tập...
				</div>
			)}
		</motion.div>
	)
}

export default GridMode
