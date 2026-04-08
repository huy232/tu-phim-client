"use client"

import { motion } from "framer-motion"

export const FilmDescription = ({ film }: { film: FilmInfo }) => {
	return (
		<motion.div layout className="space-y-6">
			<div>
				<h3 className="text-xl font-bold border-l-4 border-purple-500 pl-4 uppercase tracking-wider mb-3">
					Nội dung phim
				</h3>
				<div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
					<span className="px-2 py-0.5 bg-white/10 rounded text-white font-medium">
						{film.quality}
					</span>
					<span>•</span>
					<span>{film.year}</span>
				</div>
				<p className="text-gray-400 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-500">
					{film.content.replace(/<[^>]*>?/gm, "")}
				</p>
			</div>

			<div className="pt-4 border-t border-white/10">
				<h4 className="font-bold mb-3 text-purple-400 uppercase text-sm">
					Thông tin khác
				</h4>
				<div className="space-y-2 text-sm text-gray-300">
					<p>
						<span className="text-gray-500">Trạng thái:</span>{" "}
						{film.episode_current}
					</p>
					<p>
						<span className="text-gray-500">Ngôn ngữ:</span> {film.lang}
					</p>
					<p>
						<span className="text-gray-500">Thể loại:</span>{" "}
						{film.category.map((c) => c.name).join(", ")}
					</p>
				</div>
			</div>
		</motion.div>
	)
}
