export const revalidate = 3600

import ShowcaseWrapper from "@/components/CommentShowcase/CommentShowcaseWrapper"
import Banner from "@/components/Home/Banner"
import { AnimeWrapper } from "@/components/HomePage/AnimeWrapper"
import { CinemaWrapper } from "@/components/HomePage/CinemaWrapper"
import { CountryHighlightWrapper } from "@/components/HomePage/CountryHighlightWrapper"
import { DubbedWrapper } from "@/components/HomePage/DubbedWrapper"
import { NewestSeriesWrapper } from "@/components/HomePage/NewestSeriesWrapper"
import SectionSkeleton from "@/components/HomePage/SectionSkeleton"
import { FilmCarouselSkeleton } from "@/components/HomePage/SectionSkeleton/FilmCarouselSkeleton"
import {
	NewestSingleWrapper,
	TopSingleWrapper,
} from "@/components/HomePage/SingleFilm"
import { TopSeriesWrapper } from "@/components/HomePage/TopListWrapper"
import { TVShowFullWrapper } from "@/components/HomePage/TVShowsWrapper"
import { Spacer } from "@/components/Spacer"
import { fetchHomeDataFromBackend } from "@/services"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
	title: {
		default: "Tu Phim - Xem Phim Online Chất Lượng Cao",
		template: "%s | Tu Phim",
	},
	description:
		"Tu Phim - Nền tảng xem phim trực tuyến cập nhật nhanh nhất các bộ phim bom tấn, hành động, và anime vietsub chất lượng Full HD.",
	keywords: [
		"xem phim online",
		"tu phim",
		"phim moi",
		"phim hay 2024",
		"phim hay 2025",
		"phim hay 2026",
	],
	metadataBase: new URL("https://tuphim.site"),

	openGraph: {
		title: "Tu Phim - Thế Giới Điện Ảnh Trong Tầm Tay",
		description:
			"Trải nghiệm xem phim mượt mà, không quảng cáo gây khó chịu tại Tu Phim.",
		url: "https://tuphim.site",
		siteName: "Tu Phim",
		locale: "vi_VN",
		type: "website",
	},

	twitter: {
		card: "summary_large_image",
		title: "Tu Phim - Xem Phim Online Miễn Phí",
		description: "Cùng Tu Phim khám phá những bộ phim hot nhất hiện nay.",
	},

	robots: {
		index: true,
		follow: true,
	},
}

export default async function Home() {
	const homeResponse = await fetchHomeDataFromBackend()
	const items = homeResponse?.data || []

	return (
		<main className="min-h-svh w-full pt-16">
			<Banner films={items} />

			<div className="max-w-420 mx-auto px-4 md:px-10 space-y-8">
				<Suspense fallback={<FilmCarouselSkeleton />}>
					<CountryHighlightWrapper />
				</Suspense>

				<ShowcaseWrapper />

				<Suspense fallback={<SectionSkeleton />}>
					<NewestSeriesWrapper />
				</Suspense>

				<Spacer y={10} />

				<Suspense fallback={<SectionSkeleton />}>
					<TopSeriesWrapper />
				</Suspense>

				<Spacer y={10} />

				<Suspense fallback={<SectionSkeleton />}>
					<NewestSingleWrapper />
				</Suspense>

				<Spacer y={10} />

				<Suspense fallback={<SectionSkeleton />}>
					<TopSingleWrapper />
				</Suspense>

				<Spacer y={10} />

				<Suspense fallback={<SectionSkeleton />}>
					<TVShowFullWrapper />
				</Suspense>

				<Spacer y={10} />

				<Suspense fallback={<SectionSkeleton />}>
					<AnimeWrapper />
				</Suspense>

				<Spacer y={10} />

				<Suspense fallback={<SectionSkeleton />}>
					<DubbedWrapper />
				</Suspense>

				<Spacer y={10} />

				<Suspense fallback={<SectionSkeleton />}>
					<CinemaWrapper />
				</Suspense>
			</div>
		</main>
	)
}
