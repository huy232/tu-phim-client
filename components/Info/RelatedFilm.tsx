"use client"

import { motion } from "framer-motion"
import FilmListWrapper from "../FilmList/FilmListDynamic"

const RelatedFilm = ({ relatedFilm }: { relatedFilm: FilmInfo[] }) => {
	if (relatedFilm.length < 1) return null

	return (
		<div className="w-full space-y-6 mt-10 md:mt-12">
			{/* HEADER */}
			<div className="relative flex items-start md:items-center justify-between px-1 md:px-2 gap-4">
				<div className="flex flex-col">
					{/* TITLE */}
					<motion.div
						initial={{ opacity: 0, x: -16 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="flex items-center gap-3"
					>
						{/* LEFT BAR */}
						<span className="relative flex h-10 md:h-8 w-1.5 overflow-hidden rounded-full bg-white/10 mt-1 md:mt-0">
							<motion.span
								initial={{ y: "100%" }}
								whileInView={{ y: "0%" }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="absolute inset-0 bg-linear-to-b from-purple-500 to-fuchsia-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
							/>
						</span>

						{/* TITLE TEXT */}
						<h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-white leading-[1.05] md:leading-none">
							Các phần{" "}
							<span className="text-purple-500 underline decoration-purple-500/30 underline-offset-4">
								liên quan
							</span>
						</h2>
					</motion.div>

					{/* SUBTITLE */}
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="ml-0 md:ml-11 mt-1 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-white/30"
					>
						Khám phá trọn bộ hành trình
					</motion.p>
				</div>

				{/* COUNT BADGE */}
				<motion.div
					initial={{ scale: 0 }}
					whileInView={{ scale: 1 }}
					className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 font-mono text-xs font-bold text-purple-400 backdrop-blur-sm shrink-0"
				>
					{relatedFilm.length}
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
					items={relatedFilm}
					id="related-films"
					isSidebarLayout={true}
				/>
			</motion.div>
		</div>
	)
}

export default RelatedFilm
