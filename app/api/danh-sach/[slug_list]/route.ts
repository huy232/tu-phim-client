import { fetchFilmListFromBackend } from "@/services"
import { NextResponse, NextRequest } from "next/server"

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug_list: string }> },
) {
	const { slug_list } = await params
	const { searchParams } = new URL(request.url)

	const data = await fetchFilmListFromBackend(
		slug_list,
		searchParams.toString(),
	)

	if (!data) {
		return NextResponse.json(
			{ success: false, message: "Không thể lấy danh sách bí tịch." },
			{ status: 500 },
		)
	}

	return NextResponse.json(data, { status: 200 })
}
