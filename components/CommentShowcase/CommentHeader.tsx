import { filmTypeMap, IMAGE_URL } from "@/constants"
import SiteImage from "../ui/site-image"
import { Calendar, Globe, Tag } from "lucide-react"
import Link from "next/link"
import clsx from "clsx"

interface FilmHeaderProps {
	comment: CommentWithProfile
	isMobile?: boolean
}

const FilmHeader = ({ comment, isMobile }: FilmHeaderProps) => {
	const countries = comment.film_country || []
	const categories = comment.film_category || []

	return (
		<div
			className={clsx(
				"relative px-6 pt-6 flex flex-col overflow-hidden border-b border-white/5",
				"h-[280px]",
			)}
		>
			<div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110">
				<SiteImage
					src={`${IMAGE_URL}/${comment.film_poster || comment.film_thumbnail}`}
					alt={comment.film_title}
					width={500}
					height={400}
					className="h-full w-full object-cover opacity-30 group-hover:opacity-50 blur-[1px]"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
			</div>
			<div className="relative z-10 flex flex-col h-full">
				<div className="flex flex-col">
					<div className="flex items-center gap-2 mb-3">
						<span className="bg-purple-600 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest text-white shadow-lg">
							{comment.film_quality || "HD"}
						</span>
						<span
							className={clsx(
								`backdrop-blur-md border border-white/10 text-[9px] font-black px-2 py-0.5 rounded uppercase text-white/80`,
								filmTypeMap[comment.film_type!].color,
							)}
						>
							{comment.film_type ? filmTypeMap[comment.film_type].label : "N/A"}
						</span>
						<span className="text-[10px] font-bold text-white/50 ml-auto flex items-center gap-1">
							<Calendar size={10} /> {comment.film_year}
						</span>
					</div>

					{/* Titles */}
					<Link href={`/thong-tin/${comment.film_slug}`}>
						<h3 className="text-base lg:text-lg xl:text-xl font-black text-white leading-10 uppercase italic tracking-tighter group-hover:text-purple-400 transition-colors line-clamp-1">
							{comment.film_title}
						</h3>
						<p className="text-[10px] text-white/40 font-bold truncate uppercase mt-1">
							{comment.film_origin_name}
						</p>
					</Link>
				</div>

				<div className="mt-auto grid grid-cols-2 gap-2 pointer-events-auto border-t border-white/10 py-2 bg-[#0a0a0a]/40 backdrop-blur-sm -mx-2 px-2 rounded-t-lg">
					{/* Cột 1: Quốc gia */}
					<div className="flex flex-col gap-1.5">
						<div className="flex items-center gap-1.5 mb-0.5">
							<Globe size={10} className="text-blue-500/50" />
							<span className="text-[8px] font-black text-white/30 uppercase tracking-[0.15em]">
								Quốc gia
							</span>
						</div>
						<div className="flex flex-wrap gap-1 max-h-[52px] overflow-y-auto no-scrollbar">
							{countries.map((c) => (
								<Link
									key={c.slug}
									href={`/quoc-gia/${c.slug}`}
									className="px-2 py-0.5 rounded-sm bg-blue-500/5 border border-blue-500/10 text-[9px] text-blue-400 font-bold hover:bg-blue-500 hover:text-white transition-all whitespace-nowrap"
								>
									{c.name}
								</Link>
							))}
						</div>
					</div>

					{/* Cột 2: Thể loại */}
					<div className="flex flex-col gap-1.5 border-l border-white/10 pl-4">
						<div className="flex items-center gap-1.5 mb-0.5">
							<Tag size={10} className="text-purple-500/50" />
							<span className="text-[8px] font-black text-white/30 uppercase tracking-[0.15em]">
								Thể loại
							</span>
						</div>
						<div className="flex flex-wrap gap-1 max-h-[48px] overflow-y-auto no-scrollbar">
							{categories.map((cat) => (
								<Link
									key={cat.slug}
									href={`/the-loai/${cat.slug}`}
									className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[9px] text-white/50 font-bold hover:bg-purple-600 hover:text-white transition-all whitespace-nowrap"
								>
									{cat.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FilmHeader
