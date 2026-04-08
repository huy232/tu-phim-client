import clsx from "clsx"
import { FilmImage } from "../ui/film-image"

interface FilmCardProps {
	film: FilmInfo
	isActive: boolean
	onClick: (id: string) => void
	layout: "row" | "card"
}

const FilmCardTopAnimate = ({
	film,
	isActive,
	onClick,
	layout,
}: FilmCardProps) => {
	return (
		<div
			onClick={() => onClick(film._id)}
			className={clsx(
				"group cursor-pointer border transition-all duration-300 shrink-0 overflow-hidden rounded-xl",
				layout === "row"
					? "flex flex-row p-2 gap-3 h-28"
					: "flex flex-col w-full",
				isActive
					? "bg-purple-600/20 border-purple-500/60 shadow-lg shadow-purple-500/10"
					: "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20",
			)}
		>
			{/* 1. KHỐI ẢNH */}
			<div
				className={clsx(
					"relative shrink-0 overflow-hidden",
					layout === "row"
						? "h-full aspect-2/3 rounded-lg"
						: "w-full aspect-video",
				)}
			>
				<FilmImage
					name={film.name}
					image_slug={
						layout === "row"
							? film.thumb_url || film.poster_url
							: film.poster_url || film.thumb_url
					}
					className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
					containerClassName="w-full h-full"
				/>
				<div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white/80">
					{film.quality}
				</div>
			</div>

			<div
				className={clsx(
					"min-w-0 flex flex-col justify-center",
					layout === "card" ? "p-3 space-y-1" : "flex-1 space-y-0.5",
				)}
			>
				<h4
					className={clsx(
						"font-semibold line-clamp-1 transition-colors",
						isActive
							? "text-purple-400"
							: "text-white group-hover:text-purple-300",
						layout === "card" ? "text-sm" : "text-sm",
					)}
				>
					{film.name}
				</h4>

				<p className="text-[11px] text-white/40 line-clamp-1 font-light">
					{film.origin_name}
				</p>

				<div className="flex items-center gap-1.5 text-[10px] text-white/30">
					<span>{film.year}</span>
					<span>•</span>
					<span className="line-clamp-1">
						{film.country.map((c) => c.name).join(", ")}
					</span>
				</div>

				{layout === "card" && (
					<div className="flex gap-1 pt-1">
						{film.category.slice(0, 2).map((cat) => (
							<span
								key={cat.id}
								className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 border border-white/5"
							>
								{cat.name}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default FilmCardTopAnimate
