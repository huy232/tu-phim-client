import { NextResponse, NextRequest } from "next/server"
import { API } from "@/constants"

export async function GET(request: NextRequest) {
	try {
		const res = await fetch(API + `/quoc-gia/list`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})

		if (!res.ok) {
			return NextResponse.json(
				{ success: false, message: "Lấy danh sách quốc gia thất bại." },
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
