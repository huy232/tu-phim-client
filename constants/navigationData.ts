import { API } from "@/constants"

export async function getCountriesFromBackend(queryString: string = "") {
	const res = await fetch(`${API}/quoc-gia/list?${queryString}`, {
		next: { revalidate: 3600 },
	})
	return res.ok ? res.json() : null
}

export async function getCategoriesFromBackend(queryString: string = "") {
	const res = await fetch(`${API}/the-loai/list?${queryString}`, {
		next: { revalidate: 3600 },
	})

	if (!res.ok) return null

	const result = await res.json()

	if (result && result.data && result.data.items) {
		result.data.items = result.data.items.filter(
			(item: Category) => item.slug !== "18" && item.name !== "Phim 18+",
		)
	}

	return result
}

export async function getYearsFromBackend() {
	const res = await fetch(`${API}/nam-phat-hanh`, {
		next: { revalidate: 3600 },
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
