import { NextResponse } from "next/server"
import { fetchHomeDataFromBackend } from "@/services/home"

export async function GET() {
	const data = await fetchHomeDataFromBackend()

	if (!data) {
		return NextResponse.json(
			{ success: false, message: "Lấy thông tin mục hero thất bại." },
			{ status: 500 },
		)
	}

	return NextResponse.json(data, { status: 200 })
}
