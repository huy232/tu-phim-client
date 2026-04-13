"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function ScrollToTop() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const prevPathname = useRef<string | null>(null)

	useEffect(() => {
		if (prevPathname.current && prevPathname.current !== pathname) {
			window.scrollTo({
				top: 0,
				behavior: "instant",
			})
		}

		prevPathname.current = pathname
	}, [pathname, searchParams])

	return null
}
