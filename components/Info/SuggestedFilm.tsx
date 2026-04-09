"use client"

import { motion } from "framer-motion"
import FilmListWrapper from "../FilmList/FilmListDynamic"

const SuggestedFilm = ({ suggestedFilm }: { suggestedFilm: FilmInfo[] }) => {
	if (suggestedFilm.length < 1) return null

	return (
		<div className="w-full space-y-6 mt-16">
			<div className="relative flex items-center justify-between px-2 flex-row-reverse">
				<div className="flex flex-col items-end">
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="flex items-center gap-3 flex-row-reverse"
					>
						<span className="relative flex h-8 w-1.5 overflow-hidden rounded-full bg-white/10">
							<motion.span
								initial={{ y: "-100%" }}
								whileInView={{ y: "0%" }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="absolute inset-0 bg-linear-to-b from-amber-500 to-orange-400 shadow-[0_0_15px_rgba(245,158,11,0.8)]"
							/>
						</span>

						<h2 className="text-2xl font-black italic uppercase tracking-tighter text-white md:text-3xl text-right">
							Gợi ý{" "}
							<span className="text-amber-500 underline decoration-amber-500/30 underline-offset-4">
								tương đồng
							</span>
						</h2>
					</motion.div>

					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className="mr-11 mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 text-right"
					>
						Có thể bạn cũng sẽ thích
					</motion.p>
				</div>

				<motion.div
					initial={{ scale: 0, rotate: -45 }}
					whileInView={{ scale: 1, rotate: 0 }}
					className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/2 font-mono text-xs font-bold text-amber-400 backdrop-blur-sm"
				>
					{suggestedFilm.length}
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.3 }}
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
