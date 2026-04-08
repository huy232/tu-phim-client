"use client"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { FilterGroup } from "./FilterGroup"
import { FilterTag } from "./FilterTag"
import { useState } from "react"
import { ChevronDown, FilterIcon } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const SORT_OPTIONS = [
	{ label: "Mới cập nhật", field: "modified.time" },
	{ label: "Mới đăng", field: "_id" },
	{ label: "Năm sản xuất", field: "year" },
]

interface AdvanceFilterProps {
	genres: Category[]
	countries: Country[]
	years: Year[]
	context: "the-loai" | "quoc-gia" | "danh-sach"
}

const AdvanceFilter = ({
	genres,
	countries,
	years,
	context,
}: AdvanceFilterProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const getActiveItems = (key: string): string[] => {
		const val = searchParams.get(key)
		return val ? val.split(",") : []
	}

	const updateParams = (newParams: Record<string, string | null>) => {
		const params = new URLSearchParams(searchParams.toString())
		Object.entries(newParams).forEach(([key, value]) => {
			if (value) params.set(key, value)
			else params.delete(key)
		})
		router.push(`${pathname}?${params.toString()}`)
	}

	const toggleFilter = (key: string, value: string) => {
		let activeItems = getActiveItems(key)
		if (activeItems.includes(value)) {
			activeItems = activeItems.filter((item) => item !== value)
		} else {
			activeItems.push(value)
		}
		updateParams({
			[key]: activeItems.length > 0 ? activeItems.join(",") : null,
		})
	}

	return (
		<div className="w-full">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center justify-between w-full md:w-auto gap-4 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
			>
				<div className="flex items-center gap-2">
					<FilterIcon size={18} className="text-purple-500" />
					<span className="text-xs font-bold uppercase tracking-[0.2em]">
						Bộ lọc nâng cao
					</span>
				</div>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<ChevronDown
						size={16}
						className="opacity-50 group-hover:opacity-100"
					/>
				</motion.div>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0, marginTop: 0 }}
						animate={{ height: "auto", opacity: 1, marginTop: 16 }}
						exit={{ height: 0, opacity: 0, marginTop: 0 }}
						transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
						className="overflow-hidden"
					>
						<div className="space-y-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
							{context !== "the-loai" && (
								<FilterGroup
									label="Thể loại"
									items={genres}
									activeItems={getActiveItems("category")}
									onToggle={(slug) => toggleFilter("category", slug)}
								/>
							)}

							{context !== "quoc-gia" && (
								<FilterGroup
									label="Quốc gia"
									items={countries}
									activeItems={getActiveItems("country")}
									onToggle={(slug) => toggleFilter("country", slug)}
								/>
							)}

							<div>
								<label className="text-[10px] font-bold text-purple-400 uppercase mb-3 block tracking-widest">
									Năm sản xuất
								</label>
								<div className="flex flex-wrap gap-2">
									{years.map((y) => (
										<FilterTag
											key={y.year}
											label={y.year?.toString() || ""}
											isActive={getActiveItems("year").includes(
												y.year?.toString() || "",
											)}
											onClick={() =>
												toggleFilter("year", y.year?.toString() || "")
											}
										/>
									))}
								</div>
							</div>

							<div className="pt-6 border-t border-white/5 space-y-4">
								<div className="flex flex-col md:flex-row md:items-center gap-4">
									<span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
										Sắp xếp theo:
									</span>
									<div className="flex flex-wrap gap-2">
										{SORT_OPTIONS.map((opt) => {
											const isActive =
												searchParams.get("sort_field") === opt.field ||
												(opt.field === "modified.time" &&
													!searchParams.get("sort_field"))
											return (
												<button
													key={opt.field}
													onClick={() =>
														updateParams({ sort_field: opt.field })
													}
													className={`px-3 py-1 text-[10px] rounded border transition-all ${isActive ? "border-purple-500 text-purple-400 bg-purple-500/10" : "border-white/10 text-gray-500 hover:text-gray-300"}`}
												>
													{opt.label}
												</button>
											)
										})}
									</div>
								</div>

								<div className="flex items-center gap-4">
									<span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
										Thứ tự:
									</span>
									<div className="flex gap-2">
										{["desc", "asc"].map((type) => (
											<button
												key={type}
												onClick={() => updateParams({ sort_type: type })}
												className={`px-3 py-1 text-[10px] rounded border uppercase transition-all ${searchParams.get("sort_type") === type || (type === "desc" && !searchParams.get("sort_type")) ? "border-purple-500 text-purple-400 bg-purple-500/10" : "border-white/10 text-gray-500 hover:text-gray-300"}`}
											>
												{type === "desc" ? "Mới nhất" : "Cũ nhất"}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default AdvanceFilter
