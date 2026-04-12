"use client"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
	Calendar,
	Globe,
	Film,
	Clock,
	Tag,
	MapPin,
	CalendarDays,
	ChevronDown,
	ChevronUp,
	LibraryBig,
	BookType,
	Rss,
} from "lucide-react"
import SiteImage from "../ui/site-image"
import { filmStatusMap, filmTypeMap, IMAGE_URL } from "../../constants/index"

interface SideInfoProps {
	film: FilmInfo
	isDimmed: boolean
}

const SideInfo = ({ film, isDimmed }: SideInfoProps) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const hasContent = film.content && film.content.trim() !== ""

	return (
		<motion.div
			layout
			className={clsx(
				"bg-white/3 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl h-fit",
				isDimmed ? "opacity-0 pointer-events-none" : "opacity-100",
			)}
		>
			{/* ===== HEADER ===== */}
			<div className="relative w-full h-40 sm:h-48 bg-neutral-900">
				{film.poster_url && (
					<div className="absolute inset-0">
						<SiteImage
							src={`${IMAGE_URL}/${film.poster_url}`}
							alt=""
							className="w-full h-full object-cover blur-sm brightness-50 scale-105"
							width={400}
							height={225}
							containerClassName="w-full h-full"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50" />
					</div>
				)}

				<div className="absolute bottom-3 left-3 right-3 flex items-end gap-2">
					{/* POSTER */}
					{film.thumb_url && (
						<div className="w-16 sm:w-20 aspect-2/3 rounded-md overflow-hidden border border-white/20 shrink-0">
							<SiteImage
								src={`${IMAGE_URL}/${film.thumb_url}`}
								alt=""
								width={120}
								height={180}
								className="w-full h-full object-cover"
								containerClassName="w-full h-full"
							/>
						</div>
					)}

					{/* TITLE */}
					<div className="min-w-0">
						<h2 className="text-white font-bold text-sm sm:text-base line-clamp-2">
							{film.name}
						</h2>
						<p className="text-gray-400 text-[11px] truncate">
							{film.origin_name}
						</p>
					</div>
				</div>
			</div>

			{/* ===== BODY ===== */}
			<div className="p-3 sm:p-4 space-y-4">
				{/* ===== QUICK STATS ===== */}
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
					{film.type && filmTypeMap[film.type] && (
						<div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center text-center">
							<BookType
								size={14}
								className={clsx("mb-1", filmTypeMap[film.type].textColor)}
							/>
							<p className="text-[11px] font-bold text-white">
								{filmTypeMap[film.type].label}
							</p>
							<p className="text-[9px] text-gray-500">Loại</p>
						</div>
					)}

					{film.quality && (
						<div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center text-center">
							<Film size={14} className="text-purple-400 mb-1" />
							<p className="text-[11px] font-bold text-white">{film.quality}</p>
							<p className="text-[9px] text-gray-500">Định dạng</p>
						</div>
					)}

					{film.status && filmStatusMap[film.status] && (
						<div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center text-center col-span-2 sm:col-span-1">
							<Rss
								size={14}
								className={clsx("mb-1", filmStatusMap[film.status].textColor)}
							/>
							<p className="text-[11px] font-bold text-white">
								{filmStatusMap[film.status].label}
							</p>
							<p className="text-[9px] text-gray-500">Trạng thái</p>
						</div>
					)}
				</div>

				{/* ===== CONTENT ===== */}
				{hasContent && (
					<div>
						<h3 className="text-sm font-bold border-l-4 border-purple-500 pl-2 text-white">
							Nội dung
						</h3>

						<div className="mt-2">
							<motion.div
								animate={{ height: isExpanded ? "auto" : 70 }}
								className="overflow-hidden text-[12px] text-gray-400"
							>
								<div dangerouslySetInnerHTML={{ __html: film.content }} />
							</motion.div>

							<button
								onClick={() => setIsExpanded(!isExpanded)}
								className="text-[11px] text-purple-400 mt-1 flex items-center gap-1"
							>
								{isExpanded ? "Thu gọn" : "Xem thêm"}
								{isExpanded ? (
									<ChevronUp size={12} />
								) : (
									<ChevronDown size={12} />
								)}
							</button>
						</div>
					</div>
				)}

				{/* ===== DETAIL ===== */}
				<div className="border-t border-white/10 pt-3 space-y-3 text-[12px]">
					{[
						{
							icon: Calendar,
							label: "Trạng thái",
							value: film.episode_current,
						},
						{
							icon: LibraryBig,
							label: "Số tập",
							value: film.episode_total || "???",
						},
						{
							icon: Clock,
							label: "Thời lượng",
							value: film.time,
						},
						{
							icon: CalendarDays,
							label: "Năm",
							value: film.year,
						},
						{
							icon: Globe,
							label: "Ngôn ngữ",
							value: film.lang,
						},
					].map((item, i) =>
						item.value ? (
							<div
								key={i}
								className="flex flex-col sm:flex-row sm:items-center justify-between gap-1"
							>
								<div className="flex items-center gap-2 text-gray-500">
									<item.icon size={13} />
									<span>{item.label}</span>
								</div>
								<span className="text-white font-medium">{item.value}</span>
							</div>
						) : null,
					)}

					{/* COUNTRY */}
					{film.country && (
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2 text-gray-500">
								<MapPin size={13} />
								<span>Quốc gia</span>
							</div>

							<div className="flex flex-wrap gap-1">
								{Array.isArray(film.country) ? (
									film.country.map((c, i) => (
										<span
											key={i}
											className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded"
										>
											{c.name}
										</span>
									))
								) : (
									<span className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded">
										{film.country}
									</span>
								)}
							</div>
						</div>
					)}

					{/* CATEGORY */}
					{film.category?.length > 0 && (
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-2 text-gray-500">
								<Tag size={13} />
								<span>Thể loại</span>
							</div>

							<div className="flex flex-wrap gap-1">
								{film.category.map((c, i) => (
									<span
										key={i}
										className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full"
									>
										{c.name}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	)
}

export default SideInfo
