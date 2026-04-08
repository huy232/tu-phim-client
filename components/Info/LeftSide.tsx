"use client"
import { FilmImage } from "../ui/film-image"
import clsx from "clsx"
import InfoCard from "../InfoCard"
import { filmStatusMap, filmTypeMap } from "@/constants"
import AlternativeNames from "./AlternativeName"
import TmdbExtraInfo from "./ExtraTMDBInfo"
import TopCard from "../TopCard"

const LeftSide = ({
	film,
	tmdbData,
}: {
	film: FilmInfo
	tmdbData: TMDBData | null
}) => {
	return (
		<section className="col-span-12 md:col-span-4 lg:col-span-3 space-y-4">
			<div className="relative">
				<div className="relative aspect-2/3 w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-2 border-white/5 group">
					<FilmImage
						image_slug={film.thumb_url || film.poster_url}
						name={film.name}
						className="object-cover transition-transform duration-700 w-full h-full"
						height={450}
						width={300}
						containerClassName="w-full h-full"
					/>
				</div>
				<div
					className={clsx(
						"absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-md font-bold tracking-widest rounded border backdrop-blur whitespace-nowrap",
						"bg-black border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.6)]",
						"drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]",
						filmTypeMap[film.type].color,
					)}
					style={{
						WebkitTextStroke: "0.3px rgba(0,0,0,0.5)",
					}}
				>
					{filmTypeMap[film.type].label}
				</div>
			</div>

			<div className="mt-2 flex flex-wrap gap-2 opacity-60 mx-auto flex-center">
				<span className="text-[10px] border border-white/10 px-3 py-1 rounded-full bg-white/5 uppercase tracking-widest">
					{film.lang}
				</span>
				<span className="text-[10px] border border-white/10 px-3 py-1 rounded-full bg-white/5 uppercase tracking-widest">
					{film.quality}
				</span>
				<span
					className={clsx(
						"text-[10px] border border-white/10 px-3 py-1 rounded-full uppercase tracking-widest",
						`${filmStatusMap[film.status].color}/5`,
					)}
				>
					{filmStatusMap[film.status].label}
				</span>
			</div>
			<InfoCard>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span className="text-gray-400">Tập</span>
						<span>{film.episode_current}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-400">Tổng số tập</span>
						<span>{film.episode_total}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-400">Thời lượng</span>
						<span>
							{film.time ||
								`${tmdbData?.episode_run_time.length ? tmdbData?.episode_run_time[0] : "???"} Phút`}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-400">Năm</span>
						<span>{film.year}</span>
					</div>
				</div>
			</InfoCard>

			<InfoCard>
				<div className="space-y-3">
					<div>
						<p className="text-xs text-gray-400 mb-1">Quốc gia</p>
						<p className="text-sm">
							{film.country.map((c) => c.name).join(", ")}
						</p>
					</div>

					<div>
						<p className="text-xs text-gray-400 mb-1">Thể loại</p>
						<div className="flex flex-wrap gap-1">
							{film.category.map((cat, index) => (
								<span
									key={`${cat.id}-${index}`}
									className="text-[10px] px-2 py-1 bg-purple-500/10 text-purple-400 rounded"
								>
									{cat.name}
								</span>
							))}
						</div>
					</div>
				</div>
			</InfoCard>
			<InfoCard>
				<TmdbExtraInfo tmdbData={tmdbData} />
			</InfoCard>
			<AlternativeNames names={film.alternative_names} />

			{film?.top_type?.length > 0 && (
				<div>
					<div className="relative pl-7 mb-12 group">
						<div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-amber-400 via-orange-500 to-transparent shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-amberFlicker" />

						<div className="absolute -left-8.5 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 whitespace-nowrap">
							Hot Ranking
						</div>

						<h2 className="flex flex-col tracking-tighter leading-[0.8]">
							<span className="text-[10px] text-orange-400/80 uppercase tracking-[0.3em] mb-2 font-bold">
								Bảng xếp hạng
							</span>
							<span className="text-4xl font-black uppercase italic text-white drop-shadow-[2px_2px_0px_rgba(245,158,11,0.5)]">
								TOP 10
							</span>
							<span className="text-xl font-extrabold uppercase text-gray-500 mt-1">
								{filmTypeMap[film.type].label}
							</span>
						</h2>

						<span className="absolute right-4 top-0 text-7xl font-black text-white/3 italic -z-10 select-none leading-none">
							#10
						</span>
					</div>
					<div className="flex flex-col gap-12 pt-6">
						{film.top_type.map((top, index) => (
							<TopCard key={top._id} filmCard={top} ranking={index + 1} />
						))}
					</div>
				</div>
			)}
		</section>
	)
}

export default LeftSide
