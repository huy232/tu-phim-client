import { getYearsFromBackend } from "@/constants"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const data = await getYearsFromBackend()

	if (!data) return NextResponse.json({ success: false }, { status: 500 })
	return NextResponse.json(data)
}
