import { motion } from "framer-motion"
import { FilmImage } from "../ui/film-image"
import {
	Calendar,
	Globe,
	Clapperboard,
	Clock,
	CheckCircle2,
} from "lucide-react"
import { filmTypeMap } from "@/constants"
import clsx from "clsx"

const FilmPreviewCard = ({ film }: { film: Film }) => {
	const typeStyle = filmTypeMap[film.type] || {
		label: "N/A",
		color: "bg-gray-500/20 text-gray-400",
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 10 }}
			className="hidden lg:flex absolute left-[calc(100%+12px)] top-0 w-80 bg-[#1a1a1a]/95 border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-0 z-60 flex-col overflow-hidden backdrop-blur-xl"
		>
			<div className="relative aspect-video w-full overflow-hidden bg-white/5">
				<FilmImage
					key={film._id}
					image_slug={film.poster_url || film.thumb_url}
					name={film.name}
					width={400}
					height={225}
					className="object-cover h-full"
					containerClassName="h-full w-full"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent" />
				<div className="absolute bottom-3 left-3 flex items-center gap-1.5">
					<span
						className={clsx(
							"text-[9px] px-2 py-0.5 rounded-sm border uppercase font-black tracking-wider shadow-lg",
							typeStyle.color,
						)}
					>
						{typeStyle.label}
					</span>
					<span className="text-[9px] px-2 py-0.5 bg-purple-600 rounded-sm font-black text-white uppercase tracking-wider shadow-lg">
						{film.quality}
					</span>
					<span className="text-[9px] px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-sm font-bold text-white uppercase tracking-wider border border-white/20">
						{film.lang}
					</span>
				</div>
				<div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
					{film.imdb?.vote_average > 0 && (
						<div className="flex items-center gap-1 bg-[#f5c518] px-1.5 py-0.5 rounded-sm shadow-md">
							<span className="text-black text-[8px] font-black italic">
								IMDB
							</span>
							<span className="text-black text-[10px] font-black">
								{film.imdb.vote_average.toFixed(1)}
							</span>
						</div>
					)}
					{film.tmdb?.vote_average > 0 && (
						<div className="flex items-center gap-1 bg-[#01b4e4] px-1.5 py-0.5 rounded-sm shadow-md">
							<span className="text-white text-[8px] font-black italic">
								TMDB
							</span>
							<span className="text-white text-[10px] font-black">
								{film.tmdb.vote_average.toFixed(1)}
							</span>
						</div>
					)}
				</div>
			</div>

			<div className="p-2 pt-1 pb-3 space-y-3">
				<div className="space-y-1">
					<h4 className="text-base font-black text-white line-clamp-2 leading-relaxed tracking-tight uppercase italic group-hover:text-purple-400 transition-colors">
						{film.name}
					</h4>
					<span className="text-[10px] text-gray-500 font-medium line-clamp-1 italic">
						{film.origin_name}
					</span>
				</div>

				<div className="grid grid-cols-3 gap-2 py-2 border-y border-white/5">
					<div className="flex items-center gap-1.5 text-gray-400">
						<Calendar size={12} className="text-purple-500" />
						<span className="text-[10px] font-bold">{film.year}</span>
					</div>
					<div className="flex items-center gap-1.5 text-gray-400">
						<Clock size={12} className="text-purple-500" />
						<span className="text-[10px] font-bold truncate">
							{film.time !== "Đang cập nhật" ? film.time : "N/A"}
						</span>
					</div>
					<div className="flex items-center gap-1.5 text-gray-400">
						<Globe size={12} className="text-purple-500" />
						<span className="text-[10px] font-bold truncate">
							{film.country?.[0]?.name}
						</span>
					</div>
				</div>

				{/* Thể loại (Category) */}
				<div className="flex flex-wrap gap-1.5">
					{film.category?.slice(0, 4).map((cat, index) => (
						<span
							key={`${cat.id}-${index}`}
							className="text-[9px] text-gray-400 bg-white/3 hover:bg-purple-500/20 hover:text-purple-300 px-2.5 py-1 rounded-sm border border-white/5 transition-all duration-300"
						>
							{cat.name}
						</span>
					))}
				</div>
			</div>

			{/* 3. Footer thông tin cập nhật */}
			<div className="mt-auto p-4 bg-white/3 border-t border-white/5 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="p-1.5 bg-purple-500/10 rounded-full text-purple-400">
						<Clapperboard size={14} />
					</div>
					<div className="flex flex-col">
						<span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">
							Tập mới nhất
						</span>
						<span className="text-[10px] text-purple-400 font-black">
							{film.episode_current}
						</span>
					</div>
				</div>
				<div className="text-right flex flex-col gap-0.5">
					<span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">
						Ngày cập nhật
					</span>
					<div className="flex items-center justify-end gap-1 text-gray-400">
						<CheckCircle2 size={10} className="text-green-500" />
						<span className="text-[10px]">
							{new Date(film.modified.time).toLocaleDateString("vi-VN")}
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default FilmPreviewCard
