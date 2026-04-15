"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import FilmCard from "../ui/film-card"
import { SkeletonGrid } from "./SkeletonCard"
import { AnimatePresence, motion } from "framer-motion"
import { toast } from "sonner"

interface InfiniteFilmListProps {
	params: Record<string, string | string[] | undefined | null>
	type: "the-loai" | "quoc-gia" | "danh-sach" | "tim-kiem"
	initialSlug: string
}

const InfiniteFilmList = ({
	params,
	initialSlug,
	type,
}: InfiniteFilmListProps) => {
	const [films, setFilms] = useState<FilmInfo[]>([])
	const [hasMore, setHasMore] = useState(true)
	const [loading, setLoading] = useState(false)
	const [initialLoading, setInitialLoading] = useState(true)

	const observerRef = useRef<HTMLDivElement | null>(null)
	const pageRef = useRef(1)
	const fetchingRef = useRef(false)

	useEffect(() => {
		setFilms([])
		setHasMore(true)
		setInitialLoading(true)
		pageRef.current = 1
	}, [params, initialSlug, type])

	const fetchFilms = useCallback(async () => {
		if (fetchingRef.current || !hasMore) return

		fetchingRef.current = true
		setLoading(true)

		try {
			const queryObj: Record<string, string> = {}

			Object.entries(params).forEach(([key, value]) => {
				if (typeof value === "string") {
					queryObj[key] = value
				}
			})

			const query = new URLSearchParams({
				...queryObj,
				page: String(pageRef.current),
			})
			let res
			if (type === "tim-kiem") {
				res = await fetch(`/api/${type}?${query}`)
			} else {
				res = await fetch(`/api/${type}/${initialSlug}?${query}`)
			}
			const filmData = (await res.json()) as FilmResponse

			const items = filmData.data.items
			const pagination = filmData.data.params.pagination

			if (pageRef.current === 1) {
				setFilms(items)
			} else {
				setFilms((prev) => [...prev, ...items])
			}

			const hasNext =
				pagination.currentPage * pagination.totalItemsPerPage <
				pagination.totalItems

			setHasMore(hasNext)

			pageRef.current += 1
		} catch (error) {
			if (error instanceof Error) {
				toast.error("Lỗi trong khi tải thêm phim.")
				console.error(error)
			}
		} finally {
			setLoading(false)
			setInitialLoading(false)
			fetchingRef.current = false
		}
	}, [params, hasMore, initialSlug, type])

	useEffect(() => {
		if (pageRef.current === 1) {
			fetchFilms()
		}
	}, [fetchFilms])

	useEffect(() => {
		if (initialLoading) return

		const el = observerRef.current
		if (!el) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchFilms()
				}
			},
			{
				rootMargin: "200px",
			},
		)

		observer.observe(el)

		return () => observer.disconnect()
	}, [fetchFilms, initialLoading])

	return (
		<div className="w-full">
			<div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8">
				{initialLoading ? (
					<SkeletonGrid count={10} />
				) : (
					<AnimatePresence mode="popLayout">
						{films.map((film, index) => (
							<motion.div
								key={film._id}
								initial={{ opacity: 0, scale: 0.9, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								whileInView={{ opacity: 1, scale: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.5,
									ease: [0.22, 1, 0.36, 1],
									delay: (index % 5) * 0.1,
								}}
							>
								<FilmCard film={film} />
							</motion.div>
						))}
					</AnimatePresence>
				)}
			</div>

			{loading && !initialLoading && (
				<div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8">
					<SkeletonGrid count={10} />
				</div>
			)}

			<div
				ref={observerRef}
				className="relative py-24 flex flex-col items-center justify-center"
			>
				{!hasMore && !initialLoading && (
					<motion.div
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: "100%", opacity: 1 }}
						className="flex items-center gap-6 w-full max-w-2xl"
					>
						<div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-white/20" />
						<div className="flex flex-col items-center shrink-0">
							<span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">
								Đã hết danh sách
							</span>
							<div className="flex gap-1.5">
								{[1, 2, 3].map((i) => (
									<div key={i} className="w-1 h-1 bg-purple-500/40 rotate-45" />
								))}
							</div>
						</div>
						<div className="flex-1 h-px bg-linear-to-l from-transparent via-white/10 to-white/20" />
					</motion.div>
				)}
			</div>
		</div>
	)
}

export default InfiniteFilmList
