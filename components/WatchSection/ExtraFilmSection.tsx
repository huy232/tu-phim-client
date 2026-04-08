import { Dispatch, SetStateAction, useState } from "react"
import { ActionButton } from "./ActionButton"
import {
	Check,
	ChevronLeft,
	ChevronRight,
	Heart,
	Lightbulb,
	Maximize2,
	PlayCircle,
	Share2,
	Timer,
} from "lucide-react"
import { motion } from "framer-motion"
import clsx from "clsx"
import Link from "next/link"
import { FavoriteWrapper } from "../FavoriteWrapper"
import { toast } from "sonner"

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

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className={clsx(
				"w-full px-4 py-3 bg-[#0a0a0a] border-t border-white/10 border flex items-center justify-between gap-4 z-30 rounded-b-2xl",
			)}
		>
			{/* Nhóm điều hướng tập */}
			<div className="flex items-center gap-3">
				{/* Nút Tập trước */}
				{prevEpisodeSlug ? (
					<Link href={createUrl(prevEpisodeSlug)} scroll={false}>
						<ActionButton
							icon={ChevronLeft}
							label="Tập trước"
							className="text-[10px]"
						/>
					</Link>
				) : (
					<div className="opacity-40 cursor-not-allowed pointer-events-none">
						<ActionButton
							icon={ChevronLeft}
							label="Tập trước"
							className="text-[10px]"
						/>
					</div>
				)}

				{/* Nút Tập tiếp */}
				{nextEpisodeSlug ? (
					<Link href={createUrl(nextEpisodeSlug)} scroll={false}>
						<ActionButton
							icon={ChevronRight}
							label="Tập tiếp"
							className="text-[10px]"
						/>
					</Link>
				) : (
					<div className="opacity-40 cursor-not-allowed pointer-events-none">
						<ActionButton
							icon={ChevronRight}
							label="Tập tiếp"
							className="text-[10px]"
						/>
					</div>
				)}
			</div>

			<div className="flex items-center gap-2 ml-2 pl-4 border-l border-white/10">
				<div
					onClick={() => nextEpisodeSlug && setAutoNext(!autoNext)}
					className={clsx(
						"flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all border",
						!nextEpisodeSlug ? "opacity-30 cursor-not-allowed" : "",
						autoNext
							? "bg-purple-500/20 border-purple-500 text-purple-400"
							: "bg-white/5 border-white/10 text-gray-500 hover:text-white",
					)}
				>
					<PlayCircle
						size={14}
						className={clsx(autoNext && "animate-spin-slow")}
					/>
					<span className="text-[10px] font-bold uppercase tracking-wider">
						Tự chuyển tập
					</span>
				</div>

				{/* Input chỉnh giây - Chỉ hiện khi bật Auto Next */}
				{autoNext && (
					<div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
						<Timer size={12} className="text-gray-500" />
						<input
							type="number"
							value={autoNextOffset}
							onChange={(e) => setAutoNextOffset(Number(e.target.value))}
							className="bg-transparent w-8 text-[10px] text-center outline-none text-purple-400 font-bold"
						/>
						<span className="text-[10px] text-gray-600 font-bold">S</span>
					</div>
				)}
			</div>

			{/* Nhóm tương tác chính */}
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2 pr-2 border-r border-white/10">
					<FavoriteWrapper film={film}>
						{({ isFavorited, handleToggle, loading }) => (
							<ActionButton
								icon={Heart}
								label={isFavorited ? "Đã thích" : "Yêu thích"}
								onClick={handleToggle}
								loading={loading}
								variant={isFavorited ? "secondary" : "ghost"}
								className="text-[10px]"
							/>
						)}
					</FavoriteWrapper>
					<ActionButton
						icon={isShared ? Check : Share2}
						label={isShared ? "Đã chép" : "Chia sẻ"}
						variant="ghost"
						className={clsx(
							"text-[10px] transition-colors duration-300",
							isShared && "text-green-400 border-green-500/30 bg-green-500/10",
						)}
						onClick={handleShare}
					/>
				</div>

				<div className="flex items-center gap-2 pl-2">
					<ActionButton
						icon={Lightbulb}
						label={isDimmed ? "Bật đèn" : "Tắt đèn"}
						onClick={() => setIsDimmed(!isDimmed)}
						className={clsx(
							isDimmed ? "text-yellow-400" : "text-white",
							"text-[10px]",
						)}
					/>
					<ActionButton
						icon={Maximize2}
						label={isTheaterMode ? "Mặc định" : "Mở rộng"}
						variant="primary"
						onClick={() => handleTheaterMode(!isTheaterMode)}
						className="text-[10px]"
					/>
				</div>
			</div>
		</motion.div>
	)
}

export default ExtraFilmSection
