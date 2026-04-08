import { NextResponse, NextRequest } from "next/server"
import { API } from "@/constants"

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)

		const keyword = searchParams.get("keyword")
		const page = searchParams.get("page") || "1"
		const limit = searchParams.get("limit") || "25"

		if (!keyword) {
			return NextResponse.json(
				{ message: "Thiếu từ khóa tìm kiếm" },
				{ status: 400 },
			)
		}

		const backendUrl = `${API}/tim-kiem?keyword=${encodeURIComponent(
			keyword,
		)}&page=${page}&limit=${limit}`

		const res = await fetch(backendUrl, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			cache: "no-store",
		})

		if (!res.ok) {
			return NextResponse.json(
				{ success: false, message: "Tìm kiếm thất bại từ Backend." },
				{ status: res.status },
			)
		}

		const data = await res.json()

		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Lỗi từ phía server NextJS." },
			{ status: 500 },
		)
	}
}
