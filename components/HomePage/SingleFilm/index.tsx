import { NewestSingleHeading, TopPeakSingleHeading } from "@/components/Heading"
import FilmListWrapper from "@/components/FilmList/FilmListDynamic"
import TopFilm from "@/components/TopFilm"
import { fetchFilmListFromBackend } from "@/services"

export async function NewestSingleWrapper() {
	const params = new URLSearchParams({ limit: "72" }).toString()
	const res = await fetchFilmListFromBackend("phim-le", params)
	return (
		<>
			<NewestSingleHeading />
			<FilmListWrapper
				items={res?.data?.items || []}
				id="home-newest-single"
				viewMoreHref="/danh-sach/phim-le"
			/>
		</>
	)
}

export async function TopSingleWrapper() {
	const params = new URLSearchParams({
		limit: "10",
		sort_field: "view",
	}).toString()
	const res = await fetchFilmListFromBackend("phim-le", params)
	return (
		<>
			<TopPeakSingleHeading />
			<TopFilm items={res?.data?.items || []} />
		</>
	)
}
