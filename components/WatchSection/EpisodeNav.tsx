import clsx from "clsx"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const EpisodeNav = ({
	prevSlug,
	nextSlug,
	createUrl,
}: {
	prevSlug: string | null
	nextSlug: string | null
	createUrl: (slug: string) => string
}) => {
	return (
		<div className="flex items-stretch bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[32px]">
			{/* NÚT LÙI */}
			<Link
				href={prevSlug ? createUrl(prevSlug) : "#"}
				scroll={false}
				className={clsx(
					"flex items-center gap-1.5 px-3 transition-all",
					prevSlug
						? "hover:bg-white/10 text-gray-300 hover:text-white"
						: "opacity-20 cursor-not-allowed pointer-events-none text-gray-500",
				)}
			>
				<ChevronLeft size={16} />
				<span className="text-[10px] font-bold uppercase tracking-tight">
					Lùi
				</span>
			</Link>

			{/* VÁCH NGĂN TRONG SUỐT */}
			<div className="w-px bg-white/10 my-2" />

			{/* NÚT TỚI */}
			<Link
				href={nextSlug ? createUrl(nextSlug) : "#"}
				scroll={false}
				className={clsx(
					"flex items-center gap-1.5 px-3 transition-all",
					nextSlug
						? "hover:bg-white/10 text-gray-300 hover:text-white"
						: "opacity-20 cursor-not-allowed pointer-events-none text-gray-500",
				)}
			>
				<span className="text-[10px] font-bold uppercase tracking-tight">
					Tới
				</span>
				<ChevronRight size={16} />
			</Link>
		</div>
	)
}

export default EpisodeNav
