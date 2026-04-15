"use client"
import clsx from "clsx"
import FadeVideo from "../FadeVideo"
import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

function NewestSeriesHeading() {
	return (
		<div className="flex items-center gap-4 group cursor-default mt-6 mx-auto px-4">
			<div className="h-10 w-1.5 bg-linear-to-b from-purple-500 to-blue-600 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-y-125 transition-transform duration-500" />
			<div className="flex flex-col">
				<h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none">
					<span className="bg-clip-text text-transparent bg-linear-to-r from-white via-purple-100 to-purple-400 drop-shadow-sm">
						Cực Phẩm Phim Bộ
					</span>
					<span className="ml-3 text-lg md:text-xl font-extralight text-white/30 italic tracking-wide">
						/ Mới Lên Kệ
					</span>
				</h2>
				<div className="h-px w-0 group-hover:w-full bg-linear-to-r from-purple-500/50 to-transparent transition-all duration-1000 mt-1" />
			</div>
		</div>
	)
}

function AddictionSeriesHeading() {
	return (
		<div className="relative group cursor-default py-4 flex flex-col items-center justify-center overflow-hidden w-full">
			<div
				className="absolute inset-0 opacity-40"
				style={{
					background:
						"linear-gradient(to right, transparent 0%, rgba(168,85,247,0.2) 40%, rgba(168,85,247,0.2) 60%, transparent 100%)",
				}}
			/>

			<div
				className="absolute inset-0"
				style={{
					background: `
                linear-gradient(to right, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%),
                linear-gradient(to bottom, #0a0a0a 0%, transparent 40%, transparent 60%, #0a0a0a 100%)
            `,
					backgroundBlendMode: "color",
				}}
			/>

			<div className="absolute inset-0 backdrop-blur-[2px] mask-[radial-gradient(ellipse_at_center,transparent_50%,black_100%)] pointer-events-none" />

			<h2 className="relative flex flex-col items-center">
				<span className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-purple-400 mb-1 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
					Lọt hố rồi!
				</span>

				<div className="relative">
					<span className="absolute inline-block px-2 -mx-2 py-2 my-2 -inset-1 text-2xl md:text-5xl font-black uppercase blur-sm text-purple-900/50 select-none">
						Top 10 series gây nghiện
					</span>

					<span className="relative inline-block px-2 -mx-2 py-2 my-2 text-2xl md:text-5xl font-black uppercase bg-clip-text text-transparent bg-linear-to-b from-white via-purple-200 to-purple-600 italic">
						Top 10 series gây nghiện
					</span>
				</div>

				<span className="mt-2 px-4 py-0.5 bg-purple-600 text-white text-[10px] font-black uppercase -skew-x-12 shadow-[4px_4px_0px_#3b0764]">
					Cực nặng
				</span>
			</h2>
		</div>
	)
}

function NewestSingleHeading() {
	return (
		<div className="flex items-center justify-end gap-4 group cursor-default mt-6 px-4">
			<div className="text-right flex flex-col items-end">
				<h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white flex items-center gap-3">
					<span className="relative flex h-5 items-center justify-center rounded-sm bg-red-500/10 px-2 text-[10px] font-bold text-red-500 border border-red-500/20 overflow-hidden">
						<span className="relative z-10">NEW</span>
						<span className="absolute inset-0 bg-red-500/20 animate-pulse" />
					</span>
					Kho Phim Điện Ảnh
				</h2>
				<p className="text-[10px] md:text-xs text-white/40 font-medium tracking-[0.3em] uppercase mt-1.5 flex items-center gap-2">
					Vừa cập bến
					<span className="h-1 w-1 rounded-full bg-orange-500/50" />
				</p>
			</div>

			<div className="h-12 w-1.5 bg-linear-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.4)] group-hover:rotate-12 transition-all duration-500" />
		</div>
	)
}

function TopPeakSingleHeading() {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className="group cursor-default pb-2 flex flex-col items-end md:mr-10 relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="flex items-center gap-3 mb-2 transition-all duration-500 group-hover:-translate-y-1 z-20">
				<div className="h-0.5 w-12 bg-linear-to-r from-transparent to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
				<span className="text-amber-500 font-black italic text-lg md:text-xl tracking-tighter drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]">
					ĐỈNH CỦA CHÓP
				</span>
			</div>

			<div className="relative z-10 flex flex-col items-end">
				<span
					className="absolute -top-12 -left-16 md:-left-24 text-7xl md:text-9xl font-black italic select-none pointer-events-none z-0 opacity-10 transition-opacity duration-700 group-hover:opacity-20"
					style={{
						WebkitTextStroke: "1px rgba(255,255,255,0.5)",
						color: "transparent",
					}}
				>
					TOP 10
				</span>

				<h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-[1.7] text-right relative z-10">
					<span className="inline-block bg-clip-text text-transparent bg-linear-to-br from-white via-slate-100 to-slate-400 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
						Phim Lẻ
					</span>
					<span className="inline-block ml-3 bg-clip-text text-transparent bg-linear-to-br from-amber-300 via-amber-500 to-yellow-600 filter drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
						Hay Nhất
					</span>
				</h2>
			</div>

			<div className="mt-2 flex flex-col items-end gap-2 z-20 group">
				<div className="flex items-center gap-2">
					<span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
						Nhiệt độ phim
					</span>

					<div className="text-[10px] font-black text-amber-500 w-8 h-4 relative flex items-center overflow-hidden">
						<AnimatePresence mode="wait">
							<motion.span
								key={isHovered ? "100" : "85"}
								initial={{ y: 10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -10, opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="absolute"
							>
								{isHovered ? "100%" : "85%"}
							</motion.span>
						</AnimatePresence>
					</div>
				</div>

				<div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden p-px border border-white/5">
					<motion.div
						animate={{ width: isHovered ? "100%" : "85%" }}
						transition={{ duration: 1, ease: "easeOut" }}
						className="h-full bg-linear-to-r from-amber-600 via-yellow-400 to-amber-300 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]"
					/>
				</div>
			</div>
		</div>
	)
}

function NewestTVShowsHeading() {
	return (
		<div className="flex items-center justify-start gap-3 group cursor-default mt-4">
			<div className="relative flex h-3 w-3">
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
				<span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
			</div>

			<div className="flex flex-col">
				<h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">
					<span className="text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
						TV Show
					</span>
					<span className="ml-3 bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-500 not-italic">
						Giây phút giải trí
					</span>
				</h2>
				<div className="h-0.5 w-0 group-hover:w-full bg-linear-to-r from-cyan-500 to-transparent transition-all duration-500" />
			</div>
		</div>
	)
}

function MainAnimateHeadingSection() {
	return (
		<div className="flex items-center justify-center gap-4 group cursor-default mt-6">
			<h2 className="text-2xl md:text-3xl font-black tracking-tight text-center leading-tight uppercase">
				<span className="text-white/90 leading-relaxed">Đắm mình vào</span>{" "}
				<span className="block mt-1 bg-clip-text text-transparent bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] leading-relaxed">
					thế giới{" "}
					<span className="relative bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-[shine_3s_linear_infinite] duration-300 transition-all leading-relaxed">
						hoạt hình{" "}
					</span>
					kỳ ảo
				</span>
			</h2>
		</div>
	)
}

interface Props {
	titleTop: string
	titleMain: string
	subtitle: string
	align?: "left" | "right"
	videos: string[]
	gradient?: "china" | "japan"
}

const gradientMap = {
	china: {
		text: "from-yellow-300 via-orange-400 to-red-400",
		bar: "from-yellow-400 via-orange-400 to-red-500",
		line: "from-yellow-400 to-transparent",
		glow: "drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]",
	},

	japan: {
		text: "from-cyan-400 via-purple-400 to-pink-400",
		bar: "from-cyan-400 via-purple-400 to-pink-500",
		line: "from-cyan-400 to-transparent",
		glow: "drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]",
	},
}

const AnimatedSectionHeader = ({
	titleTop,
	titleMain,
	subtitle,
	align = "left",
	videos,
	gradient = "japan",
}: Props) => {
	const g = gradientMap[gradient]

	const isRight = align === "right"

	return (
		<div
			className={clsx(
				"relative w-full overflow-hidden py-12 group mt-8",
				"flex items-center",
				isRight ? "justify-end" : "justify-start",
			)}
		>
			{/* ===== VIDEO BACKGROUND ===== */}
			<div className="hidden lg:block">
				<FadeVideo videoArray={videos} />
			</div>

			{/* ===== GRADIENT OVERLAY ===== */}
			<div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#0a0a0a_0%,transparent_20%,transparent_80%,#0a0a0a_100%),linear-gradient(to_bottom,#0a0a0a_0%,transparent_25%,transparent_75%,#0a0a0a_100%)]" />

			{/* DARK LAYER */}
			<div className="absolute inset-0 bg-[#0a0a0a]/50 z-10" />

			{/* ===== CONTENT ===== */}
			<div
				className={clsx(
					"relative z-20 flex items-center gap-4",
					isRight && "flex-row-reverse text-right",
				)}
			>
				{/* BAR */}
				<div
					className={clsx(
						"h-10 w-1.5 rounded-full transition-transform duration-500",
						"bg-linear-to-b",
						g.bar,
						"group-hover:scale-y-110",
					)}
				/>

				{/* TEXT */}
				<div className="flex flex-col">
					<h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight">
						<span className="text-white/90">{titleTop}</span>{" "}
						<span
							className={clsx(
								"inline-block mt-1 bg-clip-text text-transparent",
								"bg-linear-to-r",
								g.text,
								g.glow,
							)}
						>
							{titleMain}
						</span>
					</h2>

					<p className="text-xs md:text-sm text-white/40 tracking-widest uppercase mt-1">
						{subtitle}
					</p>

					{/* LINE */}
					<div
						className={clsx(
							"h-0.5 w-0 transition-all duration-700",
							isRight ? "ml-auto bg-linear-to-l" : "bg-linear-to-r",
							g.line,
							"group-hover:w-full",
						)}
					/>
				</div>
			</div>
		</div>
	)
}

function DubbedHeading() {
	const bars = useMemo(() => {
		return Array.from({ length: 20 }).map((_, i) => ({
			height: 10 + (i % 5) * 6,
			delay: i * 0.05,
		}))
	}, [])

	return (
		<div className="relative w-full overflow-hidden py-4 group flex items-center justify-center">
			<div className="absolute inset-0 z-0">
				<div
					className="absolute inset-0 opacity-40"
					style={{
						background:
							"linear-gradient(to right, transparent 0%, rgba(168,85,247,0.2) 40%, rgba(168,85,247,0.2) 60%, transparent 100%)",
					}}
				/>

				<div
					className="absolute inset-0"
					style={{
						background: `
                linear-gradient(to right, #0a0a0a 0%, transparent 30%, transparent 70%, #0a0a0a 100%),
                linear-gradient(to bottom, #0a0a0a 0%, transparent 40%, transparent 60%, #0a0a0a 100%)
            `,
						backgroundBlendMode: "color",
					}}
				/>

				<div className="absolute inset-0 backdrop-blur-[2px] mask-[radial-gradient(ellipse_at_center,transparent_50%,black_100%)] pointer-events-none" />

				<div className="hidden lg:flex absolute inset-0 items-center justify-center gap-1 opacity-15">
					{bars.map((bar, i) => (
						<span
							key={i}
							className="w-0.5 bg-purple-500 animate-soundWave"
							style={{
								height: `${bar.height}px`,
								animationDelay: `${bar.delay}s`,
							}}
						/>
					))}
				</div>
			</div>

			<div className="relative z-10 flex flex-col items-center text-center">
				<h2 className="text-2xl md:text-3xl font-black uppercase">
					<span className="text-white/80 text-sm">Đã quá lười đọc phụ đề?</span>
					<span className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-relaxed block bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-fuchsia-400 to-pink-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] filter-[drop-shadow(0_0_18px_rgba(168,85,247,0.6))] animate-neonFlicker">
						Phim Lồng Tiếng
					</span>
					<p className="text-xs text-white/40 tracking-widest uppercase">
						Để mắt nghỉ ngơi và cùng tận hưởng
					</p>
				</h2>
			</div>
		</div>
	)
}

function TopDubbedHeading() {
	return (
		<div className="flex items-center gap-3 group cursor-default mt-2">
			<div className="relative flex h-2.5 w-2.5">
				<span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60 blur-[2px]" />
				<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500" />
			</div>

			<div className="flex flex-col">
				<h3 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-relaxed">
					<span className="inline-block text-white/80">Top</span>{" "}
					<span className="inline-block bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-fuchsia-400 to-pink-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
						Phim Lồng Tiếng
					</span>
				</h3>

				<p className="inline-block text-[11px] text-white/40 tracking-widest uppercase">
					Nghe đã • Xem cuốn
				</p>

				<div className="h-0.5 w-0 group-hover:w-full bg-linear-to-r from-purple-400 to-transparent transition-all duration-500" />
			</div>
		</div>
	)
}

function TopNewestHeading() {
	return (
		<div className="flex items-center gap-3 group cursor-default mt-2">
			<div className="h-6 w-1 bg-linear-to-b from-green-400 via-emerald-400 to-cyan-400 rounded-full transition-transform duration-300" />
			<div className="flex flex-col">
				<h3 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-relaxed">
					<span className="inline-block bg-clip-text text-transparent bg-linear-to-r from-green-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]">
						Mới Nhất
					</span>
					<span className="inline-block ml-2 text-white/80 font-medium">
						Cập nhật liên tục
					</span>
				</h3>

				<p className="inline-block text-[11px] text-white/40 tracking-widest uppercase">
					Vừa ra mắt • Không bỏ lỡ
				</p>

				<div className="h-0.5 w-0 group-hover:w-full bg-linear-to-r from-green-400 to-transparent transition-all duration-500" />
			</div>

			<span className="text-[10px] px-2 py-0.5 bg-green-400/20 text-green-300 rounded border border-green-400/30 animate-pulse">
				NEW
			</span>
		</div>
	)
}

function CinemaMainHeading() {
	return (
		<div className="flex flex-col items-end gap-2 group cursor-default">
			<div className="text-right">
				<h2 className="text-3xl md:text-4xl font-black uppercase leading-[1.1] tracking-tight">
					<span className="text-white/80">Chuẩn bị</span>{" "}
					<span
						className="
                        inline-block py-1
                        bg-clip-text text-transparent 
                        bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 
                        leading-normal
                        drop-shadow-[0_0_10px_rgba(249,115,22,0.7)]"
					>
						nổ lớn
					</span>
				</h2>

				<p className="text-[10px] md:text-xs text-white/40 tracking-[0.2em] uppercase mt-1">
					Bom tấn mới • Sắp ra mắt
				</p>
			</div>

			<div className="flex items-center gap-1.5 mt-1">
				<div className="h-1 w-10 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full group-hover:w-16 transition-all duration-500 origin-right" />
				<div className="h-1 w-2 bg-orange-500/30 rounded-full" />
			</div>
		</div>
	)
}

export {
	NewestSeriesHeading,
	AddictionSeriesHeading,
	NewestSingleHeading,
	TopPeakSingleHeading,
	NewestTVShowsHeading,
	MainAnimateHeadingSection,
	AnimatedSectionHeader,
	DubbedHeading,
	TopDubbedHeading,
	TopNewestHeading,
	CinemaMainHeading,
}
