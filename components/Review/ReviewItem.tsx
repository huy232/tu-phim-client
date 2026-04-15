"use client"
import { useState } from "react"
import { ThumbsUp, Eye, MoreVertical, Trash2, ShieldAlert } from "lucide-react"
import SiteImage from "../ui/site-image"
import { deleteReview, incrementHelpfulCount } from "@/services/binh-pham"
import { toast } from "sonner"
import { RATING_LEVELS } from "@/constants/reviewVote"
import clsx from "clsx"

export function ReviewItem({
	review,
	currentUserId,
	onUpdate,
}: {
	review: ReviewWithProfile
	currentUserId?: string
	onUpdate: () => void
}) {
	const [showSpoiler, setShowSpoiler] = useState(!review.is_spoiler)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [localHelpful, setLocalHelpful] = useState(review.helpful_count)
	const [isLiked, setIsLiked] = useState(false)

	const isOwner = currentUserId === review.user_id
	const level = RATING_LEVELS[review.rating - 1]

	const handleDelete = async () => {
		if (!confirm("Bạn có chắc muốn xóa bình phẩm này?")) return
		try {
			await deleteReview(review.id)
			toast.success("Đã xóa bình phẩm.")
			onUpdate()
		} catch (error) {
			toast.error("Không thể xóa lúc này.")
		}
	}

	const handleHelpful = async () => {
		if (isLiked) return
		try {
			setLocalHelpful((prev) => prev + 1)
			setIsLiked(true)
			await incrementHelpfulCount(review.id)
		} catch (error) {
			if (error instanceof Error) {
				toast.error("Lỗi khi vote hữu ích...")
			}
			setLocalHelpful((prev) => prev - 1)
			setIsLiked(false)
		}
	}

	return (
		<div
			className={clsx(
				`group relative border rounded-3xl p-2 transition-all duration-500 mb-6 overflow-hidden`,
				level.bg,
				`${level.bg} ${level.color.replace("text", "border")}/20 hover:border-current/40)`,
			)}
		>
			<div
				className={clsx(
					`absolute -right-10 -top-10 w-40 h-40 blur-[80px] opacity-10 transition-colors duration-500`,
					level.color.replace("text", "bg"),
				)}
			/>

			<div className="relative z-10">
				<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
					<div className="flex items-center gap-4 w-full">
						<div
							className={clsx(
								`p-0.5 rounded-full bg-linear-to-tr transition-all duration-500 from-gray-700 to-gray-500`,
								level.color.replace("text", "from"),
							)}
						>
							<div className="w-12 h-12 rounded-full bg-gray-950 overflow-hidden border-2 border-gray-950">
								<SiteImage
									src={review.profiles.avatar_url}
									alt={review.profiles.full_name}
									className="object-cover w-full h-full"
									width={48}
									height={48}
								/>
							</div>
						</div>
						<div>
							<h4 className="font-black text-white flex items-center gap-2 tracking-tight">
								{review.profiles.full_name}
								<span className="text-[9px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-widest">
									Lv.{review.profiles.level}
								</span>
							</h4>
							<p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
								{new Date(review.created_at).toLocaleDateString("vi-VN")}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3 w-full md:w-fit">
						<div
							className={`flex items-center gap-2 p-2 rounded-xl border backdrop-blur-md transition-all duration-500 ${level.bg} ${level.color.replace("text", "border")}/30`}
						>
							<level.icon className={clsx(`w-5 h-5`, level.color)} />
							<div className="flex flex-col leading-none w-full">
								<span className={`text-sm font-black ${level.color}`}>
									{review.rating}/10
								</span>
								<span className="text-[8px] font-bold uppercase opacity-60 tracking-tighter text-white wrap-break-word">
									{level.label}
								</span>
							</div>
						</div>

						{isOwner && (
							<div className="relative ml-auto">
								<button
									onClick={() => setIsMenuOpen(!isMenuOpen)}
									className="p-2 hover:bg-white/5 rounded-xl transition text-gray-500 hover:text-white"
								>
									<MoreVertical className="w-5 h-5" />
								</button>
								{isMenuOpen && (
									<div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
										<button
											onClick={handleDelete}
											className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 transition"
										>
											<Trash2 className="w-4 h-4" /> XÓA BÌNH PHẨM
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>

				<div className="relative mb-6">
					{review.is_spoiler && !showSpoiler ? (
						<button
							onClick={() => setShowSpoiler(true)}
							className="w-full group/spoiler bg-black/40 border-2 border-dashed border-white/5 p-8 rounded-2xl transition-all hover:border-white/20 flex flex-col items-center gap-3"
						>
							<div className="p-3 bg-orange-500/10 rounded-full text-orange-500 group-hover/spoiler:scale-110 transition-transform">
								<ShieldAlert className="w-6 h-6" />
							</div>
							<div className="text-center">
								<p className="text-sm text-gray-200 font-bold uppercase tracking-widest">
									Tiết lộ thiên cơ!
								</p>
								<p className="text-[11px] text-gray-500 mt-1 italic">
									Nội dung có thể làm hỏng trải nghiệm xem phim của bạn.
								</p>
							</div>
						</button>
					) : (
						<div className="relative">
							<p className="text-gray-300 leading-relaxed text-[15px] font-medium tracking-wide whitespace-pre-line">
								{review.content}
							</p>
						</div>
					)}
				</div>

				<div className="flex items-center gap-4 pt-5 border-t border-white/5">
					<button
						onClick={handleHelpful}
						disabled={isLiked}
						className={clsx(
							`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 border`,
							isLiked
								? "bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
								: "bg-white/5 border-transparent text-gray-500 hover:text-white hover:bg-white/10",
						)}
					>
						<ThumbsUp className={clsx(`w-4 h-4`, isLiked && "fill-blue-500")} />
						<span className="text-[11px] font-black uppercase tracking-tight">
							{localHelpful} Hữu ích
						</span>
					</button>
				</div>
			</div>
		</div>
	)
}
