"use client"
import { FilmImage } from "../ui/film-image"
import { FilmHoverWrapper } from "../FilmHoverCard"
import clsx from "clsx"
import Link from "next/link"

interface TopTenListProps {
	items: FilmInfo[]
}

const topGradients = [
	"linear-gradient(to bottom, #fde047, #eab308)",
	"linear-gradient(to bottom, #e9d5ff, #a855f7)",
	"linear-gradient(to bottom, #fca5a5, #ef4444)",
	"linear-gradient(to bottom, #86efac, #22c55e)",
	"linear-gradient(to bottom, #93c5fd, #3b82f6)",
	"linear-gradient(to bottom, #fdba74, #f97316)",
	"linear-gradient(to bottom, #f9a8d4, #ec4899)",
	"linear-gradient(to bottom, #5eead4, #14b8a6)",
	"linear-gradient(to bottom, #c7d2fe, #6366f1)",
	"linear-gradient(to bottom, #f8fafc, #94a3b8)",
]

export default function TopFilm({ items }: TopTenListProps) {
	const isOddLast = items.length % 2 !== 0

	return (
		<section className="mx-auto w-[94%] max-w-7xl mt-8 mb-20 text-white">
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-8 md:gap-y-12 gap-x-4 md:gap-x-6">
				{items.map((film, index) => {
					const isLast = index === items.length - 1

					return (
						<FilmHoverWrapper film={film} key={film._id}>
							<Link
								href={`/thong-tin/${film.slug}`}
								className={clsx(
									"relative flex flex-col group cursor-pointer w-full",
									isOddLast &&
										isLast &&
										"col-span-full flex items-center justify-center",
								)}
							>
								{/* IMAGE AREA */}
								<div className="relative flex justify-center">
									{/* RANK */}
									<span
										className={clsx(
											"hidden md:block font-rowdies absolute -top-6 -left-6 font-black leading-none select-none",
											"z-20 bg-clip-text text-transparent pointer-events-none transition-all duration-700",
											index === 9
												? "text-[90px] md:text-[120px]"
												: "text-[110px] md:text-[150px]",
											"group-hover:scale-125 group-hover:opacity-10 group-hover:blur-sm",
										)}
										style={{
											WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
											backgroundImage: topGradients[index],
										}}
									>
										{index + 1}
									</span>

									{/* POSTER */}
									<div className="relative z-10 w-full max-w-[220px] aspect-[2/3] rounded-lg overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-105">
										<FilmImage
											name={film.name}
											image_slug={film.thumb_url}
											className="object-cover w-full h-full"
											width={220}
											height={330}
											containerClassName="w-full h-full"
										/>
									</div>
								</div>

								{/* TITLE */}
								<div className="mt-4 md:mt-6 pl-3 md:pl-4 border-l-2 border-white/10">
									<h3 className="text-xs md:text-sm font-bold line-clamp-1">
										{film.name}
									</h3>
									<p className="text-[9px] md:text-[10px] text-gray-500 truncate uppercase tracking-widest mt-1">
										{film.origin_name}
									</p>
								</div>
							</Link>
						</FilmHoverWrapper>
					)
				})}
			</div>
		</section>
	)
}
