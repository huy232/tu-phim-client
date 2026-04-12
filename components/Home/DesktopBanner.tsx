"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules"
import { useState } from "react"
import type { Swiper as SwiperType } from "swiper"
import BannerSlide from "./BannerSlide"
import clsx from "clsx"
import { FilmImage } from "../ui/film-image"

const DesktopBanner = ({ films }: { films: FilmInfo[] }) => {
	const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null)
	const [activeIndex, setActiveIndex] = useState(0)

	return (
		<div className="relative h-[660px] w-full bg-black group">
			<Swiper
				className="h-full w-full"
				effect="fade"
				speed={800}
				modules={[EffectFade, Navigation, Pagination, Autoplay]}
				onSwiper={setSwiperRef}
				onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
			>
				{films.map((film) => (
					<SwiperSlide key={film._id}>
						{({ isActive }) => (
							<BannerSlide
								film={film}
								isDesktop
								youtubeId={
									film.trailer_url?.split("v=")[1]?.split("&")[0] || null
								}
								isActive={isActive}
							/>
						)}
					</SwiperSlide>
				))}
			</Swiper>

			{/* Thumbnails */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 px-4">
				<div className="flex gap-3 justify-center">
					{films.map((film) => {
						const realIndex = films.findIndex((f) => f._id === film._id)

						return (
							<div
								key={film._id}
								onClick={() => swiperRef?.slideTo(realIndex)}
								className={clsx(
									"relative w-8 md:w-12 lg:w-16 xl:w-20 aspect-[2/3]",
									"cursor-pointer rounded-lg overflow-hidden border transition-all duration-300",
									realIndex === activeIndex
										? "border-purple scale-110 z-10"
										: "border-transparent opacity-60",
								)}
							>
								<FilmImage
									image_slug={film.thumb_url}
									width={320}
									height={480}
									name={film.name}
									containerClassName="w-full h-full"
									className="object-cover w-full h-full"
								/>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default DesktopBanner
