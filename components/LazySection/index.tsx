"use client"

import { useEffect, useRef, useState } from "react"

interface SmartLazySectionProps {
	children: React.ReactNode
	fallback?: React.ReactNode
	rootMargin?: string
	preload?: () => Promise<unknown>
}

export default function SmartLazySection({
	children,
	fallback = null,
	rootMargin = "200px",
	preload,
}: SmartLazySectionProps) {
	const ref = useRef<HTMLDivElement | null>(null)

	const [isNear, setIsNear] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		if (!ref.current) return

		const el = ref.current

		const preloadObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsNear(true)
					preload?.()
					preloadObserver.disconnect()
				}
			},
			{ rootMargin: "400px" },
		)

		const visibleObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					visibleObserver.disconnect()
				}
			},
			{ rootMargin },
		)

		preloadObserver.observe(el)
		visibleObserver.observe(el)

		return () => {
			preloadObserver.disconnect()
			visibleObserver.disconnect()
		}
	}, [rootMargin, preload])

	return <div ref={ref}>{isVisible ? children : isNear ? fallback : null}</div>
}
