import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import React, { useState } from "react"
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
			transition={{ duration: 0.3, ease: "linear" }}
			className={clsx(
				"bg-white/3 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl h-fit",
				"lg:col-span-3",
				isDimmed ? "opacity-0 pointer-events-none" : "opacity-100",
			)}
		>
			<div className="relative w-full h-48 sm:h-56 md:h-44 lg:h-40 xl:h-48 bg-neutral-900">
				{film.poster_url && (
					<div className="absolute inset-0 w-full h-full overflow-hidden aspect-video">
						<SiteImage
							src={`${IMAGE_URL}/${film.poster_url}`}
							alt={`${film.name} thumb`}
							className="w-full h-full object-cover filter blur-[2px] brightness-[0.4] scale-105"
							width={400}
							height={225}
							containerClassName="w-full h-full"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-black/50" />
					</div>
				)}

				<div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
					{film.thumb_url && (
						<div className="relative w-20 sm:w-24 md:w-20 lg:w-20 xl:w-24 aspect-2/3 rounded-lg overflow-hidden shadow-2xl border border-white/20 shrink-0">
							<SiteImage
								src={`${IMAGE_URL}/${film.thumb_url}`}
								alt={`${film.name} poster`}
								className="w-full h-full object-cover"
								width={200}
								height={300}
								containerClassName="w-full h-full"
							/>
						</div>
					)}

					<div className="flex-1 min-w-0 mb-1">
						<h2 className="text-white font-bold text-base sm:text-lg lg:text-sm xl:text-base line-clamp-2 drop-shadow-lg">
							{film.name}
						</h2>
						{film.origin_name && (
							<p className="text-gray-400 text-xs truncate drop-shadow-lg">
								{film.origin_name}
							</p>
						)}
					</div>
				</div>
			</div>

			<div className="p-5 space-y-5">
				<div className="grid grid-cols-3 gap-2">
					{film.type && filmTypeMap[film.type] && (
						<div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
							<BookType
								size={14}
								className={clsx(
									"mx-auto mb-1",
									filmTypeMap[film.type].textColor,
								)}
							/>
							<p className="text-xs text-white font-bold">
								{filmTypeMap[film.type].label}
							</p>
							<p className="text-[10px] text-gray-500 uppercase font-medium">
								Loại
							</p>
						</div>
					)}
					{film.quality && (
						<div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
							<Film size={14} className="text-purple-400 mx-auto mb-1" />
							<p className="text-xs text-white font-bold">{film.quality}</p>
							<p className="text-[10px] text-gray-500 uppercase font-medium">
								Định dạng
							</p>
						</div>
					)}
					{film.status && filmStatusMap[film.status] && (
						<div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
							<Rss
								size={14}
								className={clsx(
									"mx-auto mb-1",
									filmStatusMap[film.status].textColor,
								)}
							/>
							<p className="text-xs text-white font-bold">
								{filmStatusMap[film.status].label}
							</p>
							<p className="text-[10px] text-gray-500 uppercase font-medium">
								Trạng thái
							</p>
						</div>
					)}
				</div>

				{hasContent && (
					<div className="space-y-3 pt-1">
						<h3 className="text-sm font-bold border-l-4 border-purple-500 pl-3 uppercase tracking-wider text-white">
							Nội dung phim
						</h3>

						<div className="relative">
							<motion.div
								layout
								animate={{ height: isExpanded ? "auto" : 72 }}
								className="overflow-hidden relative"
								transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
							>
								<div
									className="text-gray-400 leading-relaxed text-sm p-2"
									dangerouslySetInnerHTML={{ __html: film.content }}
								/>

								<AnimatePresence>
									{!isExpanded && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-transparent pointer-events-none rounded"
										/>
									)}
								</AnimatePresence>
							</motion.div>

							<button
								onClick={() => setIsExpanded(!isExpanded)}
								className="mt-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
							>
								{isExpanded ? (
									<>
										Thu gọn <ChevronUp size={14} />
									</>
								) : (
									<>
										Xem thêm <ChevronDown size={14} />
									</>
								)}
							</button>
						</div>
					</div>
				)}

				<div className="pt-4 border-t border-white/10 space-y-4">
					<h4 className="text-sm font-bold text-purple-400 uppercase tracking-wide">
						Thông tin chi tiết
					</h4>

					<div className="space-y-3 text-sm">
						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-2 text-gray-500 min-w-25">
								<Calendar size={14} />
								<span>Trạng thái:</span>
							</div>
							<span className="text-white font-medium text-right bg-purple-600/30 text-xs px-2 py-0.5 rounded border border-purple-500/30">
								{film.episode_current}
							</span>
						</div>

						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-2 text-gray-500 min-w-25">
								<LibraryBig size={14} />
								<span>Số tập:</span>
							</div>
							<span className="text-white font-medium text-right bg-purple-600/30 text-xs px-2 py-0.5 rounded border border-purple-500/30">
								{film.episode_total || "???"}
							</span>
						</div>

						{film.time && (
							<div className="flex items-center justify-between gap-4">
								<div className="flex items-center gap-2 text-gray-500 min-w-25">
									<Clock size={14} />
									<span>Thời lượng:</span>
								</div>
								<span className="text-gray-300 text-right">{film.time}</span>
							</div>
						)}

						{film.year && (
							<div className="flex items-center justify-between gap-4">
								<div className="flex items-center gap-2 text-gray-500 min-w-25">
									<CalendarDays size={14} />
									<span>Năm sản xuất:</span>
								</div>
								<span className="text-gray-300 text-right">{film.year}</span>
							</div>
						)}

						{film.country && (
							<div className="flex items-start justify-between gap-4">
								<div className="flex items-center gap-2 text-gray-500 min-w-25 mt-0.5">
									<MapPin size={14} />
									<span>Quốc gia:</span>
								</div>
								<div className="flex flex-wrap justify-end gap-1.5 max-w-50">
									{Array.isArray(film.country) ? (
										film.country.map((c, index) => (
											<span
												key={index}
												className="text-gray-300 text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-200 cursor-pointer inline-block"
											>
												{c.name}
											</span>
										))
									) : (
										<span className="text-gray-300 text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-200 cursor-pointer inline-block">
											{film.country}
										</span>
									)}
								</div>
							</div>
						)}

						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-2 text-gray-500 min-w-25">
								<Globe size={14} />
								<span>Ngôn ngữ:</span>
							</div>
							<span className="text-gray-300 text-right">{film.lang}</span>
						</div>

						{film.category && film.category.length > 0 && (
							<div className="flex flex-col gap-2 pt-1">
								<div className="flex items-center gap-2 text-gray-500">
									<Tag size={14} />
									<span>Thể loại:</span>
								</div>
								<div className="flex flex-wrap gap-1.5 pl-5">
									{film.category.map((c, index) => (
										<span
											key={`${c.id}-${index}`}
											className="bg-white/5 text-gray-300 text-[11px] px-2.5 py-0.5 rounded-full border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-200 cursor-default inline-block"
										>
											{c.name}
										</span>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default SideInfo
