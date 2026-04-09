"use client"
import { useEffect, useState } from "react"
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import BannerSlide from "./BannerSlide"
import clsx from "clsx"
import { FilmImage } from "../ui/film-image"
import { swiperInteraction } from "@/utilities"

const Banner = ({ films }: { films: FilmInfo[] }) => {
	const [isDesktop, setIsDesktop] = useState(false)
	const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null)
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const checkScreen = () => setIsDesktop(window.innerWidth >= 1024)
		checkScreen()
		window.addEventListener("resize", checkScreen)
		return () => window.removeEventListener("resize", checkScreen)
	}, [])

	return (
		<div className="relative h-[450px] md:h-[660px] w-full bg-black group">
			<Swiper
				className="h-full w-full"
				effect={"fade"}
				speed={1000}
				navigation={false}
				modules={[EffectFade, Navigation, Pagination, Autoplay]}
				onSwiper={setSwiperRef}
				onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
				onTouchStart={() => (swiperInteraction.isInteracting = true)}
				onSliderMove={() => (swiperInteraction.isInteracting = true)}
				onTouchEnd={() => (swiperInteraction.isInteracting = false)}
				onTransitionEnd={() => (swiperInteraction.isInteracting = false)}
				preventClicks={false}
				preventClicksPropagation={false}
			>
				{films.map((film) => (
					<SwiperSlide key={film._id}>
						{({ isActive }) => (
							<BannerSlide
								key={`${film._id}-${isActive}`}
								film={film}
								isDesktop={isDesktop}
								youtubeId={
									film.trailer_url?.split("v=")[1]?.split("&")[0] || null
								}
								isActive={isActive}
							/>
						)}
					</SwiperSlide>
				))}
			</Swiper>
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 hidden md:flex gap-3 px-4">
				{films.map((film, index) => (
					<div
						key={`thumb-${film._id}`}
						onClick={() => swiperRef?.slideTo(index)}
						className={clsx(
							"relative  md:w-8 lg:w-16 xl:w-28 aspect-2/3 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:border-purple/40",
							activeIndex === index
								? "border-purple scale-110 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
								: "border-transparent",
						)}
					>
						<FilmImage
							image_slug={film.thumb_url}
							width={320}
							height={480}
							name={film.name}
							containerClassName="w-full h-full rounded-lg"
							className="w-full h-full object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Banner
