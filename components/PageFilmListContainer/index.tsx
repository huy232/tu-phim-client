"use client"
import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LayoutGrid, List } from "lucide-react"
import InfiniteFilmList from "./InfiniteFilmList"
import PaginatedFilmList from "./PaginatedFilmList"
import clsx from "clsx"

const PageFilmListContainer = ({
	initialSlug,
	type,
}: {
	initialSlug: string
	type: "the-loai" | "quoc-gia" | "danh-sach" | "tim-kiem"
}) => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const viewMode =
		(searchParams.get("mode") as "infinite" | "pagination") || "infinite"

	const currentParams = useMemo(
		() => ({
			category: searchParams.get("category") ?? undefined,
			country: searchParams.get("country") ?? undefined,
			year: searchParams.get("year") ?? undefined,
			sort_field: searchParams.get("sort_field") || "modified.time",
			sort_type: searchParams.get("sort_type") || "desc",
			page: searchParams.get("page") || "1",
			limit: "25",
			keyword: searchParams.get("keyword") || "",
		}),
		[searchParams],
	)

	const handleViewModeChange = (mode: "infinite" | "pagination") => {
		const params = new URLSearchParams(searchParams.toString())
		params.set("mode", mode)
		if (mode === "infinite") {
			params.set("page", "1")
		}
		router.replace(`${pathname}?${params.toString()}`, { scroll: false })
	}

	return (
		<div className="my-10">
			<div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
				<div className="flex flex-col">
					<span className="text-xs font-bold text-white/80">Hiển thị</span>
					<span className="text-[10px] text-gray-500 uppercase tracking-widest">
						{viewMode === "infinite" ? "Cuộn vô hạn" : "Phân trang"}
					</span>
				</div>

				<div className="flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-inner">
					<button
						onClick={() => handleViewModeChange("infinite")}
						className={clsx(
							"p-2.5 rounded-lg transition-all duration-300 flex items-center gap-2",
							viewMode === "infinite"
								? "bg-purple-600 text-white shadow-lg"
								: "text-gray-500 hover:text-white",
						)}
					>
						<LayoutGrid size={16} />
						{viewMode === "infinite" && (
							<span className="text-[10px] font-bold uppercase tracking-widest">
								Grid
							</span>
						)}
					</button>
					<button
						onClick={() => handleViewModeChange("pagination")}
						className={clsx(
							"p-2.5 rounded-lg transition-all duration-300 flex items-center gap-2",
							viewMode === "pagination"
								? "bg-purple-600 text-white shadow-lg"
								: "text-gray-500 hover:text-white",
						)}
					>
						<List size={16} />
						{viewMode === "pagination" && (
							<span className="text-[10px] font-bold uppercase tracking-widest">
								List
							</span>
						)}
					</button>
				</div>
			</div>

			{viewMode === "infinite" ? (
				<InfiniteFilmList
					key={`infinite-${initialSlug}`}
					params={currentParams}
					initialSlug={initialSlug}
					type={type}
				/>
			) : (
				<PaginatedFilmList
					key={`pagination-${initialSlug}`}
					params={currentParams}
					initialSlug={initialSlug}
					type={type}
				/>
			)}
		</div>
	)
}

export default PageFilmListContainer
