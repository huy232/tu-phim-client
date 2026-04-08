import { WEB_URL } from "@/constants"

export async function getHomeData() {
	const res = await fetch(WEB_URL + `/api/trang-chu`, {
		next: { revalidate: 3600 },
	})
	if (!res.ok) throw new Error("Failed to fetch")
	return res.json()
}
