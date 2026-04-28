"use client"

import { IMAGE_URL } from "@/constants"
import { formatDistanceToNow } from "date-fns"
import { Clock, Play, Globe, Info } from "lucide-react"
import SiteImage from "../ui/site-image"
import Link from "next/link"
import { vi } from "date-fns/locale"

export default function FilmCard({ fav }: { fav: FavoriteFilmItem }) {
	const { film, created_at } = fav

	return (
		<div className="group relative">
			<Link
				href={`/thong-tin/${film.slug}`}
				className="absolute inset-0 z-10 pointer-events-none"
			/>

			<div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-red-500/30">
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

				<SiteImage
					src={`${IMAGE_URL}/${film.thumb_url || film.poster_url || ""}`}
					alt={film.name}
					width={300}
					height={450}
					className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
					containerClassName="h-full w-full"
				/>

				{/* BADGES */}
				<div className="absolute top-2 right-2 z-30 flex flex-col gap-1.5 items-end">
					<span className="px-2 py-0.5 rounded bg-red-600 text-[10px] font-black text-white italic shadow-md">
						{film.quality}
					</span>
					<span className="px-1.5 py-0.5 rounded bg-zinc-950/80 text-[9px] font-bold text-zinc-300 border border-white/10">
						{film.year}
					</span>
				</div>

				{/* HOVER PANEL */}
				<div className="absolute inset-0 z-20 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 backdrop-blur-xs">
					<div className="space-y-3">
						<div className="space-y-1.5">
							<div className="flex items-center gap-2 text-[10px] text-white/90">
								<Clock size={12} className="text-red-500" />
								<span>{film.time}</span>
							</div>
							<div className="flex items-center gap-2 text-[10px] text-white/90">
								<Globe size={12} className="text-blue-400" />
								<span className="truncate">{film.lang}</span>
							</div>
						</div>

						<div className="flex gap-2">
							<Link
								href={`/xem-phim/${film.slug}`}
								className="z-30 flex-1 py-2 bg-red-600 hover:bg-red-500 rounded-lg flex items-center justify-center gap-1.5"
							>
								<Play size={12} className="fill-white" />
								<span className="text-[10px] font-bold text-white">Xem</span>
							</Link>

							<Link
								href={`/thong-tin/${film.slug}`}
								className="z-30 flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center border border-white/10"
							>
								<Info size={14} className="text-white" />
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* TEXT */}
			<div className="mt-3 px-1">
				<Link href={`/thong-tin/${film.slug}`}>
					<h4 className="text-sm font-bold text-white line-clamp-2 min-h-[2.5rem] transition-all duration-300 group-hover:text-red-400 group-hover:drop-shadow-[0_0_6px_rgba(248,113,113,0.6)]">
						{film.name}
					</h4>
				</Link>

				<div className="flex items-center justify-between mt-1 opacity-60">
					<span className="hidden md:block text-[10px] text-zinc-400 line-clamp-1">
						{film.origin_name}
					</span>
					<span className="text-[9px] text-zinc-500 font-bold">
						{formatDistanceToNow(new Date(created_at), {
							addSuffix: true,
							locale: vi,
						})}
					</span>
				</div>

				{/* MOBILE BUTTON */}
				<div className="flex gap-2 pt-2 md:hidden">
					<Link
						href={`/xem-phim/${film.slug}`}
						className="flex-1 py-2 bg-red-600 rounded-lg flex items-center justify-center gap-1"
					>
						<Play size={14} className="fill-white" />
						<span className="text-xs font-bold text-white">Xem ngay</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export function SkeletonCard() {
	return (
		<div className="space-y-3">
			<div className="aspect-2/3 bg-white/5 animate-pulse rounded-2xl border border-white/5" />
			<div className="h-4 w-3/4 bg-white/5 animate-pulse rounded" />
			<div className="h-3 w-1/2 bg-white/5 animate-pulse rounded" />
		</div>
	)
}
