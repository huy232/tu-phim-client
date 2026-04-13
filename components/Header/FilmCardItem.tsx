import { filmTypeMap } from "@/constants"
import clsx from "clsx"
import { motion } from "framer-motion"
import Link from "next/link"
import React, { SetStateAction } from "react"
import { FilmImage } from "../ui/film-image"

interface FilmCardItemProps {
	film: Film
	index: number
	setShowResults: (value: SetStateAction<boolean>) => void
	onHover: React.Dispatch<React.SetStateAction<Film | null>>

	onClick?: () => void // ✅ thêm dòng này
}

const FilmCardItem = ({
	film,
	index,
	setShowResults,
	onHover,
}: FilmCardItemProps) => {
	return (
		<motion.div
			key={film.slug}
			initial={{ opacity: 0, x: -10 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: index * 0.05 }}
			onMouseEnter={() => onHover(film)}
			onMouseLeave={() => onHover(null)}
		>
			<Link
				href={`/thong-tin/${film.slug}`}
				onClick={() => {
					setShowResults(false)
				}}
				className="flex items-center gap-3 p-2 hover:bg-purple-500/10 rounded-md transition-all group"
			>
				<div className="relative w-12 h-16 shrink-0 overflow-hidden rounded shadow-lg self-start">
					<FilmImage
						image_slug={film.thumb_url}
						name={film.name}
						className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
						width={120}
						height={180}
						containerClassName="w-full h-full"
					/>
				</div>
				<div className="flex flex-col gap-1 min-w-0">
					<div className="">
						<span className="block text-xs md:text-sm font-bold text-gray-100 line-clamp-2 md:line-clamp-1 group-hover:text-purple-400 transition-colors">
							{film.name}
						</span>
						<span className="block text-[10px] text-gray-500 truncate italic">
							{film.origin_name}
						</span>
					</div>
					<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
						<span
							className={clsx(
								`text-[9px] px-1.5 py-0.5 rounded font-medium`,
								filmTypeMap[film.type].color,
							)}
						>
							{filmTypeMap[film.type].label}
						</span>
						<span className="text-[9px] py-0.5 text-gray-500 border border-white/10 px-1 rounded">
							{film.lang}
						</span>
					</div>
					<span className="text-[10px] text-gray-400 italic truncate max-w-25">
						{film.episode_current}
					</span>
				</div>
			</Link>
		</motion.div>
	)
}

export default FilmCardItem
