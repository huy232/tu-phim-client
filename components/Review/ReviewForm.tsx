"use client"
import { useMemo, useState } from "react"
import { Send, Loader2, Info } from "lucide-react"
import { toast } from "sonner"
import { submitReviewAction } from "@/app/actions/review-action"
import { RATING_LEVELS } from "@/constants/reviewVote"

export function ReviewForm({
	film,
	userId,
	onUpdate,
}: {
	film: FilmInfo
	userId: string
	onUpdate: () => Promise<void>
}) {
	const [rating, setRating] = useState(0)
	const [hover, setHover] = useState(0)
	const [content, setContent] = useState("")
	const [isSpoiler, setIsSpoiler] = useState(false)
	const [loading, setLoading] = useState(false)

	const activeLevel = useMemo(() => {
		const index = (hover || rating) - 1
		return RATING_LEVELS[index] || null
	}, [hover, rating])

	const handleSubmit = async () => {
		if (rating === 0) return toast.warning("Chọn một cấp độ cảm xúc!")
		setLoading(true)
		try {
			await submitReviewAction({
				film,
				userId,
				rating,
				content,
				is_spoiler: isSpoiler,
			})
			await onUpdate()
			toast.success("Khắc bia thành công!")
			setContent("")
			setRating(0)
			setIsSpoiler(false)
		} catch (error) {
			toast.error("Thiên cơ bị nhiễu, hãy thử lại!")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="relative group bg-gray-900/40 border border-gray-800 p-1 rounded-[2.5rem] transition-all duration-500 hover:border-blue-500/30 overflow-hidden shadow-2xl">
			<div
				className={`absolute -top-20 -right-20 w-64 h-64 blur-[100px] transition-colors duration-700 opacity-20 ${activeLevel ? activeLevel.bg : "bg-transparent"}`}
			/>

			<div className="bg-gray-950/60 backdrop-blur-2xl p-8 rounded-[calc(2.5rem-4px)]">
				<div className="flex flex-col items-center justify-center mb-10">
					<div
						className={`mb-3 p-4 rounded-3xl transition-all duration-500 transform ${activeLevel ? `${activeLevel.bg} ${activeLevel.color} scale-110 rotate-3` : "bg-gray-900 text-gray-700"}`}
					>
						{activeLevel ? (
							<activeLevel.icon className="w-10 h-10 animate-in zoom-in duration-300" />
						) : (
							<Info className="w-10 h-10 opacity-20" />
						)}
					</div>
					<h4
						className={`text-center md:text-left text-2xl font-black italic tracking-tighter uppercase transition-all duration-300 ${activeLevel ? activeLevel.color : "text-gray-700"}`}
					>
						{activeLevel ? activeLevel.label : "Định phẩm phim này"}
					</h4>
					<p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] mt-1">
						THANG ĐIỂM: {hover || rating || 0}/10
					</p>
				</div>

				<div className="flex items-center justify-center gap-8 md:gap-2 mb-10 flex-wrap">
					{RATING_LEVELS.map((level, i) => {
						const val = i + 1
						const isSelected = val <= rating
						const isActive = val <= (hover || rating)
						return (
							<button
								key={i}
								onMouseEnter={() => setHover(val)}
								onMouseLeave={() => setHover(0)}
								onClick={() => setRating(val)}
								className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group/btn border-2 ${
									isActive
										? `${level.color} ${level.bg} border-current scale-110 z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]`
										: "bg-gray-900 border-gray-800 text-gray-600 grayscale hover:grayscale-0 hover:border-gray-600"
								}`}
							>
								<level.icon
									className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${isSelected ? "animate-bounce" : "group-hover/btn:scale-110"}`}
								/>
								<span className="absolute -bottom-6 text-[9px] font-bold opacity-40">
									{val}
								</span>
							</button>
						)
					})}
				</div>

				<div className="space-y-4">
					<textarea
						className="w-full bg-gray-900/50 border-2 border-gray-800 rounded-xl p-2 text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/40 transition-all resize-none min-h-30 text-[12px]"
						placeholder={`Bạn thấy "${film.name}" thế nào...`}
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>

					<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
						<label className="flex items-center gap-4 cursor-pointer group/spoiler">
							<div className="relative">
								<input
									type="checkbox"
									className="sr-only"
									checked={isSpoiler}
									onChange={(e) => setIsSpoiler(e.target.checked)}
								/>
								<div
									className={`w-12 h-6 rounded-full transition-colors ${isSpoiler ? "bg-orange-500" : "bg-gray-800"}`}
								/>
								<div
									className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isSpoiler ? "left-7" : "left-1"}`}
								/>
							</div>
							<span
								className={`text-xs font-black uppercase tracking-widest ${isSpoiler ? "text-orange-400" : "text-gray-600"}`}
							>
								Tiết lộ thiên cơ
							</span>
						</label>

						<button
							onClick={handleSubmit}
							disabled={loading || !content.trim() || rating === 0}
							className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black hover:bg-blue-400 px-10 py-4 rounded-2xl font-black uppercase tracking-tighter transition-all disabled:opacity-20 active:scale-95 shadow-xl shadow-white/5"
						>
							{loading ? (
								<Loader2 className="w-5 h-5 animate-spin" />
							) : (
								<>
									<span>Chốt hạ</span> <Send className="w-4 h-4" />
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
