import { AddictionSeriesHeading } from "@/components/Heading"
import TopFilm from "@/components/TopFilm"
import { fetchFilmListFromBackend } from "@/services"

export async function TopSeriesWrapper() {
	const params = new URLSearchParams({
		limit: "10",
		sort_field: "view",
	}).toString()

	const res = await fetchFilmListFromBackend("phim-bo", params)
	const items = res?.data?.items || []

	return (
		<>
			<AddictionSeriesHeading />
			<TopFilm items={items} />
		</>
	)
}
