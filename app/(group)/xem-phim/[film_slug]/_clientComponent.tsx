"use client"
import EpisodeSection from "@/components/EpisodeSection.tsx"
import WatchSection from "@/components/WatchSection"
import ExtraFilmSection from "@/components/WatchSection/ExtraFilmSection"
import clsx from "clsx"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { createPortal } from "react-dom"
import { useCallback, useEffect, useMemo, useState } from "react"
import SideInfo from "@/components/WatchSection/SideInfo"
import CommentSection from "@/components/CommentSection"
import TopCard from "@/components/TopCard"
import RelatedFilm from "@/components/Info/RelatedFilm"
import SuggestedFilm from "@/components/Info/SuggestedFilm"
import NeonRankingHeader from "@/components/Heading/WatchHeading"
import { filmTypeMap } from "@/constants"
import BackToFilmInfo from "@/components/BackToFilmInfo"
import Disclaimer from "@/components/Disclaimer"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface WatchFilmProps {
	film: FilmInfo
	ep?: string | string[]
	sid?: string | string[]
	svt?: string | string[]
	initialComments: CommentWithProfile[]
	stickers: Sticker[]
}

const normalize = (val?: string | string[]) =>
	Array.isArray(val) ? val[0] : val

const WatchFilm = ({
	film,
	ep,
	sid,
	svt,
	initialComments,
	stickers,
}: WatchFilmProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [isTheaterMode, setIsTheaterMode] = useState(false)
	const [isDimmed, setIsDimmed] = useState(false)
	const [autoNext, setAutoNext] = useState(false)
	const [autoNextOffset, setAutoNextOffset] = useState(10)

	const { currentEpisode, currentServer, prevEpisodeSlug, nextEpisodeSlug } =
		useMemo(() => {
			const s_ep = normalize(ep)
			const s_sid = normalize(sid)
			const s_svt = normalize(svt)

			const server =
				film.episodes?.find(
					(s) => s.server_source === s_sid && s.server_type === s_svt,
				) || film.episodes?.[0]

			const serverData = server?.server_data || []
			const currentIndex = serverData.findIndex((e) => e.slug === s_ep)
			const activeIndex = currentIndex !== -1 ? currentIndex : 0
			const episode = serverData[activeIndex]

			const prevEpisodeSlug =
				activeIndex > 0 ? serverData[activeIndex - 1].slug : null
			const nextEpisodeSlug =
				activeIndex < serverData.length - 1
					? serverData[activeIndex + 1].slug
					: null

			return {
				currentEpisode: episode,
				currentServer: server,
				prevEpisodeSlug,
				nextEpisodeSlug,
			}
		}, [film, ep, sid, svt])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}, [currentEpisode?.slug])

	const handleNextEpisode = useCallback(() => {
		if (nextEpisodeSlug) {
			const params = new URLSearchParams(searchParams.toString())
			params.set("ep", nextEpisodeSlug)
			router.push(`?${params.toString()}`, { scroll: false })
		}
	}, [nextEpisodeSlug, router, searchParams])

	if (!currentEpisode)
		return <div className="p-4 text-center">Không tìm thấy tập phim</div>

	return (
		<>
			{isDimmed &&
				createPortal(
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3, ease: "linear" }}
							onClick={() => setIsDimmed(false)}
							className="fixed inset-0 bg-black z-1000 cursor-pointer"
						/>
					</AnimatePresence>,
					document.body,
				)}

			<LayoutGroup>
				<motion.div
					layout
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, ease: "linear" }}
					className={clsx(
						"mx-auto w-full h-full max-w-7xl px-4 md:px-6 pb-10",
						isDimmed ? "relative z-2000" : "",
					)}
				>
					<div className="grid grid-cols-1 lg:grid-cols-10 gap-6 w-full items-start">
						<div
							className={clsx(
								isTheaterMode
									? "contents"
									: "lg:col-span-7 flex flex-col gap-2",
							)}
						>
							<motion.div
								layout
								transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
								className={clsx(
									"shadow-2xl w-full",
									isTheaterMode ? "lg:col-span-10" : "",
									isDimmed ? "z-2000" : "z-30",
								)}
							>
								<div className="relative flex flex-col mx-auto w-full">
									<motion.div
										layout
										transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
										className={clsx("relative w-full z-20", "aspect-video")}
									>
										<AnimatePresence mode="popLayout">
											<motion.div
												key={`${currentServer?.server_source}-${currentEpisode.slug}`}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3, ease: "linear" }}
												className="absolute inset-0 w-full"
											>
												<WatchSection
													key={`${currentServer?.server_source}-${currentEpisode.slug}`}
													episode={currentEpisode}
													onEnded={handleNextEpisode}
													autoNext={autoNext}
													autoNextOffset={autoNextOffset}
													film={film}
												/>
											</motion.div>
										</AnimatePresence>
									</motion.div>
								</div>
								<ExtraFilmSection
									handleTheaterMode={setIsTheaterMode}
									isTheaterMode={isTheaterMode}
									prevEpisodeSlug={prevEpisodeSlug}
									nextEpisodeSlug={nextEpisodeSlug}
									currentServer={currentServer}
									isDimmed={isDimmed}
									setIsDimmed={setIsDimmed}
									autoNext={autoNext}
									setAutoNext={setAutoNext}
									autoNextOffset={autoNextOffset}
									setAutoNextOffset={setAutoNextOffset}
									film={film}
								/>
							</motion.div>

							<motion.div
								layout
								transition={{ duration: 0.3, ease: "linear" }}
								className={clsx(
									"space-y-6 w-full h-fit",
									isTheaterMode ? "lg:col-span-7" : "",
									isDimmed ? "opacity-0 pointer-events-none" : "opacity-100",
								)}
							>
								<div className="relative border-b border-white/5 pb-6 mb-6 grid grid-cols-1 lg:grid-cols-10 gap-6 items-center mt-4">
									<div className="space-y-3 lg:col-span-6 min-w-0">
										<div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
											<span className="hover:text-purple-400 transition-colors cursor-default">
												{filmTypeMap[film.type].label}
											</span>
											<span className="w-1 h-1 rounded-full bg-gray-700" />
											<span className="text-purple-500/80">{film.year}</span>
										</div>

										<div className="space-y-1">
											<h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight">
												<span className="opacity-90 hover:opacity-100 transition-opacity">
													{film.name}
												</span>
											</h1>
										</div>

										<div className="flex items-center gap-3">
											<div className="group flex items-center gap-2 px-3 py-1.5 bg-white/3 border border-white/10 rounded-full hover:border-purple-500/30 transition-all duration-300">
												<div className="relative flex">
													<div className="w-2 h-2 bg-purple-500 rounded-full animate-ping absolute inset-0" />
													<div className="w-2 h-2 bg-purple-500 rounded-full relative" />
												</div>
												<span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-purple-400">
													{currentServer?.server_name || "Nguồn phát"}
												</span>
											</div>

											<span className="text-[10px] font-black px-2 py-0.5 border border-white/10 text-gray-500 rounded uppercase">
												Tập: {currentEpisode.name}
											</span>
										</div>
									</div>

									<div className="lg:col-span-4 flex justify-center items-center">
										<BackToFilmInfo filmName={film.name} filmSlug={film.slug} />
									</div>
								</div>

								<EpisodeSection
									episodes={film.episodes}
									film_slug={film.slug}
								/>
								<Disclaimer />
								<RelatedFilm relatedFilm={film.related} />
								<SuggestedFilm suggestedFilm={film.suggest} />

								<CommentSection
									initialComments={initialComments}
									stickers={stickers}
									film={film}
								/>
							</motion.div>
						</div>

						<div
							className={clsx(
								"space-y-6 shrink-0 h-fit lg:col-span-3",
								isDimmed ? "opacity-0 pointer-events-none" : "opacity-100",
							)}
						>
							{/* KHU VỰC 2: THÔNG TIN PHIM */}
							<SideInfo film={film} isDimmed={isDimmed} />
							<NeonRankingHeader
								filmType={filmTypeMap[film.type].label || "Phim Hot"}
							/>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-12 pt-6">
								{film.top_type.map((top, index) => (
									<TopCard
										key={top._id}
										filmCard={top}
										ranking={index + 1}
										rankPosition="right"
									/>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</LayoutGroup>
		</>
	)
}

export default WatchFilm
