"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Clapperboard } from "lucide-react"
import clsx from "clsx"
import { movieQuotes } from "@/constants/movieQuotes"

interface CinematicSideProps {
	currentQuote: number
}

const CinematicSide = ({ currentQuote }: CinematicSideProps) => {
	return (
		<div className="hidden md:flex md:col-span-7 relative h-full bg-[#0a0a0a] items-center justify-center p-12 overflow-hidden">
			<div className="absolute inset-0 z-0">
				<AnimatePresence mode="wait">
					<motion.img
						key={currentQuote}
						src={movieQuotes[currentQuote].img}
						alt={movieQuotes[currentQuote].author}
						initial={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
						animate={{ opacity: 1, scale: 1, filter: "blur(2px)" }}
						exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
						transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
						className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
					/>
				</AnimatePresence>

				<div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10" />
				<div className="absolute inset-0 bg-linear-to-tr from-[#0a0a0a] via-transparent to-purple-900/20 z-10" />

				<div className="absolute inset-0 opacity-[0.05] z-10 pointer-events-none" />

				<div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-20" />
			</div>

			<div className="relative z-30 w-full max-w-2xl">
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8 inline-flex items-center gap-2 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20 backdrop-blur-md"
				>
					<Clapperboard size={14} className="text-purple-400 animate-pulse" />
					<span className="text-[10px] font-bold text-purple-300 uppercase tracking-[0.2em]">
						Khu vực điện ảnh
					</span>
				</motion.div>

				<div className="relative w-full min-h-75 flex flex-col justify-center">
					<AnimatePresence mode="popLayout">
						<motion.div
							key={currentQuote}
							initial={{ opacity: 0, x: 40, skewX: 2 }}
							animate={{ opacity: 1, x: 0, skewX: 0 }}
							exit={{ opacity: 0, x: -40, skewX: -2 }}
							transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
							className="w-full px-8 md:px-12"
						>
							<div className="space-y-8 relative z-10">
								<p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-normal font-arima italic drop-shadow-2xl">
									<span className="inline-block bg-clip-text text-transparent bg-linear-to-br from-white via-white to-white/50">
										{movieQuotes[currentQuote].vi}
									</span>
								</p>

								<div className="flex items-center gap-5">
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: 60 }}
										transition={{ delay: 0.4, duration: 1 }}
										className="h-px bg-linear-to-r from-purple-500 to-transparent"
									/>
									<div className="flex flex-col">
										<p className="text-sm text-gray-300 font-medium tracking-[0.2em] uppercase">
											— {movieQuotes[currentQuote].author}
										</p>
										<span className="text-[9px] text-gray-500 font-mono tracking-widest mt-1 opacity-50 uppercase">
											Quote {currentQuote + 1}
										</span>
									</div>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				<div className="mt-12 flex gap-3">
					{movieQuotes.map((_, index) => (
						<div
							key={index}
							className={clsx(
								"h-1 rounded-full transition-all duration-700 ease-in-out",
								index === currentQuote
									? "w-12 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
									: "w-2 bg-gray-800",
							)}
						/>
					))}
				</div>
			</div>

			{/* Trang trí bên lề trái (Vertical Text) */}
			<div className="absolute -left-14 top-1/2 -translate-y-1/2 vertical-text opacity-10 pointer-events-none hidden lg:block">
				<span className="text-[10px] text-white tracking-[1.5em] uppercase -rotate-90 block whitespace-nowrap">
					Cùng xem phim với Tu Phim
				</span>
			</div>
		</div>
	)
}

export default CinematicSide
