import { getCountriesFromBackend } from "@/constants"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const data = await getCountriesFromBackend(searchParams.toString())

	if (!data) return NextResponse.json({ success: false }, { status: 500 })
	return NextResponse.json(data)
}
