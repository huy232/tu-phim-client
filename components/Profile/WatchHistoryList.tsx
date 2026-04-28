"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
	Clock,
	Play,
	ChevronLeft,
	ChevronRight,
	Trash2,
	Info,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { getGlobalWatchHistory } from "@/services/lich-su"
import { filmVoiceType, IMAGE_URL } from "@/constants"

export default function WatchHistoryList() {
	const [history, setHistory] = useState<HistoryItem[]>([])
	const [page, setPage] = useState(1)
	const [totalCount, setTotalCount] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const limit = 12

	useEffect(() => {
		const fetchHistory = async () => {
			setIsLoading(true)
			const response = await getGlobalWatchHistory(page, limit)

			const data = (response.data as unknown as HistoryItem[]) || []

			setHistory(data)
			setTotalCount(response.count)
			setIsLoading(false)
		}
		fetchHistory()
	}, [page])

	const totalPages = Math.ceil(totalCount / limit)

	return (
		<section className="w-full max-w-7xl mx-auto py-8 px-4">
			<div className="flex items-center justify-between mb-8 border-l-4 border-purple-600 pl-4">
				<h2 className="text-2xl font-bold text-white tracking-widest uppercase">
					Lịch sử đã xem
				</h2>
				<span className="text-zinc-500 text-sm">
					Tổng cộng: {totalCount} bộ phim
				</span>
			</div>

			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="aspect-video bg-white/5 animate-pulse rounded-xl border border-white/10"
						/>
					))}
				</div>
			) : history.length === 0 ? (
				<div className="w-full py-20 flex flex-col items-center justify-center text-center">
					<span className="text-4xl mb-4">📭</span>
					<h3 className="text-lg text-zinc-300 font-semibold">
						Chưa có lịch sử xem
					</h3>
					<p className="text-sm text-zinc-500 mt-2 max-w-sm">
						Bạn chưa xem phim nào cả. Bắt đầu cày ngay để tụi mình lưu lại hành
						trình tu phim nhé 👀
					</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
						<AnimatePresence mode="popLayout">
							{history.map((item: HistoryItem) => {
								const [sid, svt] = item.last_server_key?.split("_") || ["", ""]
								const watchHref = `/xem-phim/${item.films.slug}?ep=${item.last_episode_slug}&sid=${sid}&svt=${svt}`
								const infoHref = `/thong-tin/${item.films.slug}`

								return (
									<motion.div
										key={item.films.slug}
										layout
										className="group relative bg-[#0a0a0a] rounded-2xl transition-all duration-500 flex flex-col h-full"
									>
										<div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
											<Image
												src={`${IMAGE_URL}/${item.films.poster_url}`}
												alt={item.last_episode_name}
												fill
												className="object-cover transition-transform duration-700 group-hover:scale-110"
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
											<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-black/20 to-transparent" />

											<Link
												href={watchHref}
												className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
											>
												<div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)]">
													<Play fill="white" size={24} className="ml-1" />
												</div>
											</Link>
										</div>

										<div className="relative px-4 -mt-10 flex gap-4 flex-1">
											<div className="relative w-20 sm:w-24 aspect-2/3 shrink-0 rounded-lg overflow-hidden border-2 border-[#0a0a0a] shadow-[0_8px_20px_rgba(0,0,0,0.8)] z-10 bg-[#121212]">
												<Image
													src={`${IMAGE_URL}/${item.films.thumb_url}`}
													alt={item.films.name}
													fill
													sizes="(max-width: 640px) 80px, 96px"
													className="object-cover"
												/>
											</div>

											<div className="flex-1 min-w-0 pt-12 pb-4 flex flex-col justify-between">
												<div>
													<div className="flex justify-between items-start gap-2">
														<Link href={infoHref} className="min-w-0 flex-1">
															<h3 className="text-base font-bold text-zinc-100 truncate group-hover:text-purple-400 transition-colors">
																{item.films.name}
															</h3>
														</Link>
														<Link
															href={infoHref}
															className="p-1 text-zinc-500 hover:text-purple-400 transition-colors shrink-0"
														>
															<Info size={16} />
														</Link>
													</div>

													<p className="mt-1 text-xs text-purple-300 font-medium truncate">
														Tập {item.last_episode_name} •{" "}
														<span className="uppercase text-[10px] opacity-70">
															{filmVoiceType[svt].label}
														</span>
													</p>
												</div>

												<div className="mt-3 flex items-center justify-between gap-2">
													<p className="text-[10px] text-zinc-500 flex items-center gap-1 shrink-0">
														<Clock size={10} />
														{formatDistanceToNow(
															new Date(item.last_watched_at),
															{
																addSuffix: true,
																locale: vi,
															},
														)}
													</p>
													<Link
														href={watchHref}
														className="text-[10px] font-bold bg-purple-600/10 hover:bg-purple-600 text-purple-400 hover:text-white px-3 py-1.5 rounded-lg transition-all border border-purple-600/30 whitespace-nowrap"
													>
														Tiếp tục
													</Link>
												</div>
											</div>
										</div>

										<div className="absolute -inset-px rounded-2xl border border-white/5 group-hover:border-purple-500/20 transition-all -z-10" />
									</motion.div>
								)
							})}
						</AnimatePresence>
					</div>

					{totalPages > 1 && (
						<div className="mt-12 flex justify-center items-center gap-4">
							<button
								disabled={page === 1}
								onClick={() => setPage((p) => p - 1)}
								className="p-2 rounded-full border border-white/10 hover:bg-purple-600/20 disabled:opacity-30 transition-all"
							>
								<ChevronLeft size={24} />
							</button>

							<div className="flex gap-2">
								{[...Array(totalPages)].map((_, i) => (
									<button
										key={i}
										onClick={() => setPage(i + 1)}
										className={`w-10 h-10 rounded-lg font-bold transition-all ${
											page === i + 1
												? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
												: "bg-white/5 text-zinc-500 hover:bg-white/10"
										}`}
									>
										{i + 1}
									</button>
								))}
							</div>

							<button
								disabled={page === totalPages}
								onClick={() => setPage((p) => p + 1)}
								className="p-2 rounded-full border border-white/10 hover:bg-purple-600/20 disabled:opacity-30 transition-all"
							>
								<ChevronRight size={24} />
							</button>
						</div>
					)}
				</>
			)}
		</section>
	)
}
