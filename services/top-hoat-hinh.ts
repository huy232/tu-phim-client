import { WEB_URL } from "@/constants"
export async function getTopAnime() {
	const res = await fetch(WEB_URL + `/api/top-hoat-hinh`)
	if (!res.ok) throw new Error("Failed to fetch")
	return res.json()
}
