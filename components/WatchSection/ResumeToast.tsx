import { formatTime } from "@/utilities"
import clsx from "clsx"
import { useState, useEffect, useCallback } from "react"
import { Play, X } from "lucide-react"

interface ResumeToastProps {
	history: HistoryProgress
	onResume: () => void
	onClose: () => void
}

export const ResumeToast = ({
	history,
	onResume,
	onClose,
}: ResumeToastProps) => {
	const [countdown, setCountdown] = useState(10)
	const [isHovering, setIsHovering] = useState(false)
	const [isExiting, setIsExiting] = useState(false)

	const strokeDasharray = 100.5

	const handleStartExit = useCallback(() => {
		setIsExiting(true)
	}, [])

	useEffect(() => {
		if (isExiting) {
			const timer = setTimeout(onClose, 480)
			return () => clearTimeout(timer)
		}
	}, [isExiting, onClose])

	useEffect(() => {
		if (isHovering || isExiting) return
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					setIsExiting(true)
					return 0
				}
				return prev - 1
			})
		}, 1000)
		return () => clearInterval(timer)
	}, [isHovering, isExiting])

	return (
		<div
			className={clsx(
				"absolute top-6 right-6 z-50 transition-all duration-500",
				isExiting
					? "opacity-0 translate-x-10 scale-95"
					: "animate-in slide-in-from-right fade-in",
			)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<div className="bg-zinc-950/90 border border-purple-500/30 p-2 pl-4 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.2)] flex items-center gap-4 backdrop-blur-2xl min-w-[280px]">
				{/* Left: Info */}
				<div className="flex flex-col flex-1 min-w-0">
					<div className="flex items-center gap-1.5 leading-none">
						<span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
							Xem tiếp
						</span>
						<span className="text-[10px] text-zinc-500 font-mono">
							{formatTime(history.current_time_seconds)}
						</span>
					</div>
					<h4 className="text-[13px] text-white font-semibold truncate mt-0.5">
						Tập {history.episode_slug}
					</h4>
				</div>

				{/* Right: Actions */}
				<div className="flex items-center gap-1">
					{/* Nút Close (Bỏ qua) */}
					<button
						onClick={handleStartExit}
						className="p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-white/5"
					>
						<X size={16} strokeWidth={2.5} />
					</button>

					<button
						onClick={onResume}
						className="relative flex items-center justify-center w-10 h-10 group active:scale-95 transition-transform"
					>
						<svg
							viewBox="0 0 40 40"
							className="w-full h-full transform -rotate-90 absolute inset-0 z-0"
						>
							<circle
								cx="20"
								cy="20"
								r="16"
								stroke="currentColor"
								strokeWidth="2.5"
								fill="transparent"
								className="text-white/5"
							/>
							<circle
								cx="20"
								cy="20"
								r="16"
								stroke="currentColor"
								strokeWidth="2.5"
								fill="transparent"
								strokeDasharray={strokeDasharray}
								strokeDashoffset={
									strokeDasharray - (strokeDasharray * countdown) / 10
								}
								strokeLinecap="round"
								className="text-purple-400 transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(168,85,247,0.5)]"
							/>
						</svg>

						<div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-900/40 group-hover:bg-purple-500 transition-colors relative z-10">
							<Play size={14} fill="currentColor" className="ml-0.5" />
						</div>
					</button>
				</div>
			</div>
		</div>
	)
}
