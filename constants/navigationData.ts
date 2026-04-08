import { WEB_URL } from "."

export async function getNavigationData() {
	const [genresRes, countriesRes, yearsRes] = await Promise.all([
		fetch(`${WEB_URL}/api/the-loai`),
		fetch(`${WEB_URL}/api/quoc-gia`),
		fetch(`${WEB_URL}/api/nam-phat-hanh`),
	])
	const genres = await genresRes.json()
	const countries = await countriesRes.json()
	const years = await yearsRes.json()
	return {
		genres: genres.data.items || [],
		countries: countries.data.items || [],
		years: years.data.items || [],
	}
}
