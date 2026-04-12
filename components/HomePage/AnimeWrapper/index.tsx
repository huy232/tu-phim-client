import {
	MainAnimateHeadingSection,
	AnimatedSectionHeader,
} from "@/components/Heading"
import SideAndHighlight from "@/components/SideAndHighlight"
import FilmListWrapper from "@/components/FilmList/FilmListDynamic"
import { fetchFilmListFromBackend, fetchTopAnimeFromBackend } from "@/services"
import { chinaVideos, japanVideos } from "@/constants"

export async function AnimeWrapper() {
	const china = new URLSearchParams({
		limit: "24",
		country: "trung-quoc",
	}).toString()
	const japan = new URLSearchParams({
		limit: "24",
		country: "nhat-ban",
	}).toString()

	const [topAnimateRes, newestChineseRes, newestJapanRes] = await Promise.all([
		fetchTopAnimeFromBackend(),
		fetchFilmListFromBackend("hoat-hinh", china),
		fetchFilmListFromBackend("hoat-hinh", japan),
	])

	const topAnimate = topAnimateRes?.data || []
	const newestChineseAnimate = newestChineseRes?.data || { items: [] }
	const newestAnime = newestJapanRes?.data || { items: [] }

	return (
		<>
			{/* KHU VỰC ANIME TỔNG */}
			<MainAnimateHeadingSection />
			<SideAndHighlight items={topAnimate} />

			{/* ANIME TRUNG QUỐC */}
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

			{/* ANIME NHẬT BẢN */}
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
		</>
	)
}
