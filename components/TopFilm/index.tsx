"use client"
import { FilmImage } from "../ui/film-image"
import { FilmHoverWrapper } from "../FilmHoverCard"
import clsx from "clsx"

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
	return (
		<section className="mx-auto w-[94%] max-w-7xl mt-8 mb-20 text-white">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6">
				{items.map((film, index) => (
					<FilmHoverWrapper film={film} key={film._id}>
						<div className="relative flex flex-col group cursor-pointer">
							<div className="relative flex items-end h-60">
								<span
									className={clsx(
										"font-rowdies absolute -left-4 -top-4 font-black leading-none select-none transition-all duration-700 ease-out",
										"z-20 bg-clip-text text-transparent",
										"pointer-events-none",
										index === 9
											? "text-[90px] md:text-[120px] tracking-[0.05em] -left-8"
											: "text-[110px] md:text-[150px] tracking-[0.05em]",
										"group-hover:z-0 group-hover:scale-125 group-hover:translate-x-12 group-hover:opacity-10 group-hover:blur-sm",
									)}
									style={{
										WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
										backgroundImage: topGradients[index],
										backgroundSize: "100% 100%",
									}}
								>
									{index + 1}
								</span>

								<div
									className="relative z-10 w-35 h-52.5 ml-12 rounded-lg overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 
                            group-hover:border-purple group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(168,85,247,0.3)] group-hover:scale-105"
								>
									<FilmImage
										name={film.name}
										image_slug={film.thumb_url}
										className="object-cover w-full h-full"
										width={140}
										height={210}
										containerClassName="w-full h-full"
									/>
									<div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-100 group-hover:opacity-20 transition-opacity" />
								</div>
							</div>

							<div className="mt-6 pl-4 border-l-2 border-white/10 transition-all duration-500 group-hover:border-yellow-500">
								<h3 className="text-sm font-bold line-clamp-1 group-hover:text-purple transition-all group-hover:translate-x-1">
									{film.name}
								</h3>
								<p className="text-[10px] text-gray-500 truncate uppercase tracking-widest mt-1 group-hover:text-gray-300">
									{film.origin_name}
								</p>
							</div>
						</div>
					</FilmHoverWrapper>
				))}
			</div>
		</section>
	)
}
