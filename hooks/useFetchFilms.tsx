import { useCallback, useRef, useState } from "react"

export const useFilmData = (type: string, slug: string) => {
	const [isLoading, setIsLoading] = useState(false)
	const abortControllerRef = useRef<AbortController | null>(null)

	const fetchData = useCallback(
		async (
			queryParams: Record<
				string,
				string | string[] | number | undefined | null
			>,
		) => {
			if (abortControllerRef.current) abortControllerRef.current.abort()
			const controller = new AbortController()
			abortControllerRef.current = controller

			setIsLoading(true)
			try {
				const query = new URLSearchParams()
				Object.entries(queryParams).forEach(([key, value]) => {
					if (value !== undefined && value !== null && value !== "") {
						query.set(key, String(value))
					}
				})

				const res = await fetch(`/api/${type}/${slug}?${query.toString()}`, {
					signal: controller.signal,
				})
				const result = await res.json()
				return result.data
			} catch (error: unknown) {
				if (error instanceof Error && error.name !== "AbortError") {
					console.error("Fetch error:", error.message)
				}
				return null
			} finally {
				setIsLoading(false)
			}
		},
		[type, slug],
	)

	return { fetchData, isLoading }
}
