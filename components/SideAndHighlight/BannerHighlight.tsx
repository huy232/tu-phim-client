"use client"

import { IMAGE_URL } from "@/constants"
import { useEffect, useRef, useState } from "react"
import YouTube, { YouTubeProps } from "react-youtube"
import clsx from "clsx"
import { AnimatePresence, easeInOut, motion } from "framer-motion"
import { filmStatusMap, filmTypeMap } from "@/constants/film"
import Link from "next/link"
import { FavoriteWrapper } from "../FavoriteWrapper"

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.15,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: easeInOut,
		},
	},
}

type YTPlayer = {
	loadVideoById: (args: { videoId: string; startSeconds?: number }) => void
	playVideo: () => void
}

const BannerHighlight = ({
	film,
	isDesktop,
	youtubeId,
}: {
	film: FilmInfo
	isDesktop: boolean
	youtubeId: string | null
}) => {
	const playerRef = useRef<YTPlayer | null>(null)
	const prevVideoId = useRef<string | null>(null)

	const [videoReady, setVideoReady] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		if (!playerRef.current || !youtubeId) return

		if (prevVideoId.current === youtubeId) return

		prevVideoId.current = youtubeId

		try {
			playerRef.current.loadVideoById({
				videoId: youtubeId,
				startSeconds: 0,
			})
		} catch (err) {
			console.warn("loadVideoById error:", err)
		}
	}, [youtubeId])

	const onPlayerReady: YouTubeProps["onReady"] = (event) => {
		playerRef.current = event.target as YTPlayer

		try {
			event.target.playVideo()
		} catch {}
	}

	const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
		const player = event.target as YTPlayer

		if (event.data === 1) {
			setTimeout(() => setVideoReady(true), 120)
		}

		if (event.data === 3) {
			setVideoReady(false)
		}

		if (event.data === 0) {
			player.playVideo()
		}
	}

	const backgroundClass = clsx(
		"absolute inset-0 bg-no-repeat transition-opacity duration-700 ease-in-out z-0",
		"bg-center xl:bg-right",
		"bg-cover bg-black",
	)

	return (
		<div className="relative w-full h-full overflow-hidden">
			{/* ===== IMAGE ===== */}
			<motion.div
				key={film._id}
				initial={{ opacity: 0, scale: 1.05 }}
				animate={{ opacity: videoReady ? 0.4 : 1, scale: 1 }}
				transition={{ duration: 0.6 }}
				className={backgroundClass}
				style={{
					backgroundImage: `linear-gradient(to left, #000 0%, #000 5%, transparent 25%, transparent 75%, #000 95%, #000 100%), 
					linear-gradient(to top, #000 0%, transparent 40%), 
					url('https://wsrv.nl/?url=${IMAGE_URL}/${film.poster_url}')`,
				}}
			/>

			{/* ===== VIDEO ===== */}
			{isDesktop && youtubeId && !hasError && (
				<motion.div
					animate={{ opacity: videoReady ? 1 : 0 }}
					transition={{ duration: 0.6 }}
					className="absolute inset-0 pointer-events-none"
				>
					<YouTube
						videoId={youtubeId}
						id="youtube-player"
						opts={{
							playerVars: {
								autoplay: 1,
								mute: 1,
								loop: 1,
								playlist: youtubeId,
								controls: 0,
								rel: 0,
								modestbranding: 1,
							},
						}}
						onReady={onPlayerReady}
						onStateChange={onPlayerStateChange}
						onError={() => setHasError(true)}
						className="absolute top-1/2 left-1/2 min-w-full min-h-full w-[115vw] h-[115vh] -translate-x-1/2 -translate-y-1/2"
						iframeClassName="w-full h-full scale-125"
					/>
				</motion.div>
			)}
			<div className="absolute inset-0 shadow-[inset_0_0_100px_60px_#0a0a0a] z-10" />
			<div className="absolute inset-0 bg-linear-to-l from-[#0a0a0a]/60 via-[#0a0a0a]/20 to-transparent z-10" />
			<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/80 via-transparent to-transparent z-10" />
			<div className="absolute inset-0 bg-[#0a0a0a]/10 z-10" />

			<AnimatePresence mode="wait">
				<motion.div
					key={film._id}
					initial={{ opacity: 0, x: 80 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 40 }}
					transition={{ duration: 0.5 }}
					className="absolute bottom-6 left-1/2 -translate-x-1/2 xl:translate-x-40 xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 z-30 w-[80%] xl:w-75"
				>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="show"
						className={clsx(
							"relative p-5 rounded-2xl overflow-hidden",
							"bg-white/8 backdrop-blur-[20px]",
							"border border-white/20",
							"shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
							"transition-all duration-500 ease-out",
							"hover:bg-white/12",
							"hover:shadow-[0_12px_40px_rgba(168,85,247,0.25)]",
							"after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none",
							"after:bg-purple-500/10 after:blur-2xl",
							"after:opacity-0 after:transition-opacity after:duration-500",
							"hover:after:opacity-100",
						)}
					>
						<div className="absolute inset-0 bg-linear-to-l from-black/80 via-black/40 to-transparent rounded-2xl pointer-events-none" />
						<div className="absolute inset-0 bg-linear-to-br from-white/25 via-white/5 to-transparent opacity-40 pointer-events-none" />
						<div className="absolute inset-0 backdrop-blur-[2px] opacity-20 pointer-events-none" />
						<div className="relative z-10 space-y-4 text-white">
							{/* ===== TOP META ===== */}
							<motion.div
								variants={itemVariants}
								className="flex flex-wrap gap-2 text-[11px]"
							>
								{/* IMDB */}
								{film.imdb?.vote_average > 0 && (
									<span className="flex items-center gap-1 px-2 py-0.5 rounded border border-yellow-400/30 bg-yellow-400/20 text-yellow-300 font-semibold">
										<span className="text-[10px] font-black tracking-tight">
											IMDB
										</span>
										<span>{film.imdb.vote_average.toFixed(1)}</span>
									</span>
								)}

								{/* TMDB */}
								{film.tmdb?.vote_average > 0 && (
									<span className="flex items-center gap-1 px-2 py-0.5 rounded border border-[#01b4e4]/30 bg-[#01b4e4]/20 text-[#01b4e4] font-semibold">
										<span className="text-[10px] font-black tracking-tight">
											TMDB
										</span>
										<span>{film.tmdb.vote_average.toFixed(1)}</span>
									</span>
								)}
							</motion.div>

							{/* ===== SECOND META ===== */}
							<motion.div
								variants={itemVariants}
								className="flex flex-wrap gap-2 text-[11px] mt-2"
							>
								<span className="px-2 py-0.5 bg-white/10 text-white/80 rounded border border-white/20">
									{film.year}
								</span>

								<span
									className={clsx(
										"px-2 py-0.5 rounded border uppercase",
										filmTypeMap[film.type]?.color,
									)}
								>
									{filmTypeMap[film.type]?.label}
								</span>

								<span
									className={clsx(
										"px-2 py-0.5 rounded border uppercase",
										filmStatusMap[film.status]?.color,
									)}
								>
									{filmStatusMap[film.status]?.label}
								</span>
							</motion.div>

							{/* ===== DESCRIPTION ===== */}
							<motion.div
								variants={itemVariants}
								className="text-xs leading-relaxed font-extralight text-white/90 mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
							>
								<div
									className="line-clamp-2 md:line-clamp-3 lg:line-clamp-4 xl:line-clamp-5"
									dangerouslySetInnerHTML={{ __html: film.content }}
								/>
							</motion.div>

							{/* ===== EXTRA INFO ===== */}
							<motion.div
								variants={itemVariants}
								className="text-xs text-white/70 space-y-1 mt-2"
							>
								{/* TIME + QUALITY + EPISODE */}
								<div className="flex flex-wrap items-center gap-2">
									{film.time && <span>🎬 {film.time}</span>}

									{film.quality && (
										<span className="px-1.5 py-0.5 bg-purple/20 text-purple text-[10px] rounded border border-purple/30">
											{film.quality}
										</span>
									)}

									{film.episode_current && (
										<span
											className={clsx(
												"px-1.5 py-0.5 text-[10px] rounded border",
												film.episode_current === "Trailer"
													? "bg-yellow-400/20 text-yellow-300 border-yellow-400/30"
													: "bg-white/10 text-white border-white/20",
											)}
										>
											{film.episode_current}
										</span>
									)}
								</div>

								<div className="flex gap-2">
									{/* COUNTRY */}
									{film.country?.length > 0 && (
										<div>🌍 {film.country.map((c) => c.name).join(", ")}</div>
									)}

									{/* LANGUAGE */}
									{film.lang && <div>🗣️ {film.lang}</div>}
								</div>

								{/* DIRECTOR */}
								{film.director?.filter(Boolean)?.length > 0 && (
									<div>🎥 {film.director.filter(Boolean).join(", ")}</div>
								)}
							</motion.div>

							{/* ===== CATEGORY ===== */}
							<motion.div
								variants={itemVariants}
								className="flex flex-wrap gap-1 mt-3"
							>
								{film.category.map((cat, index) => (
									<span
										key={`${cat.id}-${index}`}
										className="text-[10px] px-2 py-0.5 bg-white/10 rounded border border-white/10 hover:bg-purple/20 transition"
									>
										{cat.name}
									</span>
								))}
							</motion.div>

							{/* CTA */}
							<motion.div
								variants={itemVariants}
								className="flex items-center gap-2 pt-2 w-full"
							>
								<Link
									href={`/xem-phim/${film.slug}`}
									className="cursor-pointer items-center justify-center flex-2 py-2 bg-purple text-white text-[13px] font-bold rounded-md hover:bg-purple-600 transition shadow-[0_0_12px_rgba(168,85,247,0.5)] uppercase tracking-wider text-center"
								>
									Xem ngay
								</Link>

								<Link
									href={`/thong-tin/${film.slug}`}
									className="flex-1 flex items-center justify-center py-2 text-[13px] bg-white/10 text-white font-medium rounded-md border border-white/10 hover:bg-white/20 transition whitespace-nowrap text-center"
								>
									Chi tiết
								</Link>

								<FavoriteWrapper film={film}>
									{({ isFavorited, handleToggle, loading }) => (
										<button
											onClick={handleToggle}
											disabled={loading}
											className={clsx(
												"cursor-pointer flex-1 py-2 text-[13px] rounded-md border transition flex items-center justify-center gap-2",
												isFavorited
													? "bg-purple-500/20 text-purple-400 border-purple-500/50"
													: "bg-white/5 text-white/80 border-white/10 hover:bg-white/20",
												loading && "opacity-50 cursor-not-allowed",
											)}
										>
											{loading ? (
												<span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
											) : (
												<span>{isFavorited ? "✓ Đã lưu" : "+ Lưu"}</span>
											)}
										</button>
									)}
								</FavoriteWrapper>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default BannerHighlight
