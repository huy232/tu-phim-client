"use client"

import { IMAGE_URL } from "@/constants"
import { useEffect, useRef, useState } from "react"
import YouTube, { YouTubeProps } from "react-youtube"
import FilmInfo from "./FilmInfo"
import clsx from "clsx"
import { toast } from "sonner"

const BannerSlide = ({
	film,
	isDesktop,
	youtubeId,
	isActive,
}: {
	film: FilmInfo
	isDesktop: boolean
	youtubeId: string | null
	isActive: boolean
}) => {
	const [isVideoReady, setIsVideoReady] = useState(false)
	const [hasError, setHasError] = useState(false)

	const [isFadingOut, setIsFadingOut] = useState(false)
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	const clearFadeTimer = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
			timerRef.current = null
		}
	}

	useEffect(() => {
		return () => clearFadeTimer()
	}, [])

	const onPlayerReady: YouTubeProps["onReady"] = (event) => {
		if (event && event.target) {
			try {
				event.target.playVideo()
			} catch (error) {
				if (error instanceof Error) {
					toast.warning(error.message)
					console.warn("YouTube playVideo failed:", error)
				}
			}
		}
	}
	const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
		const player = event.target

		if (event.data === 1) {
			setIsVideoReady(true)
			setIsFadingOut(false)
			clearFadeTimer()

			const timeRemaining =
				(player.getDuration() - player.getCurrentTime()) * 1000
			if (timeRemaining > 2000) {
				timerRef.current = setTimeout(() => {
					setIsFadingOut(true)
				}, timeRemaining - 1500)
			}
		}

		if (event.data === 0) {
			player.playVideo()
		}
	}

	const shouldShowVideo = isActive && isVideoReady && !isFadingOut

	const backgroundClass = clsx(
		"absolute inset-0 bg-no-repeat bg-right bg-black",
		"transition-opacity duration-1500 ease-in-out z-0",
		"bg-size-[100%] md:bg-size-[70%]",
		{
			"opacity-0": shouldShowVideo && isActive,
			"opacity-100": !(shouldShowVideo && isActive),
		},
	)

	const videoWrapperClass = clsx(
		"absolute inset-0 transition-opacity duration-1500 ease-in-out",
		{
			"opacity-100 pointer-events-auto": shouldShowVideo && isActive,
			"opacity-0 pointer-events-none": !shouldShowVideo || !isActive,
		},
	)

	return (
		<div className="relative w-full h-full overflow-hidden">
			<div
				className={backgroundClass}
				style={{
					backgroundImage: `linear-gradient(to right, #000 0%, #000 5%, transparent 25%, transparent 75%, #000 95%, #000 100%), 
                                  linear-gradient(to top, #000 0%, transparent 40%), 
                                  url('https://wsrv.nl/?url=${IMAGE_URL}/${film.poster_url}')`,
				}}
			/>

			{isDesktop && youtubeId && !hasError && isActive && (
				<div className={videoWrapperClass}>
					<YouTube
						videoId={youtubeId}
						id={`youtube-player-${film._id}`}
						opts={{
							playerVars: {
								autoplay: 1,
								mute: 1,
								loop: 1,
								playlist: youtubeId,
								controls: 0,
								showinfo: 0,
								rel: 0,
								modestbranding: 1,
								iv_load_policy: 3,
								disablekb: 1,
								fs: 0,
							},
						}}
						onReady={onPlayerReady}
						onStateChange={onPlayerStateChange}
						onError={() => setHasError(true)}
						className="absolute top-1/2 left-1/2 min-w-full min-h-full w-[115vw] h-[115vh] -translate-x-1/2 -translate-y-1/2 object-cover"
						iframeClassName="w-full h-full pointer-events-none scale-125"
					/>
				</div>
			)}
			<div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_60px_#0a0a0a] z-10" />
			<div className="absolute inset-0 pointer-events-none bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10" />
			<div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
			<div className="absolute inset-0 pointer-events-none bg-[#0a0a0a]/20 z-10" />

			<FilmInfo film={film} />
		</div>
	)
}

export default BannerSlide
