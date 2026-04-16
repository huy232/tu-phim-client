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
import { useMediaQuery } from "./useMediaQuery"

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
	onPrev?: () => void
	onNext?: () => void
	prevEpisodeSlug: string | null
	nextEpisodeSlug: string | null
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
		prevEpisodeSlug,
		nextEpisodeSlug,
		onPrev,
		onNext,
	} = props

	const isMobile = useMediaQuery("(max-width: 1024px)")

	const hlsRef = useRef<Hls | null>(null)
	const internalArtRef = useRef<Artplayer | null>(null)

	// Giữ DOM controls
	const controlElsRef = useRef<{
		prev?: HTMLElement
		next?: HTMLElement
	}>({})

	// No stale
	const navRef = useRef({
		prevEpisodeSlug,
		nextEpisodeSlug,
		onPrev,
		onNext,
	})

	useEffect(() => {
		navRef.current = {
			prevEpisodeSlug,
			nextEpisodeSlug,
			onPrev,
			onNext,
		}
	}, [prevEpisodeSlug, nextEpisodeSlug, onPrev, onNext])

	const lastSavedTimeRef = useRef(0)
	const watchExpTimeRef = useRef(0)
	const lastTickTimeRef = useRef(0)

	const autoNextRef = useRef(autoNext)
	const offsetRef = useRef(autoNextOffset)

	useEffect(() => {
		autoNextRef.current = autoNext
		offsetRef.current = autoNextOffset
	}, [autoNext, autoNextOffset])

	const { fetchProfile } = useAuth()

	const syncExpAndProfile = useCallback(
		async (userId: string) => {
			try {
				const res = await handleGainExp(10)
				if (res?.success && fetchProfile) {
					await fetchProfile(userId)
				}
			} catch (error) {
				console.error(error)
			}
		},
		[fetchProfile],
	)

	// ======================
	// INIT PLAYER
	// ======================
	useEffect(() => {
		if (!m3u8 || !props.artRef.current) return
		if (internalArtRef.current) return

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

			controls: [
				{
					name: "prev-episode",
					position: "right",
					html: `
<svg width="18" height="18" viewBox="0 0 24 24" fill="white">
  <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" fill="none"/>
</svg>
`,
					tooltip: "Tập trước",
					mounted: ($el) => {
						controlElsRef.current.prev = $el
					},
					click: () => {
						const { prevEpisodeSlug, onPrev } = navRef.current
						if (prevEpisodeSlug) onPrev?.()
					},
				},
				{
					name: "next-episode",
					position: "right",
					html: `
<svg width="18" height="18" viewBox="0 0 24 24" fill="white">
  <path d="M9 6L15 12L9 18" stroke="white" stroke-width="2" fill="none"/>
</svg>
`,
					tooltip: "Tập tiếp theo",
					mounted: ($el) => {
						controlElsRef.current.next = $el
					},
					click: () => {
						const { nextEpisodeSlug, onNext } = navRef.current
						if (nextEpisodeSlug) onNext?.()
					},
				},
			],

			plugins: [
				artplayerPluginAmbilight({ blur: "50px", opacity: 1 }),
				artplayerPluginHlsControl({
					quality: {
						setting: true,
						auto: "Tự động",
						getName: (level: HlsLevel) => `${level.height}P`,
					},
				}),
			],
		})

		internalArtRef.current = art
		onCreated(art)

		return () => {
			art.destroy(true)
			internalArtRef.current = null
			onDestroy()
		}
	}, [])

	// ======================
	// DISPLAY NEXT/PREV BUTTON
	// ======================

	useEffect(() => {
		const prevBtn = controlElsRef.current.prev
		const nextBtn = controlElsRef.current.next

		if (!prevBtn || !nextBtn) return

		if (isMobile) {
			prevBtn.style.display = "none"
			nextBtn.style.display = "none"
		} else {
			prevBtn.style.display = "flex"
			nextBtn.style.display = "flex"
		}
	}, [isMobile])

	// ======================
	// SWITCH EPISODE
	// ======================
	useEffect(() => {
		const art = internalArtRef.current
		if (!art || !m3u8) return

		const currentTime = art.currentTime
		const isPlaying = art.playing
		const isFullscreen = art.fullscreen

		art.switchUrl(m3u8)

		art.once("ready", () => {
			art.currentTime = currentTime

			if (isPlaying) art.play()
			if (isFullscreen) art.fullscreen = true

			art.notice.show = `Đang phát tập ${episode.name}`
		})
	}, [m3u8])

	// ======================
	// UPDATE UI BUTTON
	// ======================
	useEffect(() => {
		const prevBtn = controlElsRef.current.prev
		const nextBtn = controlElsRef.current.next

		if (prevBtn) {
			prevBtn.style.opacity = prevEpisodeSlug ? "1" : "0.3"
			prevBtn.style.cursor = prevEpisodeSlug ? "pointer" : "not-allowed"
			prevBtn.style.pointerEvents = prevEpisodeSlug ? "auto" : "none"
			prevBtn.title = prevEpisodeSlug ? "Tập trước" : "Đây là tập đầu"
		}

		if (nextBtn) {
			nextBtn.style.opacity = nextEpisodeSlug ? "1" : "0.3"
			nextBtn.style.cursor = nextEpisodeSlug ? "pointer" : "not-allowed"
			nextBtn.style.pointerEvents = nextEpisodeSlug ? "auto" : "none"
			nextBtn.title = nextEpisodeSlug ? "Tập tiếp theo" : "Hết tập rồi"
		}
	}, [prevEpisodeSlug, nextEpisodeSlug])

	// ======================
	// AUTO RESUME
	// ======================
	useEffect(() => {
		const art = internalArtRef.current
		if (!art) return

		const onReady = () => {
			if (isAutoResume && history && history.episode_slug === episode.slug) {
				handleResume()
			}
		}

		art.on("ready", onReady)

		return () => {
			art.off("ready", onReady)
		}
	}, [episode.slug, history, isAutoResume, handleResume])

	// ======================
	// AUTO NEXT + SAVE
	// ======================
	useEffect(() => {
		const art = internalArtRef.current
		if (!art) return

		const onTimeUpdate = () => {
			const { currentTime, duration, playing } = art

			if (
				!isNaN(duration) &&
				currentTime - lastSavedTimeRef.current > 90 &&
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

			if (playing && user?.id) {
				const floorTime = Math.floor(currentTime)
				if (floorTime !== lastTickTimeRef.current) {
					lastTickTimeRef.current = floorTime
					watchExpTimeRef.current++
				}

				if (watchExpTimeRef.current >= 90) {
					watchExpTimeRef.current = 0
					syncExpAndProfile(user.id)
				}
			}

			if (autoNextRef.current) {
				const timeLeft = duration - currentTime
				if (timeLeft <= offsetRef.current && timeLeft > 0) {
					onEnded()
					art.off("video:timeupdate", onTimeUpdate)
				}
			}
		}

		art.on("video:timeupdate", onTimeUpdate)

		return () => {
			art.off("video:timeupdate", onTimeUpdate)
		}
	}, [film, episode, user, onEnded, sid, svt, syncExpAndProfile])

	return {}
}
