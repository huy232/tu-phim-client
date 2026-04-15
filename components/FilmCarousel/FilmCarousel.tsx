"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { FilmImage } from "../ui/film-image"
import { FilmHoverWrapper } from "../FilmHoverCard"
import { swiperInteraction } from "@/utilities"
import Link from "next/link"

interface FilmCarouselProps {
	items: FilmInfo[]
	nextClass: string
	prevClass: string
}

export default function FilmCarousel({
	items,
	nextClass,
	prevClass,
}: FilmCarouselProps) {
	return (
		<Swiper
			modules={[Navigation]}
			spaceBetween={12}
			slidesPerView={1.2}
			breakpoints={{
				640: { slidesPerView: 2.2 },
				768: { slidesPerView: 3 },
				1024: { slidesPerView: 4 },
				1280: { slidesPerView: 5 },
			}}
			navigation={{
				nextEl: `.${nextClass}`,
				prevEl: `.${prevClass}`,
			}}
			className="w-full"
			onTouchStart={() => (swiperInteraction.isInteracting = true)}
			onSliderMove={() => (swiperInteraction.isInteracting = true)}
			onTouchEnd={() => (swiperInteraction.isInteracting = false)}
			onTransitionEnd={() => (swiperInteraction.isInteracting = false)}
		>
			{items.map((film) => (
				<SwiperSlide key={film._id}>
					<FilmHoverWrapper film={film}>
						<Link
							href={`/thong-tin/${film.slug}`}
							className="flex flex-col gap-2 group cursor-pointer"
						>
							<div className="relative aspect-video w-full bg-white/5 rounded-xl overflow-hidden border border-white/10 group-hover:border-purple-500 transition-all">
								<FilmImage
									name={film.name}
									image_slug={film.poster_url || film.thumb_url}
									width={400}
									height={225}
									className="object-cover w-full h-full transition-transform duration-500"
									containerClassName="w-full h-full"
								/>
								<div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
							</div>

							<div className="flex flex-col px-1">
								<p
									className="text-[10px] md:text-sm font-medium line-clamp-1 group-hover:text-purple-400 transition-colors"
									title={film.name}
								>
									{film.name}
								</p>
								<p
									className="text-[8px] font-extralight md:text-xs text-white/50 line-clamp-1"
									title={film.origin_name}
								>
									{film.origin_name}
								</p>
							</div>
						</Link>
					</FilmHoverWrapper>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
