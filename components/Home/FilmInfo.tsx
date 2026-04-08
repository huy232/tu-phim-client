import { AddFavorite, IMDBIcon, ShareFilm, TMDBIcon } from "@/assets/icons"
import { StraightSymbol } from "@/constants/divideSymbol"
import Link from "next/link"
import React from "react"
import PlayButtonAnimated from "../ui/play-button-animated"
import { motion } from "framer-motion"
import { Heart, Info } from "lucide-react"
import { FavoriteWrapper } from "../FavoriteWrapper"
import clsx from "clsx"
import { ShareButton } from "./ShareButton"
interface FilmProps {
	film: FilmInfo
}
const FilmInfo = ({ film }: FilmProps) => {
	return (
		<div className="absolute top-10 left-6 md:top-14 md:left-10 z-30 max-w-[90%] md:max-w-[40%] text-white min-h-125">
			{/* TÊN PHIM */}
			<motion.h2
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
				className="text-2xl md:text-3xl font-extrabold text-white uppercase drop-shadow-2xl line-clamp-2 tracking-wider font-phudu"
			>
				{film.name}
			</motion.h2>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, delay: 0.2 }}
				className="text-gray-300 text-sm md:text-md font-light drop-shadow-md line-clamp-2"
			>
				{film.origin_name}
			</motion.p>
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="flex items-center gap-2 mt-3"
			>
				<span className="px-2 py-1.5 bg-purple text-white text-[10px] rounded font-bold uppercase">
					{film.quality}
				</span>
				<span className="px-2 py-1.5 border-purple text-white text-[10px] rounded font-bold uppercase border-[0.5px]">
					{film.lang}
				</span>

				{/* QUỐC GIA */}
				{film.country?.length > 0 && (
					<div className="flex items-center gap-3">
						<StraightSymbol />
						<div className="flex gap-2">
							{film.country.map((nation) => (
								<Link
									href={`/quoc-gia/${nation.slug}`}
									key={nation.name}
									className="text-sm text-white hover:text-purple transition-colors"
								>
									{nation.name}
								</Link>
							))}
						</div>
					</div>
				)}

				{/* ĐIỂM IMDB và TMDB */}
				{(film.imdb?.vote_average > 0 || film.tmdb?.vote_average > 0) && (
					<div className="flex items-center gap-3">
						<StraightSymbol />
						<div className="flex items-center gap-2">
							{film.imdb?.vote_average > 0 && (
								<div className="flex items-center gap-1 rounded border-yellow-300/50 p-1 border-[0.5px] bg-yellow-300/5">
									<IMDBIcon className="text-yellow-300 h-3.5 w-3.5" />
									<span className="font-light text-white text-[10px]">
										{film.imdb.vote_average.toFixed(1)}
									</span>
								</div>
							)}
							{film.tmdb?.vote_average > 0 && (
								<div className="flex items-center gap-1 rounded border-blue-300/50 p-1 border-[0.5px] bg-blue-300/5">
									<TMDBIcon className="text-blue-300 h-3.5 w-3.5" />
									<span className="font-light text-white text-[10px]">
										{film.tmdb.vote_average.toFixed(1)}
									</span>
								</div>
							)}
						</div>
					</div>
				)}
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className="flex items-center gap-x-1 mt-2 text-white text-xs font-light"
			>
				{film.category.map((categoryItem, index) => (
					<React.Fragment key={`${categoryItem.id}-${index}`}>
						{index > 0 && <span className="opacity-40 select-none">•</span>}
						<Link
							className="opacity-70 hover:opacity-100 duration-300 ease-in-out bg-[#ffffff10] p-1 rounded hover:bg-purple/20"
							href={`/the-loai/${categoryItem.slug}`}
						>
							{categoryItem.name}
						</Link>
					</React.Fragment>
				))}
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8, delay: 0.4 }}
				className="text-xs font-extralight mt-2 mb-12"
			>
				<div
					className="line-clamp-4 leading-relaxed"
					dangerouslySetInnerHTML={{ __html: film.content }}
				/>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="mt-auto mb-2 flex items-center gap-3 sm:gap-4 flex-wrap"
			>
				<PlayButtonAnimated filmSlug={film.slug} />

				<Link
					href={`/thong-tin/${film.slug}`}
					className={clsx(
						"h-12.5 px-6 flex items-center gap-2.5",
						"bg-white/5 hover:bg-white/10",
						"border border-white/10 hover:border-white/20",
						"rounded-full backdrop-blur-md",
						"transition-all duration-300 group relative z-30",
						"active:scale-95",
					)}
				>
					{/* Icon Info đơn giản, thanh thoát */}
					<Info className="w-4.5 h-4.5 text-white/70 group-hover:text-white transition-colors" />

					<span className="font-medium text-sm sm:text-base text-white/70 group-hover:text-white transition-colors">
						Thông tin
					</span>
				</Link>

				{/* Nhóm nút phụ */}
				<div className="px-5 py-2 border-[0.5px] border-white/20 rounded-full flex items-center h-12.5 gap-4 bg-black/40 backdrop-blur-md relative z-30">
					<FavoriteWrapper film={film}>
						{({ isFavorited, handleToggle, loading }) => (
							<button
								onClick={handleToggle}
								disabled={loading}
								className={clsx(
									"cursor-pointer transition-all duration-300 hover:scale-110 flex items-center justify-center relative",
									isFavorited
										? "text-purple-400"
										: "text-white/80 hover:text-white",
									loading && "opacity-40 cursor-not-allowed scale-95",
								)}
							>
								{loading ? (
									<div className="w-5 h-5 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
								) : (
									<Heart
										size={20}
										fill={isFavorited ? "currentColor" : "none"}
										strokeWidth={isFavorited ? 0 : 2}
										className={clsx(
											"transition-all duration-300",
											isFavorited &&
												"drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]",
										)}
									/>
								)}
							</button>
						)}
					</FavoriteWrapper>
					<span className="h-4 w-px bg-white/20" />
					<ShareButton slug={film.slug} />
				</div>
			</motion.div>
		</div>
	)
}

export default FilmInfo
