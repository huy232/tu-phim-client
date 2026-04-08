export const revalidate = 3600

import ShowcaseWrapper from "@/components/CommentShowcase/CommentShowcaseWrapper"
import CountryHighlight from "@/components/CountryHighlight"
import FilmSection from "@/components/FilmCarousel/FilmSection"
import FilmListWrapper from "@/components/FilmList/FilmListDynamic"
import {
	AddictionSeriesHeading,
	AnimatedSectionHeader,
	CinemaMainHeading,
	DubbedHeading,
	MainAnimateHeadingSection,
	NewestSeriesHeading,
	NewestSingleHeading,
	NewestTVShowsHeading,
	TopDubbedHeading,
	TopNewestHeading,
	TopPeakSingleHeading,
} from "@/components/Heading"
import Banner from "@/components/Home/Banner"
import SideAndHighlight from "@/components/SideAndHighlight"
import { Spacer } from "@/components/Spacer"
import TopFilm from "@/components/TopFilm"
import { chinaVideos, japanVideos } from "@/constants"
import {
	getFilmByCountry,
	getFilmByList,
	getHomeData,
	getTopAnime,
} from "@/services"
import { Metadata } from "next"

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
	metadataBase: new URL("https://tuphim.online"),

	openGraph: {
		title: "Tu Phim - Thế Giới Điện Ảnh Trong Tầm Tay",
		description:
			"Trải nghiệm xem phim mượt mà, không quảng cáo gây khó chịu tại Tu Phim.",
		url: "https://tuphim.online",
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
	const [
		homeResponse,
		koreaFilmResponse,
		chineseFilmResponse,
		usFilmResponse,
		getSeriesByListResponse,
		getNewestSeriesByListResponse,
		getSingleByListResponse,
		getNewestSingleByListResponse,
		getTopTVShowsByListResponse,
		getNewestTVShowsByListResponse,
		getTopAnimateByListResponse,
		getNewestAnimeResponse,
		getNewestChineseAnimateResponse,
		getTopDubbedResponse,
		getNewestDubbedResponse,
		getNewestMovieResponse,
		getNewestTrailerResponse,
	] = await Promise.all([
		getHomeData(),
		getFilmByCountry("han-quoc", { limit: 40, loc_trailer: 1 }),
		getFilmByCountry("trung-quoc", { limit: 40, loc_trailer: 1 }),
		getFilmByCountry("au-my", { limit: 40, page: 1, loc_trailer: 1 }),
		getFilmByList("phim-bo", { limit: 10, page: 1, sort_field: "view" }),
		getFilmByList("phim-bo", { limit: 48 }),
		getFilmByList("phim-le", { limit: 10, sort_field: "view" }),
		getFilmByList("phim-le", { limit: 72 }),
		getFilmByList("tv-shows", { limit: 10, sort_field: "view" }),
		getFilmByList("tv-shows", { limit: 48 }),
		getTopAnime(),
		getFilmByList("hoat-hinh", { limit: 48, country: "nhat-ban" }),
		getFilmByList("hoat-hinh", { limit: 48, country: "trung-quoc" }),
		getFilmByList("phim-long-tieng", { limit: 48, sort_field: "view" }),
		getFilmByList("phim-long-tieng", { limit: 48 }),
		getFilmByList("phim-chieu-rap", { limit: 24 }),
		getFilmByList("phim-sap-chieu", { limit: 24 }),
	])
	// ------------------------------------
	const items = homeResponse?.data || []
	const koreanFilm = koreaFilmResponse?.data || []
	const chineseFilm = chineseFilmResponse?.data || []
	const usFilm = usFilmResponse?.data || []
	const getNewestSeriesByList = getNewestSeriesByListResponse?.data || []
	const topSeriesFilm = getSeriesByListResponse?.data || []
	const getNewestSingleByList = getNewestSingleByListResponse?.data || []
	const topSingleFilm = getSingleByListResponse?.data || []
	const topTVShowsByList = getTopTVShowsByListResponse?.data || []
	const newestTVShowsByList = getNewestTVShowsByListResponse?.data || []
	const topAnimate = getTopAnimateByListResponse?.data || []
	const newestAnime = getNewestAnimeResponse?.data || []
	const newestChineseAnimate = getNewestChineseAnimateResponse?.data || []
	const topDubbed = getTopDubbedResponse?.data || []
	const newestDubbed = getNewestDubbedResponse?.data || []
	const newestMovie = getNewestMovieResponse?.data || []
	const newestTrailer = getNewestTrailerResponse?.data || []

	return (
		<main className="min-h-svh w-full pt-16">
			<Banner films={items} />
			<div className="max-w-420 mx-auto px-4 md:px-10 space-y-8">
				<CountryHighlight
					koreanFilm={koreanFilm}
					chineseFilm={chineseFilm}
					usFilm={usFilm}
				/>
				<ShowcaseWrapper />
				<NewestSeriesHeading />
				<FilmListWrapper
					items={getNewestSeriesByList.items}
					id="home-newest-series"
					viewMoreHref="/danh-sach/phim-bo"
				/>
				{/* ----------------- */}
				<Spacer y={10} />
				{/* ----------------- */}
				<AddictionSeriesHeading />
				<TopFilm items={topSeriesFilm.items} />
				{/* ----------------- */}
				<Spacer y={10} />
				{/* ----------------- */}
				<NewestSingleHeading />
				<FilmListWrapper
					items={getNewestSingleByList.items}
					id="home-newest-single"
					viewMoreHref="/danh-sach/phim-le"
				/>
				{/* ----------------- */}
				<Spacer y={10} />
				{/* ----------------- */}
				<TopPeakSingleHeading />
				<TopFilm items={topSingleFilm.items} />
				{/* ----------------- */}
				<Spacer y={10} />
				{/* ----------------- */}
				<NewestTVShowsHeading />
				<FilmListWrapper
					items={topTVShowsByList.items}
					id="home-newest-tv-shows"
					viewMoreHref="/danh-sach/tv-shows"
				/>
				{/* ----------------- */}
				<Spacer y={10} />
				{/* ----------------- */}
				<div className="mx-auto my-4 text-white gap-4">
					<FilmSection
						title={"Những Show được người xem yêu thích nhất"}
						data={newestTVShowsByList}
						slug={"/the-loai/tv-shows"}
						gradientFrom={"from-cyan-600"}
						position={"right"}
					/>
				</div>
				{/* ----------------- */}
				<Spacer y={10} />
				{/* ----------------- */}
				<MainAnimateHeadingSection />
				<SideAndHighlight items={topAnimate} />
				<AnimatedSectionHeader
					titleTop="Khám phá"
					titleMain="Hoạt hình Trung Hoa"
					subtitle="Đa sắc • Huyền ảo • Tu tiên • Nghịch thiên"
					align="left"
					videos={chinaVideos}
					gradient="china"
				/>
				<FilmListWrapper
					items={newestChineseAnimate.items}
					id="newest-chinese-animate"
					viewMoreHref="/danh-sach/hoat-hinh?country=trung-quoc"
				/>
				<div className="flex items-center justify-center my-2">
					<div className="h-px w-20 bg-linear-to-r from-transparent via-white/20 to-transparent" />
					<span className="mx-4 text-xs text-white/30 tracking-widest uppercase">
						HOẶC
					</span>
					<div className="h-px w-20 bg-linear-to-r from-transparent via-white/20 to-transparent" />
				</div>
				<AnimatedSectionHeader
					titleTop="Thế giới"
					titleMain="Anime Nhật Bản"
					subtitle="Cảm xúc • Phiêu lưu • Nghệ thuật • Học đường"
					align="right"
					videos={japanVideos}
					gradient="japan"
				/>
				<FilmListWrapper
					items={newestAnime.items}
					id="newest-anime-animate"
					viewMoreHref="/danh-sach/hoat-hinh?country=nhat-ban"
				/>
				{/* ----------------- */}
				<Spacer y={10} />
				{/* ----------------- */}
				<DubbedHeading />
				<TopDubbedHeading />
				<FilmListWrapper
					items={topDubbed.items}
					id="top-dubbed"
					dubbed={true}
				/>
				<TopNewestHeading />
				<FilmListWrapper
					items={newestDubbed.items}
					id="newest-dubbed"
					dubbed={true}
					viewMoreHref="/danh-sach/phim-long-tieng"
				/>

				{/* ----------------- */}
				<Spacer y={10} />
				{/* ----------------- */}
				<CinemaMainHeading />
				<div className="mx-auto my-4 text-white gap-4">
					<FilmSection
						title={"Tận hưởng loạt phim chiếu rạp mới nhất"}
						data={newestMovie}
						slug={"/danh-sach/phim-chieu-rap"}
						gradientFrom={"from-green-600"}
						position={"left"}
					/>
				</div>
				<div className="mx-auto mt-4 mb-20 text-white gap-4">
					<FilmSection
						title={"Trailer các phim sắp ra, liệu có thành bom tấn?"}
						data={newestTrailer}
						slug={"/danh-sach/phim-sap-chieu"}
						gradientFrom={"from-red-600"}
						position={"right"}
					/>
				</div>
			</div>
		</main>
	)
}
