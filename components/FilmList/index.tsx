"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { BackNavigateIcon, NextNavigateIcon } from "@/assets/icons"
import clsx from "clsx"
import FilmCard from "../ui/film-card"
import { swiperInteraction } from "@/utilities"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface FilmListProps {
	items: FilmInfo[]
	id: string
	dubbed?: boolean
	isSidebarLayout?: boolean
	viewMoreHref?: string
}

export default function FilmList({
	items,
	id,
	dubbed = false,
	isSidebarLayout = false,
	viewMoreHref,
}: FilmListProps) {
	const nextClass = `next-${id}`
	const prevClass = `prev-${id}`
	const btnStyles =
		"p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all disabled:opacity-20 cursor-pointer shrink-0 hidden md:flex"

	const normalBreakpoints = {
		640: { slidesPerView: 2 },
		768: { slidesPerView: 3 },
		1024: { slidesPerView: 4 },
		1280: { slidesPerView: 5 },
		1536: { slidesPerView: 7 },
	}

	const sidebarBreakpoints = {
		640: { slidesPerView: 2 },
		768: { slidesPerView: 3 },
		1024: { slidesPerView: 3 },
		1280: { slidesPerView: 4 },
		1536: { slidesPerView: 4 },
	}

	return (
		<div className="w-full flex flex-col gap-3 my-4">
			<div className="text-white flex items-center gap-4 w-full min-w-0">
				<button className={clsx(prevClass, btnStyles)}>
					<BackNavigateIcon size={20} />
				</button>

				<Swiper
					modules={[Navigation]}
					spaceBetween={16}
					slidesPerView={2}
					navigation={{
						nextEl: `.${nextClass}`,
						prevEl: `.${prevClass}`,
					}}
					breakpoints={isSidebarLayout ? sidebarBreakpoints : normalBreakpoints}
					className="overflow-hidden py-3 w-full"
					onTouchStart={() => (swiperInteraction.isInteracting = true)}
					onSliderMove={() => (swiperInteraction.isInteracting = true)}
					onTouchEnd={() => (swiperInteraction.isInteracting = false)}
					onTransitionEnd={() => (swiperInteraction.isInteracting = false)}
				>
					{items.map((film) => (
						<SwiperSlide key={film._id}>
							<FilmCard film={film} dubbed={dubbed} />
						</SwiperSlide>
					))}
				</Swiper>

				<button className={clsx(nextClass, btnStyles)}>
					<NextNavigateIcon size={20} />
				</button>
			</div>

			{viewMoreHref && (
				<div className="flex justify-end px-2 md:px-14">
					<Link
						href={viewMoreHref}
						className="group relative flex items-center gap-2 px-4 py-1.5 overflow-hidden rounded-full 
                 bg-white/5 border border-white/10 transition-all duration-300
                 hover:border-purple-500/50 hover:bg-purple-500/10"
					>
						<div
							className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                      transition-transform duration-700 bg-linear-to-r 
                      from-transparent via-white/10 to-transparent skew-x-12"
						/>

						<span
							className="text-xs md:text-sm font-semibold tracking-wide text-zinc-400 
                       group-hover:text-purple-300 transition-colors uppercase"
						>
							Khám phá tất cả
						</span>

						<div
							className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 
                      group-hover:bg-purple-600 group-hover:-rotate-45 transition-all duration-300"
						>
							<ChevronRight
								size={14}
								className="text-zinc-500 group-hover:text-white transition-colors"
							/>
						</div>

						<div
							className="absolute -inset-1 bg-purple-500/20 blur-xl opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500"
						/>
					</Link>
				</div>
			)}
		</div>
	)
}
