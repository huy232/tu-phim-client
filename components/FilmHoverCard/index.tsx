"use client"
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FilmImage } from "../ui/film-image"
import React from "react"
import { filmTypeMap } from "@/constants/film"
import clsx from "clsx"
import {
	AddFavorite,
	FilmInfoIcon,
	PlayButton2,
	ShareFilm,
} from "@/assets/icons"
import Link from "next/link"
import { swiperInteraction } from "@/utilities"
import { FavoriteWrapper } from "../FavoriteWrapper"
import { Heart } from "lucide-react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export const FilmHoverWrapper = ({
	film,
	children,
}: {
	film: FilmInfo
	children: React.ReactNode
}) => {
	const canHover = useMediaQuery("(hover: hover) and (pointer: fine)")
	const [isOpen, setIsOpen] = useState(false)
	const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })

	const triggerRef = useRef<HTMLDivElement>(null)

	const enterTimeout = useRef<NodeJS.Timeout | null>(null)
	const leaveTimeout = useRef<NodeJS.Timeout | null>(null)

	const isDragging = useRef(false)
	const startPos = useRef<{ x: number; y: number } | null>(null)
	const isMouseDown = useRef(false)
	const cardRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!canHover) return
		const handleMouseDown = (e: MouseEvent) => {
			isMouseDown.current = true

			const target = e.target as Node

			if (
				triggerRef.current?.contains(target) ||
				cardRef.current?.contains(target)
			) {
				return
			}

			setIsOpen(false)

			startPos.current = { x: e.clientX, y: e.clientY }
			isDragging.current = false
		}

		const handleMouseMove = (e: MouseEvent) => {
			if (!startPos.current) return

			const dx = Math.abs(e.clientX - startPos.current.x)
			const dy = Math.abs(e.clientY - startPos.current.y)

			if (dx > 8 || dy > 8) {
				isDragging.current = true
			}
		}

		const handleMouseUp = () => {
			startPos.current = null

			setTimeout(() => {
				isMouseDown.current = false
				isDragging.current = false
			}, 50)
		}

		window.addEventListener("mousedown", handleMouseDown)
		window.addEventListener("mousemove", handleMouseMove)
		window.addEventListener("mouseup", handleMouseUp)

		return () => {
			window.removeEventListener("mousedown", handleMouseDown)
			window.removeEventListener("mousemove", handleMouseMove)
			window.removeEventListener("mouseup", handleMouseUp)
		}
	}, [canHover])

	const updateCoords = () => {
		if (!canHover) return
		if (!triggerRef.current) return

		const rect = triggerRef.current.getBoundingClientRect()

		const baseWidth = 320
		const scale = 1.25
		const actualWidth = baseWidth * scale

		const padding = 20
		const screenWidth = window.innerWidth

		let left = rect.left + rect.width / 2 - baseWidth / 2
		const offset = (actualWidth - baseWidth) / 2

		if (left < offset + padding) left = offset + padding
		if (left + baseWidth + offset > screenWidth - padding) {
			left = screenWidth - padding - baseWidth - offset
		}

		setCoords({
			top: rect.top + window.scrollY,
			left: left + window.scrollX,
			width: baseWidth,
		})
	}

	const open = () => {
		if (!canHover) return
		if (leaveTimeout.current) clearTimeout(leaveTimeout.current)

		enterTimeout.current = setTimeout(() => {
			if (swiperInteraction.isInteracting) return

			updateCoords()
			setIsOpen(true)
		}, 700)
	}

	const close = () => {
		if (!canHover) return
		if (enterTimeout.current) clearTimeout(enterTimeout.current)

		leaveTimeout.current = setTimeout(() => {
			setIsOpen(false)
		}, 150)
	}

	return (
		<div
			ref={triggerRef}
			onMouseEnter={() => {
				if (swiperInteraction.isInteracting) return
				open()
			}}
			onMouseLeave={close}
			className="w-full h-full"
		>
			{children}

			<AnimatePresence>
				{isOpen && (
					<PortalCard
						film={film}
						coords={coords}
						onEnter={open}
						onLeave={close}
						cardRef={cardRef}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}

const PortalCard = ({
	film,
	coords,
	onEnter,
	onLeave,
	cardRef,
}: {
	film: FilmInfo
	coords: { top: number; left: number; width: number }
	onEnter: () => void
	onLeave: () => void
	cardRef: React.RefObject<HTMLDivElement | null>
}) => {
	if (typeof window === "undefined") return null

	return createPortal(
		<div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1.25, y: -40 }}
				exit={{ opacity: 0, scale: 0.8 }}
				style={{
					position: "absolute",
					top: coords.top,
					left: coords.left,
					width: coords.width,
					transformOrigin: "center center",
					willChange: "transform, opacity",
				}}
				onMouseEnter={onEnter}
				onMouseLeave={onLeave}
				ref={cardRef}
				className="pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-[#141414] rounded-lg overflow-hidden border border-white/10"
			>
				<div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
					<FilmImage
						image_slug={film.poster_url || film.thumb_url}
						name={film.name}
						className="object-cover w-full h-full"
						containerClassName="h-full w-full"
					/>
					<div className="absolute top-2 left-2 z-20 flex items-center gap-1.5">
						{(film.tmdb?.vote_average > 0 || film.imdb?.vote_average > 0) && (
							<div className="flex items-center bg-black/60 backdrop-blur-md rounded-full p-0.5 border border-white/10 shadow-2xl">
								{/* Badge TMDB */}
								{film.tmdb?.vote_average > 0 && (
									<div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full hover:bg-white/10 transition-colors">
										<span className="text-[8px] font-black text-yellow-500 tracking-tighter">
											TMDB
										</span>
										<span className="text-[10px] font-bold text-white leading-none">
											{film.tmdb.vote_average.toFixed(1)}
										</span>
									</div>
								)}

								{film.tmdb?.vote_average > 0 && film.imdb?.vote_average > 0 && (
									<div className="w-px h-2.5 bg-white/20 mx-0.5" />
								)}

								{film.imdb?.vote_average > 0 && (
									<div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full hover:bg-white/10 transition-colors">
										<span className="text-[8px] font-black text-blue-400 tracking-tighter">
											IMDB
										</span>
										<span className="text-[10px] font-bold text-white leading-none">
											{film.imdb.vote_average.toFixed(1)}
										</span>
									</div>
								)}
							</div>
						)}
					</div>

					<div className="absolute bottom-1.5 right-1.5 flex items-center overflow-hidden rounded-md border border-white/10 bg-black/60 backdrop-blur-md shadow-lg z-10">
						{film.quality && (
							<span className="px-2 py-0.5 bg-purple text-white text-[9px] font-bold uppercase tracking-wider">
								{film.quality}
							</span>
						)}

						{film.quality && film.episode_current && (
							<div className="w-px h-3 bg-white/20" />
						)}

						{film.episode_current && (
							<span className="px-2 py-0.5 text-white text-[9px] font-medium whitespace-nowrap">
								{film.episode_current}
							</span>
						)}
					</div>
				</div>
				<div className="p-2 bg-[#141414] space-y-1">
					<h3
						className="text-[16px] font-bold text-white line-clamp-1"
						title={film.name}
					>
						{film.name}
					</h3>
					<h4
						className="text-[12px] font-medium line-clamp-1 text-purple"
						title={film.origin_name}
					>
						{film.origin_name}
					</h4>

					<div className="flex gap-1 text-[10px] text-gray-400">
						<span>{film.year || "Năm ????"}</span>
						<span>•</span>
						<div className="flex gap-1 flex-wrap">
							{film.country.map((nation, index) => (
								<React.Fragment key={`${nation.id}-${index}`}>
									<span>{nation.name}</span>
									{index < film.country.length - 1 && <span>-</span>}
								</React.Fragment>
							))}
						</div>
					</div>

					<div className="flex items-center gap-2 flex-wrap">
						<span
							className={clsx(
								"text-[9px] px-1.5 py-0.5 rounded border font-bold uppercase tracking-wider",
								filmTypeMap[film.type]?.color ||
									"bg-white/10 text-white border-white/20",
							)}
						>
							{filmTypeMap[film.type]?.label || "Phim"}
						</span>

						<span
							className={clsx(
								"text-[9px] px-1.5 py-0.5 rounded border font-bold uppercase tracking-wider",
								"bg-white/10 text-white border-white/20",
							)}
						>
							{film.year}
						</span>

						<div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium ml-1">
							<span className="text-white/80">{film.lang}</span>
							<span className="w-1 h-1 rounded-full bg-gray-600" />
							<span>{film.time}</span>
						</div>
					</div>

					<div className="flex items-center gap-2 mt-3">
						<Link
							href={`/xem-phim/${film.slug}`}
							className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-purple text-white hover:shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-all duration-300 cursor-pointer active:scale-95 shrink-0"
						>
							<span className="text-[9px] font-bold whitespace-nowrap tracking-tighter">
								XEM NGAY
							</span>
							<PlayButton2 className="h-3.5 w-3.5 fill-white" />
						</Link>

						<Link
							className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/10 border border-white/10 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:shadow-[0_0_12px_rgba(250,204,21,0.4)] transition-all duration-300 cursor-pointer shrink-0"
							href={`/thong-tin/${film.slug}`}
						>
							<span className="text-[9px] font-bold whitespace-nowrap tracking-tighter">
								CHI TIẾT
							</span>
							<FilmInfoIcon className="h-3.5 w-3.5" />
						</Link>

						<div className="flex-1" />

						<div className="flex gap-2">
							<FavoriteWrapper film={film}>
								{({ isFavorited, handleToggle, loading }) => (
									<button
										title={
											isFavorited ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"
										}
										onClick={handleToggle}
										disabled={loading}
										className={clsx(
											"p-2 rounded-full border transition-all cursor-pointer active:scale-90",
											isFavorited
												? "bg-purple-500/20 border-purple-500 text-purple-400"
												: "bg-white/5 border-white/10 text-white hover:bg-white/20 hover:border-white/30",
											loading && "opacity-50",
										)}
									>
										{isFavorited ? (
											<Heart className="h-3.5 w-3.5 fill-current text-purple-500" />
										) : (
											<AddFavorite className={clsx("h-3.5 w-3.5")} />
										)}
									</button>
								)}
							</FavoriteWrapper>
							<button
								title="Chia sẻ"
								className="p-2 rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/20 hover:border-white/30 cursor-pointer active:scale-90"
							>
								<ShareFilm className="h-3.5 w-3.5" />
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</div>,
		document.body,
	)
}
