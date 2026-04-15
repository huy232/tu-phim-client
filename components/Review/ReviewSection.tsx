"use client"
import { useEffect, useState, useCallback } from "react"
import { ReviewItem } from "./ReviewItem"
import { ReviewFormWrapper } from "./ReviewFormWrapper"
import { getFilmReviews } from "@/services/binh-pham"
import { useAuth } from "@/hooks/useAuth"
import { MessageSquare, Sparkles, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function ReviewSection({ film }: { film: FilmInfo }) {
	const [reviews, setReviews] = useState<ReviewWithProfile[]>([])
	const [totalCount, setTotalCount] = useState(0)
	const [loading, setLoading] = useState(true)
	const { user } = useAuth()

	const loadReviews = useCallback(async () => {
		setLoading(true)
		try {
			const res = await getFilmReviews(film._id, 1, 10)
			setReviews(res.reviews)
			setTotalCount(res.totalCount)
		} catch (error) {
			if (error instanceof Error) {
				toast.error("Lỗi khi tải bình phẩm")
				console.error("Lỗi khi tải bình phẩm:", error)
			}
		} finally {
			setLoading(false)
		}
	}, [film._id])

	useEffect(() => {
		loadReviews()
	}, [loadReviews])

	return (
		<section className="max-w-4xl mx-auto mt-8 px-4 mb-4">
			<div className="relative mb-10">
				<div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-blue-500 to-transparent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
							<MessageSquare className="w-6 h-6 text-blue-400" />
						</div>
						<h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
							Bình phẩm phim
							<span className="flex items-center justify-center bg-gray-800 text-gray-400 text-xs px-2.5 py-1 rounded-full border border-gray-700">
								{totalCount}
							</span>
						</h2>
					</div>

					<div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-800 px-3 py-1.5 rounded-full">
						<Sparkles className="w-3 h-3 text-yellow-500" />
						Community Rating
					</div>
				</div>
			</div>

			<div className="mb-12 relative">
				<div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10" />
				<ReviewFormWrapper film={film} onUpdate={loadReviews} />
			</div>

			<div className="space-y-6">
				{loading ? (
					<div className="flex flex-col items-center justify-center py-20 gap-4">
						<Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
						<p className="text-gray-500 font-medium animate-pulse">
							Đang rà soát dữ liệu...
						</p>
					</div>
				) : reviews.length > 0 ? (
					<div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
						{reviews.map((rev) => (
							<ReviewItem
								key={rev.id}
								review={rev}
								currentUserId={user?.id}
								onUpdate={loadReviews}
							/>
						))}
					</div>
				) : (
					<div className="text-center py-20 px-6 rounded-3xl border border-dashed border-gray-800 bg-gray-900/20">
						<div className="inline-flex p-4 rounded-full bg-gray-800/50 mb-4">
							<MessageSquare className="w-8 h-8 text-gray-600" />
						</div>
						<h3 className="text-white font-bold text-lg mb-1">
							Chưa có lời bình nào
						</h3>
						<p className="text-gray-500 text-sm max-w-xs mx-auto">
							Bộ phim này đang đợi những cảm nhận đầu tiên từ bạn. Hãy khai hỏa
							ngay!
						</p>
					</div>
				)}
			</div>

			{totalCount > 10 && !loading && (
				<div className="mt-10 flex justify-center">
					<button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-bold rounded-full border border-gray-700 transition-all active:scale-95 shadow-lg">
						Khám phá thêm bình phẩm
					</button>
				</div>
			)}
		</section>
	)
}
