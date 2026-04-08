"use client"
import { useEffect, useState } from "react"
import {
	MessageSquare,
	Play,
	Info,
	ThumbsUp,
	MessageCircle,
	Loader2,
	Clock,
	Calendar,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { getUserCommentHistory } from "@/services/binh-luan"
import SiteImage from "../ui/site-image"
import { IMAGE_URL } from "../../constants/index"

export default function UserComments({ userId }: { userId: string }) {
	const [comments, setComments] = useState<CommentWithProfile[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchHistory() {
			try {
				setLoading(true)
				const { data } = await getUserCommentHistory(userId)
				if (data) setComments(data as CommentWithProfile[])
			} finally {
				setLoading(false)
			}
		}
		if (userId) fetchHistory()
	}, [userId])

	if (loading)
		return (
			<div className="flex justify-center py-20">
				<Loader2 className="animate-spin text-purple-500" />
			</div>
		)

	return (
		<div className="max-w-4xl mx-auto space-y-8 py-6 px-4 md:px-0">
			{/* Header */}
			<div className="flex items-center justify-between border-b border-white/5 pb-4 px-2">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
						<MessageSquare size={20} />
					</div>
					<div>
						<h3 className="text-sm font-black uppercase tracking-widest text-white">
							Lịch sử đàm đạo
						</h3>
						<p className="text-[10px] text-zinc-500">
							Lưu trữ 20 thần thức gần nhất của đạo hữu
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-6">
				{comments.map((comment) => (
					<div
						key={comment.id}
						className="group relative overflow-hidden rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-purple-500/30 transition-all duration-500 shadow-2xl"
					>
						<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
							<div className="absolute -right-10 -top-10 w-[70%] h-[140%] opacity-[0.15] blur-sm group-hover:opacity-25 duration-700 transition-all group-hover:scale-110">
								<SiteImage
									src={`${IMAGE_URL}/${comment.film_poster}`}
									alt=""
									width={600}
									height={900}
									className="w-full h-full object-cover object-right rotate-6"
									containerClassName="w-full h-full"
								/>
							</div>
						</div>

						<div className="relative p-6 flex flex-col md:flex-row gap-8">
							{/* Thumbnail Phim */}
							<div className="relative shrink-0 flex justify-center md:block">
								<div className="relative w-32 h-48 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 group-hover:scale-105 transition-transform duration-500">
									<SiteImage
										src={`${IMAGE_URL}/${comment.film_thumbnail}`}
										alt={comment.film_title}
										width={128}
										height={192}
										className="w-full h-full object-cover"
										containerClassName="w-full h-full"
									/>
									<div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
									<div className="absolute bottom-2 left-0 right-0 flex justify-center">
										<span className="text-[8px] font-black bg-white text-black px-2 py-0.5 rounded-sm uppercase tracking-tighter">
											{comment.film_quality}
										</span>
									</div>
								</div>
							</div>

							{/* Nội dung chính */}
							<div className="flex-1 flex flex-col min-w-0">
								<div className="flex justify-between items-start gap-4 mb-3">
									<div className="min-w-0">
										<h4 className="font-black text-white text-xl md:text-2xl leading-tight truncate tracking-tight group-hover:text-purple-400 transition-colors">
											{comment.film_title}
										</h4>
										<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
											<p className="text-xs text-purple-400/80 font-bold line-clamp-1">
												{comment.film_origin_name}
											</p>
											<div className="flex items-center gap-1 text-[11px] text-zinc-500 font-medium">
												<Calendar size={12} /> {comment.film_year}
											</div>
											{comment.film_time && (
												<div className="flex items-center gap-1 text-[11px] text-zinc-500 font-medium">
													<Clock size={12} /> {comment.film_time}
												</div>
											)}
										</div>
									</div>
									<div className="shrink-0 text-[10px] text-zinc-500 font-mono bg-black/40 px-3 py-1.5 rounded-full border border-white/5 shadow-xl">
										{format(new Date(comment.created_at), "HH:mm • dd/MM", {
											locale: vi,
										})}
									</div>
								</div>

								{/* Categories & Countries */}
								<div className="flex flex-wrap gap-2 mb-4">
									{comment.film_category.map((cat) => (
										<span
											key={cat.id}
											className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 text-zinc-400 border border-white/5 uppercase tracking-tighter font-bold"
										>
											{cat.name}
										</span>
									))}
									{comment.film_country.map((country) => (
										<span
											key={country.id}
											className="text-[10px] px-2 py-0.5 rounded-lg bg-amber-300/30 text-white border border-white/5 uppercase tracking-tighter font-bold"
										>
											{country.name}
										</span>
									))}
								</div>

								{/* Tóm tắt nội dung phim (film_content) */}
								<div className="relative mb-5 group/desc">
									{/* Lớp nền "Kính mờ" (Glassmorphism) để tách biệt chữ với Poster nền */}
									<div className="absolute inset-0 bg-black/40 backdrop-blur-md -mx-3 -my-2 rounded-xl border border-white/10 shadow-inner pointer-events-none" />

									<div className="relative z-10 p-1">
										{/* Label nhỏ để người dùng biết đây là gì */}
										<div className="flex items-center gap-1.5 mb-1 opacity-50">
											<div className="w-1 h-3 bg-purple-500 rounded-full" />
											<span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
												Tóm lược
											</span>
										</div>

										<div
											className="text-[12px] text-zinc-100 leading-relaxed line-clamp-2 italic font-medium"
											style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
										>
											<span
												dangerouslySetInnerHTML={{
													__html: comment.film_content || "",
												}}
												className="[&_p]:inline [&_br]:hidden"
											/>
										</div>
									</div>
								</div>

								{/* Bong bóng nội dung bình luận của USER */}
								<div className="relative bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors rounded-2xl p-4 mb-6 border border-purple-500/10 shadow-inner">
									<p className="text-sm md:text-base text-zinc-200 font-medium leading-relaxed">
										{comment.content}
									</p>
									{comment.is_spoiler && (
										<span className="absolute -top-2 left-4 text-[8px] font-black bg-red-600 text-white px-2 py-0.5 rounded-full shadow-lg border border-red-400 uppercase tracking-widest">
											Tiết lộ nội dung
										</span>
									)}
								</div>

								{/* Footer Actions */}
								<div className="mt-auto flex items-center justify-between pt-2 border-t border-white/5">
									<div className="flex items-center gap-6">
										<div className="flex items-center gap-1.5 text-zinc-500 group/like">
											<ThumbsUp
												size={14}
												className={
													comment.likes_count > 0
														? "text-orange-500"
														: "group-hover/like:text-zinc-300"
												}
											/>
											<span className="text-xs font-bold">
												{comment.likes_count}
											</span>
										</div>
										<div className="flex items-center gap-1.5 text-zinc-500 group/reply">
											<MessageCircle
												size={14}
												className={
													comment.replies_count > 0
														? "text-purple-500"
														: "group-hover/reply:text-zinc-300"
												}
											/>
											<span className="text-xs font-bold">
												{comment.replies_count}
											</span>
										</div>
									</div>

									<div className="flex gap-3">
										<Link
											href={`/thong-tin/${comment.film_slug}`}
											className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold transition-all border border-white/5 active:scale-95"
										>
											<Info size={14} /> Chi tiết
										</Link>
										<Link
											href={`/xem-phim/${comment.film_slug}`}
											className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition-all shadow-[0_10px_20px_rgba(147,51,234,0.3)] active:scale-95"
										>
											<Play size={14} fill="currentColor" /> XEM NGAY
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
