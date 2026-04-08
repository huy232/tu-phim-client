import { formatDateVN } from "@/utilities"
import clsx from "clsx"
import { LucideIcon } from "lucide-react"

interface TimelineItemProps {
	icon: LucideIcon
	label: string
	date: Date | undefined
	colorClass: string
}

export const TimelineItem = ({
	icon: Icon,
	label,
	date,
	colorClass,
}: TimelineItemProps) => {
	if (!date) return null
	return (
		<div className="flex items-start gap-3">
			<Icon size={16} className={clsx("mt-1 shrink-0", colorClass)} />
			<div className="min-w-0">
				<p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight leading-none mb-1">
					{label}
				</p>
				<p className="text-xs text-white/80 font-medium truncate">
					{formatDateVN(date)}
				</p>
			</div>
		</div>
	)
}
