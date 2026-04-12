"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "@/assets/icons"
import { useDebounce } from "@/hooks/useDebounce"
import { motion, AnimatePresence } from "framer-motion"
import FilmSearchSkeleton from "./FilmSearchSkeleton"
import FilmCardItem from "./FilmCardItem"
import FilmPreviewCard from "./FilmPreviewCard"
import { WEB_URL } from "@/constants"

const FilmSearch = () => {
	const router = useRouter()

	const [keyword, setKeyword] = useState("")
	const [results, setResults] = useState<Film[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [isTyping, setIsTyping] = useState(false)
	const [showResults, setShowResults] = useState(false)
	const [hoveredFilm, setHoveredFilm] = useState<Film | null>(null)
	const [total, setTotal] = useState(0)
	const [readyToShow, setReadyToShow] = useState(false)

	const searchRef = useRef<HTMLDivElement>(null)
	const debouncedKeyword = useDebounce(keyword, 1000)

	// ================= CLICK OUTSIDE =================
	useEffect(() => {
		const handleClickOutside = (e: PointerEvent) => {
			if (!searchRef.current) return

			if (!searchRef.current.contains(e.target as Node)) {
				setShowResults(false)
			}
		}

		document.addEventListener("pointerdown", handleClickOutside)
		return () => document.removeEventListener("pointerdown", handleClickOutside)
	}, [])

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

				const searchResult = await res.json()
				const pagination = searchResult.data.params?.pagination

				setResults(searchResult.data.items || [])
				setTotal(pagination?.totalItems || 0)
			} catch (error: unknown) {
				if (error instanceof Error && error.name !== "AbortError") {
					console.error("Fetch error:", error.message)
				}
			} finally {
				setIsLoading(false)
			}
		}

		fetchSearch()
		return () => controller.abort()
	}, [debouncedKeyword])

	// ================= READY STATE =================
	useEffect(() => {
		if (!isTyping && results.length > 0) {
			const t = setTimeout(() => setReadyToShow(true), 200)
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
		if (keyword.trim()) {
			resetSearch()
			router.push(`${WEB_URL}/tim-kiem?keyword=${encodeURIComponent(keyword)}`)
		}
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

	// ================= STATE =================
	const isProcessing = isTyping || isLoading || keyword !== debouncedKeyword

	const showList = !isProcessing && results.length > 0

	const showNotFound =
		!isProcessing && keyword.trim() !== "" && results.length === 0

	const showViewAll = total > results.length

	const shouldShowDropdown =
		showResults &&
		keyword.trim().length >= 2 &&
		(readyToShow || isProcessing || showNotFound)

	// ================= RENDER =================
	return (
		<div ref={searchRef} className="w-full lg:mx-4 relative">
			{/* INPUT */}
			<form onSubmit={handleSearch} className="relative z-60">
				<div className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-gray-400">
					<SearchIcon size={16} />
				</div>

				<input
					value={keyword}
					onChange={handleInputChange}
					onFocus={() => {
						if (keyword.length >= 2) setShowResults(true)
					}}
					className="w-full text-xs font-light rounded-md bg-white/10 px-10 h-9 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
					type="text"
					placeholder="Tìm phim..."
					autoComplete="off"
					inputMode="search"
				/>

				{isProcessing && keyword && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="absolute right-3 top-1/2 -translate-y-1/2"
					>
						<div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full" />
					</motion.div>
				)}
			</form>

			{/* DROPDOWN */}
			<AnimatePresence>
				{shouldShowDropdown && (
					<motion.div
						initial={{ opacity: 0, y: -10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.95 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="mt-2 w-full sm:absolute sm:top-full sm:z-50 max-h-110"
					>
						<div className="relative">
							<div className="bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 overflow-hidden rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
								{isProcessing ? (
									<FilmSearchSkeleton />
								) : showList ? (
									<div className="p-2">
										<div className="max-h-87.5 overflow-y-auto custom-scrollbar flex flex-col gap-1 overflow-x-hidden">
											{results.map((film: Film, index: number) => (
												<FilmCardItem
													key={film._id}
													film={film}
													index={index}
													setShowResults={setShowResults}
													onHover={setHoveredFilm}
													onClick={() => resetSearch()}
												/>
											))}
										</div>

										{showViewAll && (
											<>
												<div className="relative h-px w-full my-2 bg-linear-to-r from-transparent via-white/10 to-transparent">
													<div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-500/20 to-transparent blur-sm"></div>
												</div>

												<motion.button
													whileHover={{
														backgroundColor: "rgba(168, 85, 247, 0.1)",
													}}
													onClick={handleSearch}
													className="w-full py-2 text-center text-xs text-white font-light tracking-widest uppercase mt-2 px-2 rounded-md"
													whileTap={{ scale: 0.95 }}
												>
													Xem thêm{" "}
													<span className="text-purple-400">
														{total - results.length}
													</span>{" "}
													kết quả nữa cho{" "}
													<span className="bg-size-[200%_auto] bg-linear-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
														{keyword}
													</span>
													...
												</motion.button>
											</>
										)}
									</div>
								) : showNotFound ? (
									<div className="p-8 text-center flex flex-col items-center gap-2">
										<span className="text-2xl">☹️</span>
										<span className="text-xs text-gray-500">
											Không tìm thấy phim nào khớp với từ khóa.
										</span>
									</div>
								) : null}
							</div>

							{/* PREVIEW (desktop only) */}
							<AnimatePresence mode="wait">
								{hoveredFilm && !isProcessing && (
									<motion.div
										initial={{ opacity: 0, x: 15 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 10 }}
										className="hidden lg:block absolute top-0 w-65 left-0"
									>
										<FilmPreviewCard
											key={hoveredFilm._id + hoveredFilm.slug}
											film={hoveredFilm}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default FilmSearch
