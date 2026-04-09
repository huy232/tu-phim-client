import { NextResponse } from "next/server"
import { fetchTopAnimeFromBackend } from "@/services"

export async function GET() {
	const data = await fetchTopAnimeFromBackend()

	if (!data) {
		return NextResponse.json(
			{ success: false, message: "Lấy top hoạt hình thất bại." },
			{ status: 500 },
		)
	}

	return NextResponse.json(data, { status: 200 })
}
