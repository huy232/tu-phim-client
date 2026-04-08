"use client"
import { useEffect, useMemo, useState, useTransition } from "react"
import clsx from "clsx"
import type { Swiper as SwiperType } from "swiper"
import ViewMode from "./ViewMode"
import ServerTab from "./ServerTab"
import ChunkMode from "./ChunkMode"
import GridMode from "./GridMode"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

const EpisodeSection = ({
	episodes,
	film_slug,
}: {
	episodes: Episodes[]
	film_slug: string
}) => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()

	const [isChunked, setIsChunked] = useState(true)
	const [activeChunk, setActiveChunk] = useState(0)
	const [isPending, startTransition] = useTransition()
	const [swiper, setSwiper] = useState<SwiperType | null>(null)

	const isWatchPage = pathname.includes("/xem-phim")
	const chunkSize = 50

	const playingServer = useMemo(() => {
		return (
			episodes.find(
				(ep) =>
					ep.server_source === searchParams.get("sid") &&
					ep.server_type === searchParams.get("svt"),
			) || episodes[0]
		)
	}, [episodes, searchParams])

	const [viewingServer, setViewingServer] = useState<Episodes>(playingServer)

	useEffect(() => {
		setViewingServer(playingServer)
	}, [playingServer])

	const handleSwitchTab = (server: Episodes) => {
		setViewingServer(server)
		setActiveChunk(0)
	}

	const episodeData = useMemo(
		() => viewingServer.server_data || [],
		[viewingServer],
	)

	const chunks = useMemo(() => {
		const result = []
		for (let i = 0; i < episodeData.length; i += chunkSize) {
			result.push(episodeData.slice(i, i + chunkSize))
		}
		return result
	}, [episodeData])

	const toggleMode = (mode: boolean) => {
		startTransition(() => setIsChunked(mode))
	}

	const activeEpisodeSlug = searchParams.get("ep") || ""

	const activeEpisodeIndex = useMemo(() => {
		return playingServer.server_data.findIndex(
			(ep) => ep.slug === activeEpisodeSlug,
		)
	}, [playingServer, activeEpisodeSlug])

	useEffect(() => {
		if (swiper && !swiper.isLocked) {
			swiper.slideTo(activeChunk, 300)
		}
	}, [activeChunk, swiper])

	return (
		<section
			className={clsx("my-8 transition-opacity", isPending && "opacity-50")}
		>
			<ViewMode viewMode={isChunked} handleToggleMode={toggleMode} />
			<ServerTab
				episodes={episodes}
				setActiveServer={handleSwitchTab}
				setActiveChunk={setActiveChunk}
				activeServer={viewingServer}
			/>

			<div className="relative min-h-25 w-full">
				{isChunked && episodeData.length > chunkSize ? (
					<ChunkMode
						setSwiper={setSwiper}
						chunks={chunks}
						setActiveChunk={setActiveChunk}
						swiper={swiper}
						activeChunk={activeChunk}
						chunkSize={chunkSize}
						data={episodeData}
						activeServer={viewingServer}
						filmSlug={film_slug}
						isWatchPage={isWatchPage}
						activeEpisodeSlug={activeEpisodeSlug}
						activeEpisodeIndex={activeEpisodeIndex}
						playingServer={playingServer}
					/>
				) : (
					<GridMode
						data={episodeData}
						filmSlug={film_slug}
						serverSupply={viewingServer}
						activeEpisodeIndex={activeEpisodeIndex}
						isWatchPage={isWatchPage}
						activeEpisodeSlug={activeEpisodeSlug}
						playingServer={playingServer}
					/>
				)}
			</div>
		</section>
	)
}

export default EpisodeSection
