import clsx from "clsx"
import { LucideIcon } from "lucide-react"

interface BadgeStatusProps {
	active: boolean | undefined
	icon: LucideIcon
	label: string
	activeText: string
	inactiveText: string
	theme: "green" | "blue" | "amber"
}

export const BadgeStatus = ({
	active,
	icon: Icon,
	label,
	activeText,
	inactiveText,
	theme,
}: BadgeStatusProps) => {
	const themes = {
		green: active
			? "bg-green-500/10 border-green-500/20 text-green-400"
			: "bg-white/5 border-transparent opacity-40 text-gray-600",
		blue: active
			? "bg-blue-500/10 border-blue-500/20 text-blue-400"
			: "bg-white/5 border-transparent opacity-40 text-gray-600",
		amber: active
			? "bg-amber-500/10 border-amber-500/20 text-amber-400"
			: "bg-white/5 border-transparent opacity-40 text-gray-600",
	}

	return (
		<div
			className={clsx(
				"flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-500",
				themes[theme],
			)}
		>
			<Icon
				size={16}
				className={clsx(
					"transition-transform duration-500",
					active && "scale-110",
				)}
			/>
			<span className="text-[9px] mt-1 uppercase text-gray-500 font-bold tracking-tighter">
				{label}
			</span>
			<span className="text-[10px] font-black mt-0.5 whitespace-nowrap">
				{active ? activeText : inactiveText}
			</span>
		</div>
	)
}
