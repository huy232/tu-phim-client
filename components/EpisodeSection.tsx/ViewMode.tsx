"use client"

import clsx from "clsx"
import { LayoutGrid, ListIcon } from "lucide-react"

interface ViewModeProps {
	viewMode: boolean
	handleToggleMode: (mode: boolean) => void
}

const ViewMode = ({ viewMode, handleToggleMode }: ViewModeProps) => {
	return (
		<div className="flex items-center justify-between border-b border-white/5 pb-4">
			<div className="flex items-center gap-2">
				<div className="w-1 h-6 bg-purple shadow-[0_0_10px_#a855f7]"></div>
				<h3 className="text-xl font-bold uppercase tracking-wider font-rowdies">
					Tập phim
				</h3>
			</div>
			<div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
				<button
					onClick={() => handleToggleMode(true)}
					className={clsx(
						"p-1.5 rounded-md transition",
						viewMode ? "bg-purple text-white" : "text-gray-500",
					)}
				>
					<LayoutGrid size={18} />
				</button>
				<button
					onClick={() => handleToggleMode(false)}
					className={clsx(
						"p-1.5 rounded-md transition",
						!viewMode ? "bg-purple text-white" : "text-gray-500",
					)}
				>
					<ListIcon size={18} />
				</button>
			</div>
		</div>
	)
}

export default ViewMode
