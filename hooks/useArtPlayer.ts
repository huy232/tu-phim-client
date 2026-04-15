import {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	MutableRefObject,
	RefObject,
	useCallback,
} from "react"
import Artplayer from "artplayer"
import Hls from "hls.js"
import {
	ARTPLAYER_BASIC_SETTINGS,
	ARTPLAYER_I18N,
} from "@/constants/artPlayerConfig"
import { handleSaveProgress } from "@/services/tien-trinh"
import artplayerPluginAmbilight from "artplayer-plugin-ambilight"
import artplayerPluginHlsControl from "artplayer-plugin-hls-control"
import { handleGainExp } from "@/services/thang-cap"
import { useAuth } from "./useAuth"
import { toast } from "sonner"

interface UseArtplayerProps {
	artRef: RefObject<HTMLDivElement | null>
	artInstance: MutableRefObject<Artplayer | null>
	m3u8: string | undefined
	embed: string | undefined
	film: FilmInfo
	user: { id: string } | null | undefined
	episode: Episode
	history: HistoryProgress | null
	isAutoResume: boolean
	autoNext: boolean
	autoNextOffset: number
	onEnded: () => void
	handleResume: () => void
	setPlayMode: Dispatch<SetStateAction<"m3u8" | "embed" | "error">>
	onCreated: (art: Artplayer) => void
	onDestroy: () => void
	sid: string
	svt: string
}

type HlsLevel = {
	height?: number
	bitrate?: number
}

export const useArtplayer = (props: UseArtplayerProps) => {
	const {
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
		onCreated,
		onDestroy,
		sid,
		svt,
	} = props
	const hlsRef = useRef<Hls | null>(null)
	const lastSavedTimeRef = useRef(0)

	const callbacks = useRef({
		onEnded,
		handleResume,
		film,
		user,
		episode,
		sid,
		svt,
	})
	const internalArtRef = useRef<Artplayer | null>(null)

	const autoNextRef = useRef(autoNext)
	const offsetRef = useRef(autoNextOffset)

	const watchExpTimeRef = useRef(0)
	const lastTickTimeRef = useRef(0)

	const { fetchProfile } = useAuth()

	const syncExpAndProfile = useCallback(
		async (userId: string) => {
			try {
				const res = await handleGainExp(10)

				if (res?.success) {
					if (fetchProfile) {
						await fetchProfile(userId)
					}
				}
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message)
					console.error("Lỗi gì đó, chưa thể cộng EXP:", error)
				}
			}
		},
		[fetchProfile],
	)

	useEffect(() => {
		callbacks.current = { onEnded, handleResume, film, user, episode, sid, svt }
	}, [onEnded, handleResume, film, user, episode, sid, svt])

	useEffect(() => {
		autoNextRef.current = autoNext
		offsetRef.current = autoNextOffset

		const instance = internalArtRef.current
		if (instance) {
			instance.notice.show = `Tự động chuyển tập: ${autoNext ? "BẬT" : "TẮT"}`
		}
	}, [autoNext, autoNextOffset])

	useEffect(() => {
		if (!m3u8 || !props.artRef.current) return

		const art = new Artplayer({
			...ARTPLAYER_BASIC_SETTINGS,
			container: props.artRef.current,
			url: m3u8,
			i18n: ARTPLAYER_I18N,
			customType: {
				m3u8: (video, url) => {
					if (Hls.isSupported()) {
						if (hlsRef.current) hlsRef.current.destroy()
						const hls = new Hls()
						hls.loadSource(url)
						hls.attachMedia(video)
						hlsRef.current = hls
						art.hls = hls
						hls.on(Hls.Events.ERROR, (_, data) => {
							if (data.fatal) {
								hls.destroy()
								art.destroy()
								setPlayMode(embed ? "embed" : "error")
							}
						})
					} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
						video.src = url
					}
				},
			},
			plugins: [
				artplayerPluginAmbilight({
					blur: "50px",
					opacity: 1,
					frequency: 2,
					duration: 0.3,
				}),
				artplayerPluginHlsControl({
					quality: {
						setting: true,
						title: "Chất lượng",
						auto: "Tự động",
						getName: (level: HlsLevel) => `${level.height}P`,
					},
				}),
			],
		})

		internalArtRef.current = art
		onCreated(art)

		art.on("ready", () => {
			if (
				isAutoResume &&
				history?.episode_slug === callbacks.current.episode.slug
			) {
				callbacks.current.handleResume()
			}
		})

		art.on("video:timeupdate", () => {
			const { currentTime, duration, playing } = art
			const { user, film, episode, onEnded, sid, svt } = callbacks.current

			// console.log("Current Time: ", currentTime, "Duration: ", duration, "User: ", user?.id )

			// Lưu xem tiếp
			if (
				!isNaN(duration) &&
				currentTime - lastSavedTimeRef.current > 60 &&
				user?.id
			) {
				lastSavedTimeRef.current = currentTime
				handleSaveProgress(
					film,
					user.id,
					episode,
					currentTime,
					duration,
					sid,
					svt,
				)
			}
			// Track level
			if (playing && user?.id) {
				const floorTime = Math.floor(art.currentTime)
				if (floorTime !== lastTickTimeRef.current) {
					lastTickTimeRef.current = floorTime
					watchExpTimeRef.current += 1
				}

				if (watchExpTimeRef.current >= 10) {
					watchExpTimeRef.current = 0
					syncExpAndProfile(user.id)
				}
			}

			// Tập tới
			if (autoNextRef.current) {
				const timeLeft = duration - currentTime
				if (timeLeft <= offsetRef.current && timeLeft > 0 && duration > 0) {
					onEnded()
					art.off("video:timeupdate")
				}
			}
		})

		art.on("video:pause", () => {
			const { user, film, episode, sid, svt } = callbacks.current
			if (user?.id) {
				handleSaveProgress(
					film,
					user.id,
					episode,
					art.currentTime,
					art.duration,
					sid,
					svt,
				)
			}
		})

		art.on("video:ended", () => {
			if (autoNextRef.current) callbacks.current.onEnded()
		})

		return () => {
			const { user, film, episode, sid, svt } = callbacks.current

			if (user?.id) {
				handleSaveProgress(
					film,
					user.id,
					episode,
					art.currentTime,
					art.duration,
					sid,
					svt,
				)
			}

			if (art.mini) {
				art.mini = false
			}

			if (hlsRef.current) {
				hlsRef.current.destroy()
				hlsRef.current = null
			}

			art.destroy(true)

			internalArtRef.current = null
			onDestroy()
		}
	}, [
		m3u8,
		props.artRef,
		props.artInstance,
		embed,
		isAutoResume,
		setPlayMode,
		history?.episode_slug,
		onCreated,
		onDestroy,
		syncExpAndProfile,
	])

	return {}
}
