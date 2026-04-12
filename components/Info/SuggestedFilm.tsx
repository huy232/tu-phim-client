"use client"

import { motion } from "framer-motion"
import FilmListWrapper from "../FilmList/FilmListDynamic"

const SuggestedFilm = ({ suggestedFilm }: { suggestedFilm: FilmInfo[] }) => {
	if (suggestedFilm.length < 1) return null

	return (
		<div className="w-full space-y-6 mt-12 md:mt-16">
			{/* HEADER */}
			<div className="relative flex items-center justify-between px-1 md:px-2 gap-4">
				<div className="flex flex-col items-center w-full md:w-auto">
					{/* TITLE */}
					<motion.div
						initial={{ opacity: 0, x: 14 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="flex items-center md:flex-row-reverse gap-3 w-full md:w-auto"
					>
						{/* BAR */}
						<span className="relative flex h-10 md:h-8 w-1.5 overflow-hidden rounded-full bg-white/10 mt-1 md:mt-0">
							<motion.span
								initial={{ y: "-100%" }}
								whileInView={{ y: "0%" }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="absolute inset-0 bg-linear-to-b from-amber-500 to-orange-400 shadow-[0_0_15px_rgba(245,158,11,0.8)]"
							/>
						</span>

						{/* TITLE TEXT */}
						<h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-white leading-[1.05] md:leading-none text-left md:text-right">
							Gợi ý{" "}
							<span className="text-amber-500 underline decoration-amber-500/30 underline-offset-4">
								tương đồng
							</span>
						</h2>
					</motion.div>

					{/* SUBTITLE */}
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="mt-1 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 text-left md:text-right"
					>
						Có thể bạn cũng sẽ thích
					</motion.p>
				</div>

				{/* COUNT BADGE */}
				<motion.div
					initial={{ scale: 0, rotate: -20 }}
					whileInView={{ scale: 1, rotate: 0 }}
					className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 font-mono text-xs font-bold text-amber-400 backdrop-blur-sm shrink-0"
				>
					{suggestedFilm.length}
				</motion.div>
			</div>

			{/* LIST */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.2 }}
				className="w-full overflow-hidden"
			>
				<FilmListWrapper
					items={suggestedFilm}
					id="suggested-films"
					isSidebarLayout={true}
				/>
			</motion.div>
		</div>
	)
}

export default SuggestedFilm
