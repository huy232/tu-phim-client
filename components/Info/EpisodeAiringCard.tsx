import { Clock, Star } from "lucide-react"
import SiteImage from "../ui/site-image"
import { TMDB_IMAGE_URL } from "@/constants"
import { formatDateVN } from "@/utilities"
import clsx from "clsx"

const EpisodeAiringCard = ({
	episode,
	label,
	isNext = false,
}: {
	episode: EpisodeAiring
	label: string
	isNext?: boolean
}) => {
	return (
		<div
			className={clsx(
				`relative flex flex-col gap-3 p-3 rounded-xl border transition-all overflow-hidden`,
				isNext
					? "bg-purple-500/10 border-purple-500/30"
					: "bg-white/5 border-white/10",
			)}
		>
			<div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
				<SiteImage
					src={`${TMDB_IMAGE_URL}/original${episode?.still_path}`}
					alt={episode.name || ""}
					fill
					className="object-cover"
					loading="lazy"
					containerClassName="w-full h-full"
				/>
				<div className="absolute inset-0 bg-linear-to-r from-zinc-900 via-zinc-900/80 to-transparent" />
			</div>
			<div className="flex items-center justify-between">
				<span
					className={clsx(
						`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded`,
						isNext ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-300",
					)}
				>
					{label}
				</span>
				<span className="text-[11px] text-gray-400">
					{formatDateVN(episode.air_date)}
				</span>
			</div>
			<div className="relative z-10 p-2 flex flex-col md:flex-row gap-5 items-center">
				<div className="relative shrink-0 w-full md:w-40 aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl">
					<SiteImage
						src={`${TMDB_IMAGE_URL}/original${episode?.still_path}`}
						alt={episode?.name || ""}
						fill
						className="object-cover"
						loading="lazy"
						containerClassName="w-full h-full"
					/>
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<span className="text-purple-500 text-[10px] font-black uppercase">
							Mùa {episode?.season_number} • Tập {episode?.episode_number}
						</span>
						{episode?.runtime && (
							<span className="flex items-center gap-1 text-gray-500 text-[10px]">
								<Clock size={10} /> {episode.runtime}p
							</span>
						)}
					</div>
					<h3 className="text-white font-bold text-lg truncate group-hover:text-purple-400 transition-colors">
						{episode?.name}
					</h3>
					<p className="text-gray-400 text-xs line-clamp-2 mt-1 font-light italic">
						{episode?.overview || "Không có mô tả cho tập phim này."}
					</p>
					<div className="flex items-center gap-3 mt-3">
						<div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/5">
							<Star size={10} className="text-amber-400 fill-amber-400" />
							<span className="text-[10px] text-white font-bold">
								{episode?.vote_average?.toFixed(1)}
							</span>
						</div>
						{!isNext && (
							<span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
								Khép lại ngày{" "}
								{new Date(episode?.air_date).toLocaleDateString("vi-VN")}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default EpisodeAiringCard
