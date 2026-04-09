import { NextResponse, NextRequest } from "next/server"
import { API } from "@/constants"

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ country_slug: string }> },
) {
	try {
		const resolvedParams = await params
		const country_slug = resolvedParams.country_slug

		const { searchParams } = new URL(request.url)
		const queryString = searchParams.toString()

		const backendUrl = `${API}/quoc-gia/${country_slug}?${queryString}`

		const res = await fetch(backendUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})

		if (!res.ok) {
			return NextResponse.json(
				{ success: false, message: "Lấy phim dựa theo quốc gia thất bại." },
				{ status: res.status },
			)
		}

		const data = await res.json()
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.error("Lỗi API Route:", error)
		return NextResponse.json(
			{ success: false, message: "Lỗi từ phía server." },
			{ status: 500 },
		)
	}
}
