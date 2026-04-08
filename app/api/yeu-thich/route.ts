import { getPaginatedFavorites } from "@/services/yeu-thich"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const page = Number(req.nextUrl.searchParams.get("page") || "1")

	const result = await getPaginatedFavorites(page)

	return NextResponse.json(result)
}
