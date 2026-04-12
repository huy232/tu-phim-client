"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, FreeMode, Grid } from "swiper/modules"
import clsx from "clsx"
import { BackNavigateIcon, NextNavigateIcon } from "@/assets/icons"
import { WebImage } from "../ui/web-image"
import { TMDB_IMAGE_URL } from "@/constants"
import SiteImage from "../ui/site-image"

interface MediaImage {
	file_path: string
	aspect_ratio: number
	height: number
	width: number
}

const MediaGallery = ({
	backdrops = [],
	posters = [],
}: {
	backdrops: MediaImage[]
	posters: MediaImage[]
}) => {
	const allMedia = [...backdrops, ...posters].filter((img) => img.file_path)

	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	const nextClass = "next-gallery-btn"
	const prevClass = "prev-gallery-btn"

	const btnStyles =
		"p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all disabled:opacity-20 cursor-pointer shrink-0 hidden md:flex"

	const handleNext = useCallback(
		(e?: React.MouseEvent) => {
			e?.stopPropagation()
			setSelectedIndex((prev) =>
				prev !== null ? (prev + 1) % allMedia.length : 0,
			)
		},
		[allMedia.length],
	)

	const handlePrev = useCallback(
		(e?: React.MouseEvent) => {
			e?.stopPropagation()
			setSelectedIndex((prev) =>
				prev !== null ? (prev - 1 + allMedia.length) % allMedia.length : 0,
			)
		},
		[allMedia.length],
	)

	const close = useCallback(() => setSelectedIndex(null), [])

	/* lock scroll */
	useEffect(() => {
		if (selectedIndex === null) return

		document.body.style.overflow = "hidden"

		return () => {
			document.body.style.overflow = ""
		}
	}, [selectedIndex])

	/* keyboard */
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (selectedIndex === null) return
			if (e.key === "Escape") close()
			if (e.key === "ArrowRight") handleNext()
			if (e.key === "ArrowLeft") handlePrev()
		}

		window.addEventListener("keydown", handleKey)
		return () => window.removeEventListener("keydown", handleKey)
	}, [selectedIndex, handleNext, handlePrev, close])

	if (!allMedia.length) return null

	return (
		<div className="space-y-6 mt-10">
			{/* HEADER */}
			<div className="flex items-center justify-between px-1">
				<h2 className="text-xl font-black uppercase text-white italic flex items-center gap-3">
					<span className="bg-purple-600 w-1.5 h-6 shadow-[0_0_15px_#a855f7]" />
					Kho ảnh
				</h2>
				<span className="text-xs text-gray-400">{allMedia.length} ảnh</span>
			</div>

			{/* GRID */}
			<div className="flex items-center gap-3 relative">
				<button className={clsx(prevClass, btnStyles)}>
					<BackNavigateIcon size={20} />
				</button>

				<Swiper
					grid={{ rows: 3, fill: "row" }}
					slidesPerView={3}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
						1280: { slidesPerView: 4 },
					}}
					spaceBetween={15}
					modules={[Grid, Navigation, FreeMode]}
					navigation={{ nextEl: `.${nextClass}`, prevEl: `.${prevClass}` }}
					className="w-full py-4 px-1"
				>
					{allMedia.map((img, idx) => (
						<SwiperSlide key={idx}>
							<motion.div
								className="cursor-pointer aspect-video rounded border border-white/10 overflow-hidden hover:border-purple-500/60 transition"
								onClick={() => setSelectedIndex(idx)}
							>
								<WebImage
									image_src={`${TMDB_IMAGE_URL}/w500${img.file_path}`}
									name={img.file_path}
									height={img.height}
									width={img.width}
									className="h-full w-full object-cover hover:scale-110 transition"
								/>
							</motion.div>
						</SwiperSlide>
					))}
				</Swiper>

				<button className={clsx(nextClass, btnStyles)}>
					<NextNavigateIcon size={20} />
				</button>
			</div>

			{/* MODAL */}
			<AnimatePresence>
				{selectedIndex !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center"
						onClick={close}
					>
						{/* LEFT */}
						<button
							onClick={handlePrev}
							className="absolute left-4 md:left-10 p-3 text-white/60 hover:text-white"
						>
							<BackNavigateIcon size={36} />
						</button>

						{/* IMAGE */}
						<motion.div
							key={selectedIndex}
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							className="relative max-w-[92vw] max-h-[85vh]"
							onClick={(e) => e.stopPropagation()}
						>
							<SiteImage
								src={`${TMDB_IMAGE_URL}/original${allMedia[selectedIndex].file_path}`}
								alt="media"
								width={allMedia[selectedIndex].width}
								height={allMedia[selectedIndex].height}
								className="max-h-[85vh] object-contain rounded-xl"
							/>

							{/* COUNTER */}
							<div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full bg-black/40 border border-white/10 text-white/80 backdrop-blur">
								{selectedIndex + 1} / {allMedia.length}
							</div>

							{/* CLOSE */}
							<button
								onClick={close}
								className="absolute top-3 right-3 text-white/60 hover:text-white text-lg"
							>
								✕
							</button>
						</motion.div>

						{/* RIGHT */}
						<button
							onClick={handleNext}
							className="absolute right-4 md:right-10 p-3 text-white/60 hover:text-white"
						>
							<NextNavigateIcon size={36} />
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default MediaGallery
