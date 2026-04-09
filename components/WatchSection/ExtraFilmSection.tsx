import { Dispatch, SetStateAction, useState } from "react"
import {
	Check,
	FastForward,
	Heart,
	Lightbulb,
	Maximize2,
	PlayCircle,
	Share2,
} from "lucide-react"
import { motion } from "framer-motion"
import clsx from "clsx"
import { FavoriteWrapper } from "../FavoriteWrapper"
import { toast } from "sonner"
import EpisodeNav from "./EpisodeNav"

import dynamic from "next/dynamic"

const CompactToggle = dynamic(() => import("./CompactToggle"), {
	ssr: false,
})

const containerVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
}

interface ExtraFilmSectionProps {
	handleTheaterMode: Dispatch<SetStateAction<boolean>>
	isTheaterMode: boolean
	prevEpisodeSlug: string | null
	nextEpisodeSlug: string | null
	currentServer?: Episodes
	isDimmed: boolean
	setIsDimmed: Dispatch<SetStateAction<boolean>>
	autoNext: boolean
	setAutoNext: Dispatch<SetStateAction<boolean>>
	autoNextOffset: number
	setAutoNextOffset: Dispatch<SetStateAction<number>>
	film: FilmInfo
	skipIntroOffset: number
	setSkipIntroOffset: Dispatch<SetStateAction<number>>
}

const ExtraFilmSection = ({
	handleTheaterMode,
	isTheaterMode,
	prevEpisodeSlug,
	nextEpisodeSlug,
	currentServer,
	isDimmed,
	setIsDimmed,
	autoNext,
	setAutoNext,
	autoNextOffset,
	setAutoNextOffset,
	film,
	skipIntroOffset,
	setSkipIntroOffset,
}: ExtraFilmSectionProps) => {
	const [isShared, setIsShared] = useState(false)

	const handleShare = async () => {
		const shareUrl = `${window.location.origin}/thong-tin/${film.slug}`

		try {
			await navigator.clipboard.writeText(shareUrl)
			setIsShared(true)
			toast.success("Đã sao chép liên kết phim!")

			setTimeout(() => setIsShared(false), 2000)
		} catch (err) {
			toast.error("Không thể sao chép liên kết")
		}
	}

	const createUrl = (slug: string) => {
		const params = new URLSearchParams()
		params.set("ep", slug)
		if (currentServer?.server_source)
			params.set("sid", currentServer.server_source)
		if (currentServer?.server_type) params.set("svt", currentServer.server_type)

		return `?${params.toString()}`
	}

	const handleManualSkip = () => {
		const event = new CustomEvent("TU_PHIM_QUICK_SEEK", {
			detail: { seconds: skipIntroOffset },
		})
		window.dispatchEvent(event)
	}

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 flex items-center justify-between gap-2 z-30 rounded-b-2xl"
		>
			<EpisodeNav
				prevSlug={prevEpisodeSlug}
				nextSlug={nextEpisodeSlug}
				createUrl={createUrl}
			/>

			<div className="flex items-center gap-2 px-3 border-x border-white/10">
				<CompactToggle
					active={true}
					onClick={handleManualSkip}
					icon={FastForward}
					label="Skip"
					activeClass="bg-blue-500/20 border-blue-500/50 text-blue-400"
					offset={skipIntroOffset}
					setOffset={setSkipIntroOffset}
					colorCode="text-blue-400"
				/>
				<CompactToggle
					active={autoNext}
					onClick={() => nextEpisodeSlug && setAutoNext(!autoNext)}
					icon={PlayCircle}
					label="Auto"
					activeClass="bg-purple-500/20 border-purple-500 text-purple-400"
					offset={autoNextOffset}
					setOffset={setAutoNextOffset}
					colorCode="text-purple-400"
				/>
			</div>

			<div className="flex items-center gap-1.5">
				<FavoriteWrapper film={film}>
					{({ isFavorited, handleToggle }) => (
						<button
							onClick={handleToggle}
							className={clsx(
								"p-2 rounded-lg transition-colors",
								isFavorited
									? "text-red-500 bg-red-500/10"
									: "text-gray-400 hover:text-white",
							)}
						>
							<Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
						</button>
					)}
				</FavoriteWrapper>

				<button
					onClick={handleShare}
					className={clsx(
						"p-2 rounded-lg transition-all duration-300",
						isShared
							? "text-green-400 bg-green-500/10"
							: "text-gray-400 hover:text-white",
					)}
				>
					{isShared ? <Check size={16} /> : <Share2 size={16} />}
				</button>

				<div className="h-4 w-px bg-white/10 mx-1" />

				<button
					onClick={() => setIsDimmed((prev) => !prev)}
					className={clsx(
						"p-2 rounded-lg",
						isDimmed ? "text-yellow-400 bg-yellow-400/10" : "text-gray-400",
					)}
				>
					<Lightbulb size={16} />
				</button>

				<button
					onClick={() => handleTheaterMode(!isTheaterMode)}
					className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all"
				>
					<Maximize2 size={14} />
					<span className="text-[10px] font-bold uppercase hidden sm:block">
						{isTheaterMode ? "Mặc định" : "Mở rộng"}
					</span>
				</button>
			</div>
		</motion.div>
	)
}

export default ExtraFilmSection
