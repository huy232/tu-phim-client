import { NextResponse, NextRequest } from "next/server"
import { API } from "@/constants"

export async function GET(
	request: NextRequest,
	{ params }: { params: { film_slug: string } },
) {
	try {
		const resolvedParams = await params
		const film_slug = resolvedParams.film_slug

		const backendUrl = `${API}/dien-vien/${film_slug}`
		const res = await fetch(backendUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})

		if (!res.ok) {
			return NextResponse.json(
				{ success: false, message: "Lấy thông tin diễn viên thất bại." },
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
