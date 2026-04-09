import { fetchFilmInfoFromBackend } from "@/services"
import { NextResponse, NextRequest } from "next/server"

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ film_slug: string }> },
) {
	const { film_slug } = await params
	const data = await fetchFilmInfoFromBackend(film_slug)

	if (!data) {
		return NextResponse.json(
			{ success: false, message: "Lấy thông tin phim thất bại." },
			{ status: 500 },
		)
	}

	return NextResponse.json(data, { status: 200 })
}
