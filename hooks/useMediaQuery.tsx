"use client"
import { useSyncExternalStore } from "react"

// export function useMediaQuery(query: string) {
// 	const subscribe = (callback: () => void) => {
// 		const media = window.matchMedia(query)
// 		media.addEventListener("change", callback)
// 		return () => media.removeEventListener("change", callback)
// 	}

// 	const getSnapshot = () => {
// 		return window.matchMedia(query).matches
// 	}

// 	const getServerSnapshot = () => null

// 	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
// }

export function useMediaQuery(query: string) {
	const getSnapshot = () => {
		if (typeof window === "undefined") return false
		return window.matchMedia(query).matches
	}

	const subscribe = (callback: () => void) => {
		if (typeof window === "undefined") return () => {}

		const media = window.matchMedia(query)
		media.addEventListener("change", callback)
		return () => media.removeEventListener("change", callback)
	}

	return useSyncExternalStore(
		subscribe,
		getSnapshot,
		() => false, // 👈 SSR fallback
	)
}

export const useIsMobile = () => {
	return useMediaQuery("(max-width: 1023px)")
}

export function useMounted() {
	return useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	)
}
