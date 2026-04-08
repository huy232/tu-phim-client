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
				prev !== null && prev < allMedia.length - 1 ? prev + 1 : 0,
			)
		},
		[allMedia.length],
	)

	const handlePrev = useCallback(
		(e?: React.MouseEvent) => {
			e?.stopPropagation()
			setSelectedIndex((prev) =>
				prev !== null && prev > 0 ? prev - 1 : allMedia.length - 1,
			)
		},
		[allMedia.length],
	)

	useEffect(() => {
		if (selectedIndex === null) return

		const scrollBarWidth =
			window.innerWidth - document.documentElement.clientWidth
		const body = document.body
		const html = document.documentElement

		body.classList.add("lock-scroll", "no-scrollbar")
		html.classList.add("no-scrollbar")
		body.style.paddingRight = `${scrollBarWidth}px`

		const preventDefault = (e: Event) => e.preventDefault()
		window.addEventListener("wheel", preventDefault, { passive: false })
		window.addEventListener("touchmove", preventDefault, { passive: false })

		return () => {
			body.classList.remove("lock-scroll", "no-scrollbar")
			html.classList.remove("no-scrollbar")
			body.style.paddingRight = ""

			window.removeEventListener("wheel", preventDefault)
			window.removeEventListener("touchmove", preventDefault)
		}
	}, [selectedIndex])

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (selectedIndex === null) return
			if (e.key === "Escape") setSelectedIndex(null)
			if (e.key === "ArrowRight") handleNext()
			if (e.key === "ArrowLeft") handlePrev()
		}
		window.addEventListener("keydown", handleKey)
		return () => window.removeEventListener("keydown", handleKey)
	}, [handleNext, handlePrev, selectedIndex])

	if (!allMedia.length) return null

	return (
		<div className="space-y-6 mt-10 overflow-visible">
			<div className="flex items-center justify-between px-1">
				<h2 className="text-xl font-black uppercase text-white italic flex items-center gap-3">
					<span className="bg-purple-600 w-1.5 h-6 shadow-[0_0_15px_#a855f7]" />
					Kho ảnh
				</h2>
				<span className="text-xs text-gray-400">{allMedia.length} ảnh</span>
			</div>

			<div className="flex items-center gap-3 relative group/container">
				<button className={clsx(prevClass, btnStyles, "z-30")}>
					<BackNavigateIcon size={20} />
				</button>

				<Swiper
					grid={{
						rows: 3,
						fill: "row",
					}}
					slidesPerView={3}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
						1280: { slidesPerView: 4 },
					}}
					spaceBetween={15}
					modules={[Grid, Navigation, FreeMode]}
					navigation={{ nextEl: `.${nextClass}`, prevEl: `.${prevClass}` }}
					className="w-full py-4 px-1 overflow-hidden"
				>
					{allMedia.map((img, idx) => (
						<SwiperSlide
							key={idx}
							style={{
								width: `calc(${180 * (img.aspect_ratio || 1.5)}px)`,
								height: "180px",
							}}
						>
							<motion.div
								transition={{ type: "spring", stiffness: 300, damping: 20 }}
								className="cursor-pointer relative aspect-video w-full group overflow-hidden hover:border-purple/70 hover:brightness-110 border-2 rounded border-white/10 hover:shadow-md duration-300 linear"
								onClick={() => setSelectedIndex(idx)}
							>
								<WebImage
									image_src={`${TMDB_IMAGE_URL}/w500${img.file_path}`}
									name={img.file_path}
									height={img.height}
									width={img.width}
									className="h-full object-cover group-hover:scale-125 duration-300 linear"
								/>
							</motion.div>
						</SwiperSlide>
					))}
				</Swiper>

				<button className={clsx(nextClass, btnStyles, "z-30")}>
					<NextNavigateIcon size={20} />
				</button>
			</div>

			<AnimatePresence>
				{selectedIndex !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center select-none"
						onClick={() => setSelectedIndex(null)}
						style={{ touchAction: "none" }}
					>
						<button
							onClick={handlePrev}
							className="cursor-pointer absolute left-4 md:left-10 p-4 z-50 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all group"
						>
							<BackNavigateIcon size={40} />
						</button>

						<motion.div
							key={selectedIndex}
							initial={{ x: 50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: -50, opacity: 0 }}
							className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
							onClick={(e) => e.stopPropagation()}
						>
							<SiteImage
								src={`${TMDB_IMAGE_URL}/original${allMedia[selectedIndex].file_path}`}
								alt={"Media"}
								width={allMedia[selectedIndex].width}
								height={allMedia[selectedIndex].height}
								className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
								containerClassName="w-full h-full"
							/>
						</motion.div>

						<button
							onClick={handleNext}
							className="cursor-pointer absolute right-4 md:right-10 p-4 z-50 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
						>
							<NextNavigateIcon size={40} />
						</button>

						<div className="absolute mt-20 top-0 w-full p-6 flex justify-between items-center bg-linear-to-b from-black/50 to-transparent">
							<div className="text-white/80 font-medium bg-black/20 px-4 py-2 rounded backdrop-blur-md border border-white/30">
								Ảnh {selectedIndex + 1}{" "}
								<span className="text-white/40 mx-1">/</span> {allMedia.length}
							</div>
							<button
								onClick={() => setSelectedIndex(null)}
								className="cursor-pointer py-1 px-2 rounded bg-white/10 hover:bg-red-500/50 text-white transition-all backdrop-blur-md border border-white/10"
							>
								✕ Đóng
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<style jsx global>{`
				.swiper-slide {
					height: auto !important;
				}
			`}</style>
		</div>
	)
}

export default MediaGallery
