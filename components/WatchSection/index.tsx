"use client"
import { useState, useCallback, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useWatchHistory } from "@/hooks/useWatchHistory"
import { ResumeToast } from "./ResumeToast"
import { useArtplayer } from "@/hooks/useArtPlayer"
import Artplayer from "artplayer"
import { toast } from "sonner"

interface WatchSectionProps {
	episode: Episode
	autoNextOffset: number
	onEnded: () => void
	autoNext: boolean
	film: FilmInfo
	sid: string
	svt: string
}

const WatchSection = ({
	episode,
	autoNextOffset,
	onEnded,
	autoNext,
	film,
	sid,
	svt,
}: WatchSectionProps) => {
	const { user } = useAuth()
	const isAutoResume = useSearchParams().get("xem-tiep") === "true"

	const artRef = useRef<HTMLDivElement>(null)
	const artInstance = useRef<Artplayer | null>(null)

	const { history, showResumeModal, setShowResumeModal } = useWatchHistory(
		film._id,
		user?.id,
		episode.slug,
		isAutoResume,
	)

	const m3u8 = episode.link_m3u8 || episode.m3u8
	const embed = episode.link_embed || episode.embed
	const [playMode, setPlayMode] = useState<"m3u8" | "embed" | "error">(
		m3u8 ? "m3u8" : "embed",
	)

	const handleResume = useCallback(() => {
		if (artInstance.current && history) {
			artInstance.current.currentTime = history.current_time_seconds
			artInstance.current.notice.show = `Đang xem tiếp tập ${history.episode_slug}...`
			setShowResumeModal(false)
		}
	}, [history, setShowResumeModal])

	const handleArtCreated = useCallback((art: Artplayer) => {
		artInstance.current = art
	}, [])

	const handleArtDestroy = useCallback(() => {
		artInstance.current = null
	}, [])

	// KHỞI TẠO PLAYER QUA HOOK
	useArtplayer({
		artRef,
		artInstance,
		m3u8,
		embed,
		film,
		user,
		episode,
		history,
		isAutoResume,
		autoNext,
		autoNextOffset,
		onEnded,
		handleResume,
		setPlayMode,
		onCreated: handleArtCreated,
		onDestroy: handleArtDestroy,
		sid,
		svt,
	})

	useEffect(() => {
		const onSeekSignal = (e: Event) => {
			const customEvent = e as CustomEvent<{ seconds: number }>
			const seconds = customEvent.detail?.seconds

			if (artInstance.current && seconds) {
				artInstance.current.currentTime += seconds
				toast.success(`Đã nhảy qua ${seconds}s`)
			}
		}

		window.addEventListener("TU_PHIM_QUICK_SEEK", onSeekSignal)
		return () => window.removeEventListener("TU_PHIM_QUICK_SEEK", onSeekSignal)
	}, [])

	return (
		<div className="relative w-full h-full group bg-black">
			{playMode === "m3u8" && m3u8 ? (
				<div ref={artRef} className="w-full h-full" />
			) : playMode === "embed" ? (
				<iframe
					src={embed}
					className="w-full h-full border-none"
					allowFullScreen
				/>
			) : (
				<div className="w-full aspect-video flex items-center justify-center text-gray-400">
					Nguồn phim đang gặp sự cố...
				</div>
			)}

			{showResumeModal && history && (
				<ResumeToast
					history={history}
					onResume={handleResume}
					onClose={() => setShowResumeModal(false)}
				/>
			)}
		</div>
	)
}

export default WatchSection
