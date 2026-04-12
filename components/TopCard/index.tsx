"use client"
import { motion } from "framer-motion"
import { FilmHoverWrapper } from "../FilmHoverCard"
import { FilmImage } from "../ui/film-image"
import { getRankStyle } from "@/constants/rankStyle"
import clsx from "clsx"
import Link from "next/link"

const TopCard = ({
	filmCard,
	ranking,
	rankPosition = "left",
}: {
	filmCard: FilmInfo
	ranking: number
	rankPosition?: "left" | "right"
}) => {
	const style = getRankStyle(ranking)

	const isRight = rankPosition === "right"

	return (
		<div className="w-full relative group isolate">
			<FilmHoverWrapper film={filmCard}>
				<Link
					href={`/thong-tin/${filmCard.slug}`}
					className="flex flex-col gap-3 cursor-pointer relative"
				>
					<motion.div
						initial={{ x: isRight ? 20 : -20, opacity: 0, scale: 0.9 }}
						whileInView={{ x: 0, opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, ease: "easeOut" }}
						style={{
							WebkitTextStroke: style.stroke,
						}}
						className={clsx(
							"absolute -top-12 select-none pointer-events-none z-0",
							isRight ? "-right-10" : "-left-10",
							style.glow,
							"hidden lg:block",
						)}
					>
						<span
							className={clsx(
								"text-[100px] font-black leading-none italic tracking-tighter inline-block transform scale-y-110",
								style.textClass,
								"px-4 py-2",
							)}
						>
							{ranking}
						</span>
					</motion.div>

					<div className="relative z-10 aspect-video w-full rounded-xl overflow-hidden border border-white/10 group-hover:border-purple-500/50 transition-all duration-500 shadow-2xl bg-neutral-900">
						<FilmImage
							name={filmCard.name}
							image_slug={filmCard.poster_url || filmCard.thumb_url}
							width={400}
							height={225}
							className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
							containerClassName="w-full h-full"
						/>

						<div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />

						<div
							className={clsx("absolute top-2", isRight ? "right-2" : "left-2")}
						>
							<div
								className={clsx(
									"text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg",
									ranking === 1
										? "bg-orange-600"
										: ranking === 2
											? "bg-slate-500"
											: ranking === 3
												? "bg-amber-700"
												: "bg-purple-600",
								)}
							>
								#{ranking}
							</div>
						</div>
					</div>

					<div className="flex flex-col px-1 z-10">
						<h3 className="text-sm font-bold text-white/90 line-clamp-1 group-hover:text-purple-400 transition-colors">
							{filmCard.name}
						</h3>
						<p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider line-clamp-1">
							{filmCard.origin_name}
						</p>
					</div>
				</Link>
			</FilmHoverWrapper>
		</div>
	)
}

export default TopCard
