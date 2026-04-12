"use client"
import { motion } from "framer-motion"
import {
	Calendar,
	Layers,
	Globe,
	Ticket,
	ShieldCheck,
	Gem,
	RefreshCcw,
	Plus,
	Languages,
	ArrowRight,
} from "lucide-react"
import { filmTypeMap, formatCurrency, TMDB_TRANSLATIONS } from "@/constants"
import { languageNames } from "@/utilities"
import clsx from "clsx"
import { TimelineItem } from "./TimelineItem"
import { BadgeStatus } from "./BadgeStatus"

const StatCard = ({
	children,
	className = "",
}: {
	children: React.ReactNode
	className?: string
}) => (
	<motion.div
		variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
		className={clsx(
			"bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors",
			className,
		)}
	>
		{children}
	</motion.div>
)

const ExtraTMDBContent = ({
	tmdbData,
	film,
}: {
	tmdbData: TMDBData | null
	film: FilmInfo
}) => {
	if (!tmdbData) return null

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			transition={{ staggerChildren: 0.05 }}
			className="mt-8 space-y-6"
		>
			<div className="flex items-center justify-between px-1">
				<h2 className="text-sm font-black uppercase text-white/50 tracking-[0.2em] flex items-center gap-2">
					<span className="w-8 h-px bg-purple-500/50" />
					Thông tin mở rộng
				</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="space-y-4">
					<StatCard className="flex flex-col justify-center gap-4">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-purple-500/20 rounded-xl text-purple-400 shrink-0">
								<Layers size={20} />
							</div>
							<div>
								<p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
									Quy mô
								</p>
								<div className="text-white font-black flex items-baseline gap-1">
									{tmdbData.number_of_seasons ? (
										<>
											<span className="text-lg">
												{tmdbData.number_of_seasons}
											</span>
											<span className="text-[10px] text-gray-400">Mùa</span>
											<span className="mx-2 text-gray-700">/</span>
											<span className="text-lg">
												{tmdbData.number_of_episodes}
											</span>
											<span className="text-[10px] text-gray-400">Tập</span>
										</>
									) : (
										<div className="flex flex-col">
											<div className="flex items-center gap-1">
												<span className="text-[10px] text-gray-500 w-12">
													Kinh phí:
												</span>
												<span className="text-sm text-emerald-400">
													{formatCurrency(tmdbData.budget)}
												</span>
											</div>
											<div className="flex items-center gap-1">
												<span className="text-[10px] text-gray-500 w-12">
													Doanh thu:
												</span>
												<span className="text-sm text-amber-400">
													{formatCurrency(tmdbData.revenue)}
												</span>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 shrink-0">
								<Calendar size={20} />
							</div>
							<div>
								<p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
									{tmdbData.first_air_date ? "Hành trình" : "Thông tin chiếu"}
								</p>
								<div className="text-white font-black text-sm">
									{tmdbData.first_air_date ? (
										/* Phim Bộ */
										<>
											{new Date(tmdbData.first_air_date).getFullYear()}
											{" — "}
											{tmdbData.status === "Ended"
												? new Date(tmdbData.last_air_date).getFullYear()
												: "Nay"}
										</>
									) : (
										/* Phim Lẻ */
										<div className="flex items-center gap-2">
											<span>
												{new Date(tmdbData?.release_date).getFullYear() ||
													"????"}
											</span>
										</div>
									)}
								</div>
							</div>
						</div>
					</StatCard>

					<StatCard className="grid grid-cols-2 gap-2 p-3">
						<BadgeStatus
							active={film.chieurap}
							icon={Ticket}
							label="Chiếu rạp"
							activeText="Có"
							inactiveText="Không có"
							theme="green"
						/>
						<BadgeStatus
							active={film.is_copyright}
							icon={ShieldCheck}
							label="Bản quyền"
							activeText="Chính thức"
							inactiveText="Hợp tác"
							theme="blue"
						/>
					</StatCard>
				</div>

				<div className="space-y-4">
					<StatCard className="h-full flex flex-col justify-between relative overflow-hidden group">
						<Gem className="absolute -right-4 -bottom-4 w-24 h-24 text-purple-500/10 rotate-12 group-hover:scale-110 transition-transform" />

						<div>
							<div className="flex justify-between items-start">
								<div
									className={clsx(
										"p-3 rounded-xl transition-all duration-500",
										film.sub_docquyen
											? "bg-amber-500/20 text-amber-400"
											: "bg-white/5 text-gray-600",
									)}
								>
									<Gem size={20} />
								</div>

								<motion.span
									animate={
										film.sub_docquyen
											? { scale: [1, 1.1, 1], opacity: 1 }
											: { scale: 1, opacity: 0.3 }
									}
									transition={
										film.sub_docquyen ? { repeat: Infinity, duration: 2 } : {}
									}
									className={clsx(
										"text-[9px] px-2 py-0.5 rounded-full font-black uppercase border transition-all duration-500",
										film.sub_docquyen
											? "bg-amber-500 text-black border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
											: "bg-transparent text-gray-600 border-white/10",
									)}
								>
									{film.sub_docquyen ? "Vietsub Độc quyền" : "Phổ thông"}
								</motion.span>
							</div>
							{tmdbData.tagline && (
								<>
									<h3 className="text-white font-black mt-4 text-base tracking-tight">
										Tagline
									</h3>
									<p className="text-sm text-gray-300 italic font-medium leading-relaxed border-l-2 border-purple-500 pl-3">
										{tmdbData.tagline}
									</p>
								</>
							)}
						</div>

						<div className="mt-4 pt-4 border-t border-white/5 space-y-2">
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-3 mt-4">
									<div>
										<p className="text-[10px] text-gray-500 uppercase font-bold">
											Phân loại
										</p>
										<p className="text-xs text-white font-bold">
											{TMDB_TRANSLATIONS[tmdbData.type] ||
												tmdbData.type ||
												filmTypeMap[film.type].label}
										</p>
									</div>
									<div>
										<p className="text-[10px] text-gray-500 uppercase font-bold">
											Trạng thái
										</p>
										<p className="text-xs text-purple-400 font-bold">
											{TMDB_TRANSLATIONS[tmdbData.status] || tmdbData.status}
										</p>
									</div>
								</div>
							</div>

							{/* Ngôn ngữ */}
							<div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
								<div className="flex gap-1 items-center">
									<Languages size={16} className="text-gray-500" />{" "}
									<span className="text-[10px] text-gray-500 uppercase font-bold">
										Tiếng gốc:
									</span>
								</div>
								<div className="flex flex-wrap gap-1">
									{tmdbData.spoken_languages?.map((lang) => (
										<span
											key={lang.iso_639_1}
											className="text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/10 text-gray-300"
										>
											{languageNames.of(lang.iso_639_1) ||
												lang.english_name ||
												lang.name}
										</span>
									))}
								</div>
							</div>
						</div>
					</StatCard>
				</div>

				{/* CỘT 3: Timeline & Link (Dạng Card đứng) */}
				<div className="space-y-4">
					<StatCard className="space-y-4">
						<TimelineItem
							icon={Calendar}
							label="Ngày khởi chiếu"
							date={tmdbData.first_air_date || tmdbData.release_date || null}
							colorClass="text-blue-400"
						/>
						<TimelineItem
							icon={Plus}
							label="Được đăng trên trang"
							date={film.created?.time}
							colorClass="text-green-500"
						/>
						<TimelineItem
							icon={RefreshCcw}
							label="Được cập nhật lần cuối"
							date={film.modified?.time}
							colorClass="text-orange-400"
						/>
					</StatCard>

					{tmdbData.homepage && (
						<motion.a
							variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
							href={tmdbData.homepage}
							target="_blank"
							className="flex items-center justify-between bg-purple-600 hover:bg-purple-500 p-4 rounded-2xl text-white transition-all group active:scale-95"
						>
							<div className="flex items-center gap-3">
								<Globe size={18} className="animate-pulse" />
								<span className="text-xs font-bold uppercase tracking-wider">
									Website chính thức
								</span>
							</div>
							<motion.div
								animate={{ x: [0, 5, 0] }}
								transition={{ repeat: Infinity, duration: 1.5 }}
							>
								<ArrowRight size={16} />
							</motion.div>
						</motion.a>
					)}
				</div>
			</div>
		</motion.div>
	)
}

export default ExtraTMDBContent
