"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SiteImage from "../ui/site-image"
import Link from "next/link"

const MobileSlide = React.memo(({ film }: { film: FilmInfo }) => {
	return (
		<div className="relative h-full rounded-xl overflow-hidden">
			<Link href={`/xem-phim/${film.slug}`} className="absolute inset-0 z-0" />

			{/* IMAGE */}
			<SiteImage
				src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${film.poster_url}`}
				alt={film.name}
				fill
				className="object-cover"
				sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
			/>

			{/* GRADIENT */}
			<div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

			{/* CONTENT */}
			<div className="absolute bottom-0 p-4 z-10 pointer-events-none">
				<h2 className="text-white text-lg font-bold line-clamp-2">
					{film.name}
				</h2>

				<p className="text-gray-300 text-sm line-clamp-1">{film.origin_name}</p>

				{/* BUTTONS */}
				<div className="flex gap-2 mt-2 pointer-events-auto">
					<Link
						href={`/xem-phim/${film.slug}`}
						className="px-3 py-1 bg-purple text-white text-xs rounded"
					>
						Xem phim
					</Link>

					<Link
						href={`/thong-tin/${film.slug}`}
						className="px-3 py-1 bg-white/10 text-white text-xs rounded"
					>
						Thông tin
					</Link>
				</div>
			</div>
		</div>
	)
})
MobileSlide.displayName = "MobileSlide"

const MobileBanner = ({ films }: { films: FilmInfo[] }) => {
	return (
		<div className="h-[320px] bg-[#0a0a0a]">
			<Swiper
				className="h-full"
				slidesPerView={1.1}
				spaceBetween={12}
				centeredSlides
				speed={400}
			>
				{films.map((film) => (
					<SwiperSlide key={film._id} className="h-full">
						<MobileSlide film={film} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
export default MobileBanner
