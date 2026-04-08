"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import FilmCard from "../ui/film-card"
import { SkeletonGrid } from "./SkeletonCard"
import { motion, AnimatePresence } from "framer-motion"
import PaginationHeader from "./PaginateHeader"

interface PaginatedFilmListProps {
	params: Record<string, string | string[] | undefined | null>
	type: "the-loai" | "quoc-gia" | "danh-sach" | "tim-kiem"
	initialSlug: string
}

const PaginatedFilmList = ({
	params,
	initialSlug,
	type,
}: PaginatedFilmListProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [films, setFilms] = useState<FilmInfo[]>([])
	const [loading, setLoading] = useState(true)
	const [paginationInfo, setPaginationInfo] = useState({
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
	})

	const fetchingRef = useRef(false)

	const fetchFilms = useCallback(async () => {
		if (fetchingRef.current) return

		fetchingRef.current = true
		setLoading(true)

		try {
			const queryObj: Record<string, string> = {}
			Object.entries(params).forEach(([key, value]) => {
				if (typeof value === "string") queryObj[key] = value
			})

			const query = new URLSearchParams(queryObj)
			let res
			if (type === "tim-kiem") {
				res = await fetch(`/api/${type}?${query}`)
			} else {
				res = await fetch(`/api/${type}/${initialSlug}?${query}`)
			}
			const filmData = (await res.json()) as FilmResponse

			setFilms(filmData.data.items)
			const pagin = filmData.data.params.pagination

			setPaginationInfo({
				currentPage: pagin.currentPage,
				totalPages: Math.ceil(pagin.totalItems / pagin.totalItemsPerPage),
				totalItems: pagin.totalItems,
			})
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
			fetchingRef.current = false
		}
	}, [initialSlug, params, type])

	useEffect(() => {
		fetchFilms()
	}, [fetchFilms])

	const handlePageChange = (newPage: number) => {
		const current = new URLSearchParams(searchParams.toString())
		current.set("page", String(newPage))
		router.push(`${pathname}?${current.toString()}`)
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	return (
		<div className="w-full space-y-12">
			<div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8">
				{loading ? (
					<SkeletonGrid count={15} />
				) : (
					<AnimatePresence mode="popLayout">
						{films.map((film, index) => (
							<motion.div
								key={film._id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3, delay: (index % 10) * 0.03 }}
							>
								<FilmCard film={film} />
							</motion.div>
						))}
					</AnimatePresence>
				)}
			</div>

			{!loading && paginationInfo.totalPages > 1 && (
				<PaginationHeader
					currentPage={paginationInfo.currentPage}
					totalPages={paginationInfo.totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	)
}

export default PaginatedFilmList
