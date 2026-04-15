"use client"

import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "@/assets/icons"
import { useDebounce } from "@/hooks/useDebounce"
import { motion, AnimatePresence } from "framer-motion"
import FilmSearchSkeleton from "./FilmSearchSkeleton"
import FilmCardItem from "./FilmCardItem"
import FilmPreviewCard from "./FilmPreviewCard"
import { WEB_URL } from "@/constants"
import { useIsMobile } from "@/hooks/useMediaQuery"
import { useSidebar } from "@/context/SidebarContext"
import { toast } from "sonner"

const FilmSearch = () => {
	const { isOpen: isMobileMenuOpen, toggle, close } = useSidebar()
	const router = useRouter()
	const isMobile = useIsMobile()

	const [keyword, setKeyword] = useState("")
	const [results, setResults] = useState<Film[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [isTyping, setIsTyping] = useState(false)
	const [showResults, setShowResults] = useState(false)
	const [hoveredFilm, setHoveredFilm] = useState<Film | null>(null)
	const [total, setTotal] = useState(0)
	const [readyToShow, setReadyToShow] = useState(false)

	const searchRef = useRef<HTMLDivElement>(null)
	const debouncedKeyword = useDebounce(keyword, 500)

	// ================= CLICK OUTSIDE (desktop only) =================
	useEffect(() => {
		if (isMobile) return

		const handleClickOutside = (e: MouseEvent) => {
			if (!searchRef.current) return
			if (!searchRef.current.contains(e.target as Node)) {
				setShowResults(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [isMobile])

	// ================= FETCH =================
	useEffect(() => {
		const controller = new AbortController()

		const fetchSearch = async () => {
			if (!debouncedKeyword.trim()) {
				setResults([])
				setIsLoading(false)
				setIsTyping(false)
				return
			}

			setIsLoading(true)
			setIsTyping(false)

			try {
				const res = await fetch(
					`/api/tim-kiem?keyword=${encodeURIComponent(
						debouncedKeyword,
					)}&limit=10`,
					{ signal: controller.signal },
				)

				const data = await res.json()
				const pagination = data.data.params?.pagination

				setResults(data.data.items || [])
				setTotal(pagination?.totalItems || 0)
			} catch (error: unknown) {
				if (error instanceof Error && error.name !== "AbortError") {
					toast.error(error.message)
					console.error(error.message)
				}
			} finally {
				setIsLoading(false)
			}
		}

		fetchSearch()
		return () => controller.abort()
	}, [debouncedKeyword])

	// ================= READY =================
	useEffect(() => {
		if (!isTyping && results.length > 0) {
			const t = setTimeout(() => setReadyToShow(true), 150)
			return () => clearTimeout(t)
		}
		setReadyToShow(false)
	}, [isTyping, results])

	// ================= RESET =================
	const resetSearch = () => {
		setKeyword("")
		setResults([])
		setHoveredFilm(null)
		setShowResults(false)
	}

	// ================= HANDLERS =================
	const handleSearch = (e?: React.FormEvent) => {
		e?.preventDefault()
		if (!keyword.trim()) return

		resetSearch()
		close()
		router.push(`${WEB_URL}/tim-kiem?keyword=${encodeURIComponent(keyword)}`)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setKeyword(value)
		setIsTyping(true)

		if (value.trim().length >= 2) {
			setShowResults(true)
		} else {
			setShowResults(false)
		}
	}

	const handleSelect = () => {
		resetSearch()
		close()
	}

	// ================= STATE =================
	const isProcessing = isTyping || isLoading || keyword !== debouncedKeyword
	const showList = !isProcessing && results.length > 0
	const showNotFound =
		!isProcessing && keyword.trim() !== "" && results.length === 0
	const showViewAll = total > results.length

	const shouldShow =
		showResults &&
		keyword.trim().length >= 2 &&
		(readyToShow || isProcessing || showNotFound)

	// ================= RENDER =================
	return (
		<div ref={searchRef} className="w-full relative">
			{/* INPUT */}
			<form onSubmit={handleSearch} className="relative z-10">
				<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
					<SearchIcon size={16} />
				</div>

				<input
					value={keyword}
					onChange={handleInputChange}
					onFocus={() => {
						if (keyword.length >= 2) setShowResults(true)
					}}
					className="w-full text-base sm:text-xs rounded-md bg-white/10 px-10 h-10 sm:h-9 focus:outline-none focus:ring-1 focus:ring-purple-500"
					placeholder="Tìm phim..."
					autoComplete="off"
					inputMode="search"
				/>

				{isProcessing && keyword && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2">
						<div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full" />
					</div>
				)}
			</form>

			{/* ================= DESKTOP DROPDOWN ================= */}
			{!isMobile && (
				<AnimatePresence>
					{shouldShow && (
						<motion.div
							initial={{ opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							className="absolute top-full mt-2 w-full z-50"
						>
							<SearchContent
								{...{
									isProcessing,
									showList,
									showNotFound,
									results,
									total,
									showViewAll,
									keyword,
									onClickItem: handleSelect,
									onSearch: handleSelect,
									setHoveredFilm,
									hoveredFilm,
								}}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			)}

			{/* ================= MOBILE INLINE ================= */}
			{isMobile && shouldShow && (
				<div className="mt-2">
					<SearchContent
						{...{
							isProcessing,
							showList,
							showNotFound,
							results,
							total,
							showViewAll,
							keyword,
							onClickItem: handleSelect,
							onSearch: handleSelect,
							setHoveredFilm,
							hoveredFilm,
						}}
					/>
				</div>
			)}
		</div>
	)
}

export default FilmSearch

type SearchContentProps = {
	isProcessing: boolean
	showList: boolean
	showNotFound: boolean
	results: Film[]
	total: number
	showViewAll: boolean
	keyword: string
	onClickItem: () => void
	onSearch: () => void
	setHoveredFilm: Dispatch<SetStateAction<Film | null>>
	hoveredFilm: Film | null
}

// ================= EXTRACT COMPONENT =================
function SearchContent(props: SearchContentProps) {
	const {
		isProcessing,
		showList,
		showNotFound,
		results,
		total,
		showViewAll,
		keyword,
		onClickItem,
		onSearch,
		setHoveredFilm,
		hoveredFilm,
	} = props

	return (
		<div className="bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden">
			{isProcessing ? (
				<FilmSearchSkeleton />
			) : showList ? (
				<div className="p-2">
					<div className="max-h-80 overflow-y-auto flex flex-col gap-1">
						{results.map((film: Film, index: number) => (
							<FilmCardItem
								key={film._id}
								film={film}
								index={index}
								setShowResults={() => {}}
								onHover={setHoveredFilm}
								handleResetSearch={onClickItem}
							/>
						))}
					</div>

					{showViewAll && (
						<button
							onClick={onSearch}
							className="w-full py-2 text-xs text-purple-400"
						>
							Xem thêm {total} kết quả cho &quot;{keyword}&quot;
						</button>
					)}
				</div>
			) : showNotFound ? (
				<div className="p-6 text-center text-sm text-gray-500">
					Không tìm thấy
				</div>
			) : null}

			{hoveredFilm && (
				<div className="hidden lg:block absolute left-full top-0 ml-2">
					<FilmPreviewCard film={hoveredFilm} />
				</div>
			)}
		</div>
	)
}
