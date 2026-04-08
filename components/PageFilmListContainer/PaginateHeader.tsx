"use client"
import React, { useState } from "react"
import {
	ChevronsLeft,
	ChevronLeft,
	ChevronRight,
	ChevronsRight,
	ArrowRight,
} from "lucide-react"
import { PaginationIconButton } from "./PaginationIconButton"
import { getPaginationRange } from "@/utilities"
import clsx from "clsx"

const PaginationHeader = ({
	currentPage,
	totalPages,
	onPageChange,
}: {
	currentPage: number
	totalPages: number
	onPageChange: (p: number) => void
}) => {
	const [inputPage, setInputPage] = useState("")
	const pages = getPaginationRange(currentPage, totalPages)

	const handleJump = (e: React.FormEvent) => {
		e.preventDefault()
		const p = parseInt(inputPage)
		if (p > 0 && p <= totalPages) {
			onPageChange(p)
			setInputPage("")
		}
	}

	return (
		<div className="flex flex-col items-center gap-6 py-10 w-full border-t border-white/5 mt-10">
			{/* Dòng 1: Điều hướng chính */}
			<div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
				{/* NHÓM NÚT ĐẦU / TRƯỚC */}
				<div className="flex items-center gap-1">
					<PaginationIconButton
						disabled={currentPage === 1}
						onClick={() => onPageChange(1)}
						icon={<ChevronsLeft size={12} />}
						label="Đầu"
					/>
					<PaginationIconButton
						disabled={currentPage === 1}
						onClick={() => onPageChange(currentPage - 1)}
						icon={<ChevronLeft size={12} />}
						label="Trước"
					/>
				</div>

				{/* DÃY SỐ TRANG */}
				<div className="flex items-center gap-1 mx-1 sm:mx-2">
					{pages.map((p, i) => (
						<React.Fragment key={i}>
							{p === "..." ? (
								<span className="w-6 text-center text-gray-600 font-bold text-xs">
									...
								</span>
							) : (
								<button
									onClick={() => onPageChange(p as number)}
									className={clsx(
										`w-6 h-6 sm:w-8 sm:h-8 rounded-lg text-xs font-black transition-all border`,
										currentPage === p
											? "bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-110 z-10"
											: "bg-white/5 border-white/10 text-gray-400 hover:border-purple-500/50 hover:text-white",
									)}
								>
									{p}
								</button>
							)}
						</React.Fragment>
					))}
				</div>

				{/* NHÓM NÚT SAU / CUỐI */}
				<div className="flex items-center gap-1">
					<PaginationIconButton
						disabled={currentPage === totalPages}
						onClick={() => onPageChange(currentPage + 1)}
						icon={<ChevronRight size={12} />}
						label="Sau"
					/>
					<PaginationIconButton
						disabled={currentPage === totalPages}
						onClick={() => onPageChange(totalPages)}
						icon={<ChevronsRight size={12} />}
						label="Cuối"
					/>
				</div>
			</div>

			{/* Dòng 2: Thông tin & Nhập số trang */}
			<div className="flex flex-col sm:flex-row items-center gap-6 group">
				<p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-medium">
					Trang{" "}
					<span className="text-purple-400 font-black">{currentPage}</span>
					<span className="mx-2 text-white/20">/</span>
					<span className="text-white/80">{totalPages}</span>
				</p>

				<form
					onSubmit={handleJump}
					className="flex items-center bg-white/5 pl-4 pr-1 py-1 rounded-full border border-white/10 focus-within:border-purple-500/50 focus-within:bg-white/10 transition-all"
				>
					<input
						type="number"
						placeholder="Đến trang..."
						value={inputPage}
						onChange={(e) => setInputPage(e.target.value)}
						className="bg-transparent text-[10px] w-16 outline-none text-purple-400 font-bold placeholder:text-gray-600 placeholder:font-normal placeholder:tracking-normal"
					/>
					<button
						type="submit"
						className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full transition-all active:scale-90"
					>
						<ArrowRight size={12} strokeWidth={3} />
					</button>
				</form>
			</div>
		</div>
	)
}

export default PaginationHeader
