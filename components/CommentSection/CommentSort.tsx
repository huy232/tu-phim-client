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
		<div className="flex items-center gap-2 p-1 bg-white/[0.03] border border-white/5 rounded-2xl w-fit">
			{options.map((opt) => {
				const Icon = opt.icon
				const isActive = sortBy === opt.id

				return (
					<button
						key={opt.id}
						onClick={() => setSortBy(opt.id)}
						className={clsx(
							"flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
							isActive
								? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
								: "text-white/30 hover:text-white/60 hover:bg-white/5",
						)}
					>
						<Icon size={12} />
						{opt.label}
					</button>
				)
			})}
		</div>
	)
}

export default CommentSort
