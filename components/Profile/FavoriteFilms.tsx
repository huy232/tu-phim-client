"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"
import clsx from "clsx"
import FilmCard, { SkeletonCard } from "./FilmCard"

const ITEMS_PER_PAGE = 12

interface FavoriteFilmsProps {
	initialFavorites: FavoriteFilmItem[]
	initialTotal: number
}

export default function FavoriteFilms({
	initialFavorites,
	initialTotal,
}: FavoriteFilmsProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const queryPage = Number(searchParams.get("page")) || 1

	const [currentPage, setCurrentPage] = useState(queryPage)
	const [favorites, setFavorites] =
		useState<FavoriteFilmItem[]>(initialFavorites)

	const [totalCount, setTotalCount] = useState(initialTotal)
	const [loading, setLoading] = useState(false)

	const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

	useEffect(() => {
		setCurrentPage(queryPage)
	}, [queryPage])

	useEffect(() => {
		let ignore = false
		const fetchData = async () => {
			setLoading(true)
			try {
				const res = await fetch(`/api/yeu-thich?page=${currentPage}`)
				const json = await res.json()
				if (!ignore) {
					setFavorites(json.data)
					setTotalCount(json.count)
				}
			} finally {
				setLoading(false)
			}
		}
		fetchData()
		return () => {
			ignore = true
		}
	}, [currentPage])

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages) return

		const params = new URLSearchParams(searchParams)
		params.set("page", page.toString())
		router.push(`${pathname}?${params.toString()}`, { scroll: false })

		setCurrentPage(page)
		document
			.getElementById("favorite-section")
			?.scrollIntoView({ behavior: "smooth", block: "start" })
	}

	if (!favorites.length && !loading) return null

	return (
		<div id="favorite-section" className="space-y-8 scroll-mt-24 py-6">
			<div className="relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/5 p-6 backdrop-blur-md">
				<div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="relative">
							<div className="absolute inset-0 bg-red-500 blur-lg opacity-20 animate-pulse" />
							<div className="relative p-3 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/20">
								<Heart size={24} className="text-white fill-white" />
							</div>
						</div>
						<div>
							<h3 className="text-xl font-black text-white tracking-tight uppercase italic">
								Bộ sưu tập <span className="text-red-500">của tôi</span>
							</h3>
							<div className="flex items-center gap-2 mt-1">
								<span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-medium text-zinc-400 border border-white/5">
									{totalCount} PHIM
								</span>
								<span className="text-zinc-600">•</span>
								<span className="text-[10px] text-zinc-500 uppercase tracking-widest">
									Trang {currentPage} / {totalPages}
								</span>
							</div>
						</div>
					</div>

					{totalPages > 1 && (
						<div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-black/20 border border-white/5">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 disabled:opacity-10 transition-colors"
							>
								<ChevronLeft size={20} />
							</button>
							<div className="h-4 w-px bg-white/10 mx-1" />
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 disabled:opacity-10 disabled:cursor-not-allowed transition-all active:scale-95"
							>
								<ChevronRight size={20} />
							</button>
						</div>
					)}
				</div>
			</div>

			{/* GRID: Premium Card Style */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 min-h-[400px]">
				{loading
					? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
							<SkeletonCard key={i} />
						))
					: favorites.map((fav) => <FilmCard key={fav.id} fav={fav} />)}
			</div>

			{/* PAGINATION: Modern Minimal */}
			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-2 pt-8">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
						if (
							totalPages > 5 &&
							Math.abs(page - currentPage) > 2 &&
							page !== 1 &&
							page !== totalPages
						) {
							if (page === 2 || page === totalPages - 1)
								return (
									<span key={page} className="text-zinc-600">
										...
									</span>
								)
							return null
						}
						return (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
								className={clsx(
									"min-w-[36px] h-9 rounded-xl text-xs font-bold transition-all duration-300 border",
									currentPage === page
										? "bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/20 scale-110"
										: "bg-white/5 border-white/5 text-zinc-500 hover:bg-white/10 hover:text-white",
								)}
							>
								{page}
							</button>
						)
					})}
				</div>
			)}
		</div>
	)
}
