import FilmListWrapper from "@/components/FilmList/FilmListDynamic"
import { NewestSeriesHeading } from "@/components/Heading"
import { fetchFilmListFromBackend } from "@/services"

export async function NewestSeriesWrapper() {
	const params = new URLSearchParams({ limit: "48" }).toString()

	const res = await fetchFilmListFromBackend("phim-bo", params)
	const items = res?.data?.items || []

	return (
		<>
			<NewestSeriesHeading />
			<FilmListWrapper
				items={items}
				id="home-newest-series"
				viewMoreHref="/danh-sach/phim-bo"
			/>
		</>
	)
}
