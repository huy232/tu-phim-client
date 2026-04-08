import { type NextRequest } from "next/server"
import { updateSession } from "@/supabase/middleware"

export async function middleware(request: NextRequest) {
	return await updateSession(request)
}

export const config = {
	matcher: [
		/*
		 * Khớp với tất cả các request ngoại trừ:
		 * - _next/static (file tĩnh)
		 * - _next/image (tối ưu ảnh)
		 * - favicon.ico (icon hệ thống)
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
}
