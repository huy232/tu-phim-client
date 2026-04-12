import CountryHighlight from "@/components/CountryHighlight"
import { getFilmByCountry } from "@/services"

export async function CountryHighlightWrapper() {
	const [korean, chinese, us] = await Promise.all([
		getFilmByCountry("han-quoc", { limit: 20, loc_trailer: 1 }),
		getFilmByCountry("trung-quoc", { limit: 20, loc_trailer: 1 }),
		getFilmByCountry("au-my", { limit: 20, page: 1, loc_trailer: 1 }),
	])

	return (
		<CountryHighlight
			koreanFilm={korean?.data || []}
			chineseFilm={chinese?.data || []}
			usFilm={us?.data || []}
		/>
	)
}
