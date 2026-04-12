import {
	DubbedHeading,
	TopDubbedHeading,
	TopNewestHeading,
} from "@/components/Heading"
import FilmListWrapper from "@/components/FilmList/FilmListDynamic"
import { fetchFilmListFromBackend } from "@/services"

export async function DubbedWrapper() {
	const dubbedTop = new URLSearchParams({
		limit: "24",
		sort_field: "view",
	}).toString()
	const dubbedList = new URLSearchParams({
		limit: "24",
	}).toString()

	const [topRes, newestRes] = await Promise.all([
		fetchFilmListFromBackend("phim-long-tieng", dubbedTop),
		fetchFilmListFromBackend("phim-long-tieng", dubbedList),
	])

	const topDubbedItems = topRes?.data?.items || []
	const newestDubbedItems = newestRes?.data?.items || []

	return (
		<>
			{/* HEADING VÀ LỒNG TIẾNG */}
			<DubbedHeading />

			<TopDubbedHeading />
			<FilmListWrapper items={topDubbedItems} id="top-dubbed" dubbed={true} />

			<TopNewestHeading />
			<FilmListWrapper
				items={newestDubbedItems}
				id="newest-dubbed"
				dubbed={true}
				viewMoreHref="/danh-sach/phim-long-tieng"
			/>
		</>
	)
}
