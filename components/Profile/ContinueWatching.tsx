"use client"
import Link from "next/link"
import { Play, Globe, Tag, Clock, Calendar } from "lucide-react"
import { IMAGE_URL } from "@/constants"
import SiteImage from "../ui/site-image"
import { formatFullTime } from "@/utilities"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

interface ContinueWatchingProps {
	initialContinueWatching: UserProgress[]
}

export default function ContinueWatching({
	initialContinueWatching,
}: ContinueWatchingProps) {
	if (!initialContinueWatching || initialContinueWatching.length === 0)
		return null

	return (
		<div className="space-y-8">
			{/* HEADER */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
						<Play size={20} className="text-purple-500 fill-purple-500" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-white tracking-tight uppercase">
							Vừa Xem Xong
						</h3>
						<p className="text-[11px] text-zinc-500 uppercase tracking-widest">
							Tiếp tục hành trình tu phim
						</p>
					</div>
				</div>
			</div>

			{/* GRID LIST */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
				{initialContinueWatching.map((item) => (
					<Link
						href={`/xem-phim/${item.film.slug}${item.episode_slug ? `?ep=${item.episode_slug}` : ""}`}
						key={item.id}
						className="group flex flex-col"
					>
						{/* POSTER SECTION */}
						<div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 shadow-xl">
							<SiteImage
								src={`${IMAGE_URL}/${item.film.poster_url || item.film.thumb_url}`}
								alt={item.film.name}
								className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
								height={450}
								width={300}
							/>

							{/* Progress Bar */}
							<div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/40 backdrop-blur-sm">
								<div
									className="h-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
									style={{ width: `${item.percent_complete}%` }}
								/>
							</div>

							{/* Top Badge: Quality & Updated At */}
							<div className="absolute top-2 left-2 flex flex-col gap-1">
								<span className="bg-purple-600 text-[9px] text-white px-2 py-0.5 rounded-md font-bold shadow-lg w-fit uppercase">
									{item.film.quality}
								</span>
								{/* Hiển thị thời gian cập nhật nhỏ trên Poster */}
								<span className="bg-black/60 backdrop-blur-md text-[9px] text-zinc-300 px-2 py-0.5 rounded-md border border-white/10 w-fit flex items-center gap-1">
									<Clock size={8} />
									{formatDistanceToNow(new Date(item.updated_at), {
										addSuffix: true,
										locale: vi,
									})}
								</span>
							</div>
						</div>

						{/* CONTENT SECTION */}
						<div className="mt-4 space-y-3">
							{/* Name & Origin Name */}
							<div>
								<h4 className="text-[14px] font-bold text-zinc-100 line-clamp-1 group-hover:text-purple-400 transition-colors">
									{item.film.name}
								</h4>
								<div className="flex items-center gap-2 mt-0.5">
									<p className="text-[11px] text-zinc-500 italic line-clamp-1">
										{item.film.origin_name}
									</p>
									<span className="text-zinc-700 text-[10px]">•</span>
									<span className="text-[10px] text-zinc-500">
										{item.film.year}
									</span>
								</div>
							</div>

							{/* EPISODE & TIME BOX */}
							<div className="flex flex-col gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
								<div className="flex items-center justify-between">
									<span className="text-[10px] font-black text-purple-400 uppercase tracking-tighter">
										Tập {item.episode_name}
									</span>
									<span className="text-[9px] font-mono text-zinc-500">
										{formatFullTime(item.current_time_seconds)} /{" "}
										{formatFullTime(item.duration_seconds)}
									</span>
								</div>
								{/* Dòng hiển thị ngày cụ thể bên dưới số tập */}
								<div className="flex items-center gap-1 text-[9px] text-zinc-500 border-t border-white/5 pt-1.5">
									<Calendar size={10} />
									<span>
										Xem lần cuối:{" "}
										{new Date(item.updated_at).toLocaleDateString("vi-VN")}
									</span>
								</div>
							</div>

							{/* TAGS SECTION - Tách biệt Category và Country */}
							<div className="space-y-2">
								{/* Categories */}
								<div className="flex flex-wrap gap-1">
									{item.film.category.slice(0, 2).map((cat) => (
										<span
											key={cat.id}
											className="text-[9px] text-purple-300/70 bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10 flex items-center gap-1"
										>
											<Tag size={8} /> {cat.name}
										</span>
									))}
								</div>

								{/* Countries */}
								<div className="flex flex-wrap gap-1">
									{item.film.country.map((c) => (
										<span
											key={c.id}
											className="text-[9px] text-zinc-500 bg-zinc-900/50 px-2 py-0.5 rounded flex items-center gap-1 border border-transparent hover:border-zinc-700 transition-colors"
										>
											<Globe size={8} /> {c.name}
										</span>
									))}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
