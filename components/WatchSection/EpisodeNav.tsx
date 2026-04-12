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
		<div className="flex items-stretch bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[30px] shrink-0">
			<Link
				href={prevSlug ? createUrl(prevSlug) : "#"}
				scroll={false}
				className={clsx(
					"flex items-center gap-1 px-2 sm:px-3 transition-all text-[9px] sm:text-[10px]",
					prevSlug
						? "hover:bg-white/10 text-gray-300 hover:text-white"
						: "opacity-20 pointer-events-none text-gray-500",
				)}
			>
				<ChevronLeft size={14} />
				<span className="font-bold uppercase hidden md:inline-block">Lùi</span>
			</Link>

			<div className="w-px bg-white/10 my-1" />

			<Link
				href={nextSlug ? createUrl(nextSlug) : "#"}
				scroll={false}
				className={clsx(
					"flex items-center gap-1 px-2 sm:px-3 transition-all text-[9px] sm:text-[10px]",
					nextSlug
						? "hover:bg-white/10 text-gray-300 hover:text-white"
						: "opacity-20 pointer-events-none text-gray-500",
				)}
			>
				<span className="font-bold uppercase hidden md:inline-block">Tới</span>
				<ChevronRight size={14} />
			</Link>
		</div>
	)
}

export default EpisodeNav
