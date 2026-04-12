import React from "react"
import { FilmHoverWrapper } from "../FilmHoverCard"
import { FilmImage } from "./film-image"
import clsx from "clsx"
import { filmTypeMap } from "@/constants"
import Link from "next/link"

const FilmCard = ({
	film,
	dubbed = false,
}: {
	film: FilmInfo
	dubbed?: boolean
}) => {
	const typeConfig = filmTypeMap[film.type]

	return (
		<>
			<FilmHoverWrapper film={film}>
				<Link
					href={`/thong-tin/${film.slug}`}
					className="flex flex-col gap-2 group cursor-pointer"
				>
					<div className="w-full relative">
						<div className="relative aspect-2/3 w-full bg-white/5 rounded-xl border border-white/10 group-hover:border-purple-500 transition-all overflow-hidden duration-300	">
							<FilmImage
								name={film.name}
								image_slug={film.thumb_url || film.poster_url}
								width={140}
								height={210}
								className="object-cover transition-transform duration-500 h-full w-full"
								containerClassName="w-full h-full"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90" />

							{typeConfig && (
								<div
									className={clsx(
										"absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full border backdrop-blur whitespace-nowrap",
										"bg-black/60 text-white border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.6)]",
										"drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]",
										typeConfig.color,
									)}
									style={{
										WebkitTextStroke: "0.3px rgba(0,0,0,0.5)",
									}}
								>
									{typeConfig.label}
								</div>
							)}
						</div>

						{film.lang && (
							<div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2">
								<div className="flex flex-center rounded border border-white/10 bg-black/60 backdrop-blur text-[10px] text-white shadow-lg overflow-hidden whitespace-nowrap w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] z-10 opacity-100">
									<span className="px-1.5 py-1 text-white/80 truncate mx-auto tracking-widest">
										{film.lang}
									</span>
								</div>
							</div>
						)}
					</div>

					<div className="flex flex-col px-1">
						{film.episode_current && (
							<div
								className={clsx(
									"relative px-3 py-1 text-[10px] font-bold tracking-wider uppercase",
									"backdrop-blur-xl border-l-2",
									film.episode_current === "Trailer"
										? "border-yellow-500/50 text-yellow-200"
										: "border-purple-500/50 text-purple-200",
								)}
								style={{
									background:
										film.episode_current === "Trailer"
											? "linear-gradient(to right, rgba(234, 179, 8, 0.15), rgba(10, 10, 10, 0))"
											: "linear-gradient(to right, rgba(168, 85, 247, 0.15), rgba(10, 10, 10, 0))",
									WebkitMaskImage:
										"linear-gradient(to right, black 40%, transparent 90%)",
									maskImage:
										"linear-gradient(to right, black 40%, transparent 90%)",
									boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)",
								}}
							>
								{film.episode_current}
								<div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
							</div>
						)}

						{dubbed && film.last_episodes.length > 0 && (
							<div className="flex items-center gap-1.5 mt-0.5">
								{film.last_episodes[0].is_ai ? (
									<span className="text-[9px] font-bold tracking-[0.2em] text-orange-400/90 uppercase">
										Lồng tiếng bởi AI
									</span>
								) : (
									<span className="text-[9px] font-bold tracking-[0.2em] text-purple-400/90 uppercase">
										Lồng tiếng bởi người
									</span>
								)}
							</div>
						)}

						<p className="text-[10px] md:text-sm font-medium line-clamp-2 group-hover:text-purple-400 transition-colors">
							{film.name}
						</p>

						<p className="text-[8px] md:text-xs text-white/50 font-extralight line-clamp-2">
							{film.origin_name}
						</p>
					</div>
				</Link>
			</FilmHoverWrapper>
		</>
	)
}

export default FilmCard
