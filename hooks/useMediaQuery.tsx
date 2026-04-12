"use client"
import { useState, useEffect } from "react"
import { useSyncExternalStore } from "react"

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState<boolean | null>(null)

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 1024)
		check()

		window.addEventListener("resize", check)
		return () => window.removeEventListener("resize", check)
	}, [])

	return isMobile
}

export function useMediaQuery(query: string) {
	const subscribe = (callback: () => void) => {
		const media = window.matchMedia(query)
		media.addEventListener("change", callback)
		return () => media.removeEventListener("change", callback)
	}

	const getSnapshot = () => {
		return window.matchMedia(query).matches
	}

	const getServerSnapshot = () => null

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function useMounted() {
	return useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	)
}
