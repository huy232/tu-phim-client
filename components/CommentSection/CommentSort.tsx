import { Flame, Clock, Calendar } from "lucide-react"
import clsx from "clsx"

interface CommentSortProps {
	sortBy: "newest" | "oldest" | "popular"
	setSortBy: (sort: "newest" | "oldest" | "popular") => void
}

const CommentSort = ({ sortBy, setSortBy }: CommentSortProps) => {
	const options = [
		{ id: "popular", label: "Nổi bật", icon: Flame },
		{ id: "newest", label: "Mới nhất", icon: Clock },
		{ id: "oldest", label: "Cũ nhất", icon: Calendar },
	] as const

	return (
		<div className="flex flex-col md:flex-row gap-2 p-1 bg-white/3 border border-white/5 rounded-2xl w-full md:w-fit">
			{options.map((opt) => {
				const Icon = opt.icon
				const isActive = sortBy === opt.id

				return (
					<button
						key={opt.id}
						onClick={() => setSortBy(opt.id)}
						className={clsx(
							`flex items-center gap-3 w-full md:w-auto px-4 py-2 rounded-xl text-[11px] md:text-[10px] font-black uppercase tracking-widest transition-all justify-start`,
							isActive
								? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
								: "text-white/40 hover:text-white/70 hover:bg-white/5",
						)}
					>
						<Icon size={14} />
						<span className="whitespace-nowrap">{opt.label}</span>
					</button>
				)
			})}
		</div>
	)
}

export default CommentSort
