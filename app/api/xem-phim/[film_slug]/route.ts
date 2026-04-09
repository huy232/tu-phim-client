import { fetchWatchInfoFromBackend } from "@/services"
import { NextResponse, NextRequest } from "next/server"

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ film_slug: string }> },
) {
	const { film_slug } = await params
	const data = await fetchWatchInfoFromBackend(film_slug)

	if (!data) {
		return NextResponse.json(
			{ success: false, message: "Không thể lấy linh mạch xem phim." },
			{ status: 500 },
		)
	}

	return NextResponse.json(data, { status: 200 })
}
