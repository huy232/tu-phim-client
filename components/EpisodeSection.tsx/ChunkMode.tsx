"use client"
import { motion } from "framer-motion"
import { LayoutGrid, ChevronRight, ChevronLeft } from "lucide-react"
import clsx from "clsx"
import { Swiper, SwiperSlide } from "swiper/react"
import EpisodeButton from "./EpisodeButton"
import { FreeMode, Navigation } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { Dispatch, SetStateAction } from "react"

interface ChunkModeProps {
	setSwiper: Dispatch<SetStateAction<SwiperType | null>>
	chunks: Episode[][]
	setActiveChunk: Dispatch<SetStateAction<number>>
	swiper: SwiperType | null
	activeChunk: number
	chunkSize: number
	data: Episode[]
	activeServer: Episodes
	filmSlug: string
	isWatchPage: boolean
	activeEpisodeSlug: string
	activeEpisodeIndex: number
	playingServer: Episodes
	watchedSlugs: string[]
}

const ChunkMode = ({
	setSwiper,
	chunks,
	setActiveChunk,
	swiper,
	activeChunk,
	chunkSize,
	data,
	activeServer,
	filmSlug,
	isWatchPage,
	activeEpisodeSlug,
	activeEpisodeIndex,
	playingServer,
	watchedSlugs = [],
}: ChunkModeProps) => {
	const serverKey =
		`${activeServer.server_source}-${activeServer.server_type}-${activeServer.server_name}`.toString()

	return (
		<div className="space-y-2">
			<div className="flex items-center gap-3 group/nav relative">
				<button className="swiper-button-prev-custom shrink-0 p-2.5 bg-purple/10 border border-purple/20 rounded-xl text-purple hover:bg-purple hover:text-white transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] disabled:opacity-10 disabled:cursor-not-allowed">
					<ChevronLeft size={20} />
				</button>

				<div className="flex-1 min-w-0">
					<Swiper
						modules={[Navigation, FreeMode]}
						slidesPerView="auto"
						spaceBetween={12}
						freeMode={true}
						navigation={{
							nextEl: ".swiper-button-next-custom",
							prevEl: ".swiper-button-prev-custom",
						}}
						onSwiper={setSwiper}
						slidesOffsetAfter={16}
						slidesOffsetBefore={16}
						watchOverflow={true}
						centerInsufficientSlides={false}
						normalizeSlideIndex={true}
					>
						{chunks.map((_, idx) => (
							<SwiperSlide
								key={`chunk-tab-${idx}`}
								style={{ width: "auto" }}
								className="select-none"
							>
								<div className="py-4">
									<button
										onClick={() => {
											setActiveChunk(idx)
											if (chunks.length > 7) {
												swiper?.slideTo(idx, 300)
											}
										}}
										className={clsx(
											"px-5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 whitespace-nowrap cursor-pointer block",
											activeChunk === idx
												? "bg-purple border-purple text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105 z-10"
												: "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-purple/40 hover:scale-110",
										)}
									>
										{idx * chunkSize + 1} -{" "}
										{Math.min((idx + 1) * chunkSize, data.length)}
									</button>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<button className="swiper-button-next-custom shrink-0 p-2.5 bg-purple/10 border border-purple/20 rounded-xl text-purple hover:bg-purple hover:text-white transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] disabled:opacity-10 disabled:cursor-not-allowed">
					<ChevronRight size={20} />
				</button>
			</div>

			<div className="flex items-center gap-3 mt-4">
				<div className="relative group">
					<div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple z-10 pointer-events-none">
						<LayoutGrid size={14} />
					</div>

					<select
						value={activeChunk}
						onChange={(e) => {
							const val = Number(e.target.value)
							setActiveChunk(val)
							swiper?.slideTo(val, 500)
						}}
						className={clsx(
							"appearance-none pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 outline-none cursor-pointer transition-all",
							"hover:bg-white/10 hover:border-purple/30",
							"focus:ring-2 focus:ring-purple/20 focus:border-purple/50",
						)}
					>
						{chunks.map((chunk, idx) => (
							<option
								key={`opt-${idx}`}
								value={idx}
								className="bg-[#1a1a1a] text-gray-300"
							>
								Tập {chunk[0].name} - {chunk[chunk.length - 1].name}
							</option>
						))}
					</select>

					<div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-purple transition-colors">
						<ChevronRight size={14} className="rotate-90" />
					</div>
				</div>

				<span className="text-[10px] text-gray-600 uppercase font-black tracking-widest leading-none">
					Tổng: {data.length} tập
				</span>
			</div>

			<motion.div
				key={`chunk-grid-${serverKey}-${activeChunk}`}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 px-1 mt-6"
			>
				{chunks[activeChunk]?.map((ep, idx) => (
					<EpisodeButton
						key={`ep-${serverKey}-${activeChunk}-${ep.slug}-${idx}`}
						ep={ep}
						filmSlug={filmSlug}
						serverSupply={activeServer}
						isWatchPage={isWatchPage}
						activeEpisodeSlug={activeEpisodeSlug}
						index={idx}
						activeEpisodeIndex={activeEpisodeIndex}
						playingServer={playingServer}
						isWatched={watchedSlugs.includes(ep.slug)}
					/>
				))}
			</motion.div>
		</div>
	)
}

export default ChunkMode
