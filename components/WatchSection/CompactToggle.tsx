import clsx from "clsx"
import { LucideIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface Props {
	active: boolean
	onClick: () => void
	icon: LucideIcon
	label: string
	activeClass: string
	offset: number
	setOffset: Dispatch<SetStateAction<number>>
	colorCode: string
}

const CompactToggle = ({
	active,
	onClick,
	icon: Icon,
	label,
	activeClass,
	offset,
	setOffset,
	colorCode,
}: Props) => (
	<div
		className={clsx(
			"flex items-center transition-all duration-200 border rounded-lg overflow-hidden shrink-0",
			active
				? activeClass
				: "bg-white/5 border-white/10 text-gray-500 hover:text-white",
		)}
	>
		{/* BUTTON */}
		<div
			onClick={onClick}
			className="flex items-center gap-1 px-2 py-1.5 cursor-pointer"
		>
			<Icon size={14} />
			<span className="text-[9px] font-bold uppercase hidden sm:inline">
				{label}
			</span>
		</div>

		{/* INPUT */}
		{active && (
			<div className="flex items-center px-1.5 border-l border-current/20">
				<input
					type="number"
					value={offset || 0}
					onChange={(e) => {
						const val = parseInt(e.target.value)
						if (isNaN(val)) return setOffset(0)
						setOffset(Math.min(Math.max(0, val), 120))
					}}
					className={clsx(
						"bg-transparent w-6 text-[10px] text-center outline-none font-bold",
						colorCode,
					)}
				/>
				<span className="text-[8px] opacity-60 ml-0.5">s</span>
			</div>
		)}
	</div>
)

export default CompactToggle
