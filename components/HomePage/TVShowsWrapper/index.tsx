import { NewestTVShowsHeading } from "@/components/Heading"
import FilmListWrapper from "@/components/FilmList/FilmListDynamic"
import { fetchFilmListFromBackend } from "@/services"
import FilmSection from "@/components/FilmCarousel/FilmSection"

export async function TVShowFullWrapper() {
	const TVShowsList = new URLSearchParams({ limit: "24" }).toString()
	const TVShowsTopView = new URLSearchParams({
		limit: "10",
		sort_field: "view",
	}).toString()

	const [newestRes, topRes] = await Promise.all([
		fetchFilmListFromBackend("tv-shows", TVShowsList),
		fetchFilmListFromBackend("tv-shows", TVShowsTopView),
	])

	return (
		<>
			<NewestTVShowsHeading />
			<FilmListWrapper
				items={topRes?.data?.items || []}
				id="home-newest-tv-shows"
				viewMoreHref="/danh-sach/tv-shows"
			/>
			<div className="mx-auto my-4 text-white gap-4">
				<FilmSection
					title="Những Show được người xem yêu thích nhất"
					data={newestRes.data}
					slug="/danh-sach/tv-shows"
					gradientFrom="from-cyan-600"
					position="right"
				/>
			</div>
		</>
	)
}
