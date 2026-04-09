import { API } from "@/constants"

export async function getCountriesFromBackend(queryString: string = "") {
	const res = await fetch(`${API}/quoc-gia/list?${queryString}`, {
		next: { revalidate: 86400 },
	})
	return res.ok ? res.json() : null
}

export async function getCategoriesFromBackend(queryString: string = "") {
	const res = await fetch(`${API}/the-loai/list?${queryString}`, {
		next: { revalidate: 86400 },
	})
	return res.ok ? res.json() : null
}

export async function getYearsFromBackend() {
	const res = await fetch(`${API}/nam-phat-hanh`, {
		next: { revalidate: 86400 },
	})
	return res.ok ? res.json() : null
}

export async function getNavigationData(): Promise<NavigationData> {
	const [genresRes, countriesRes, yearsRes] = await Promise.all([
		getCategoriesFromBackend(),
		getCountriesFromBackend(),
		getYearsFromBackend(),
	])

	return {
		genres: genresRes?.data?.items || [],
		countries: countriesRes?.data?.items || [],
		years: yearsRes?.data?.items || [],
	}
}
