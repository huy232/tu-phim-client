import clsx from "clsx"
import { LucideIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface CompactToggleProps {
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
}: CompactToggleProps) => (
	<div
		className={clsx(
			"flex items-stretch transition-all duration-200 border rounded-lg overflow-hidden",
			active
				? activeClass
				: "bg-white/5 border-white/10 text-gray-500 hover:text-white",
		)}
	>
		{/* NÚT BÊN TRÁI */}
		<div
			onClick={onClick}
			className={clsx(
				"flex items-center gap-1.5 px-2.5 py-1.5 cursor-pointer transition-all",
				active ? "hover:bg-white/5" : "",
			)}
		>
			<Icon
				size={14}
				className={clsx(
					active && label.toLowerCase().includes("auto") && "animate-spin-slow",
				)}
			/>
			<span className="text-[9px] font-bold uppercase tracking-tight leading-none">
				{label}
			</span>
		</div>

		{/* NÚT BÊN PHẢI (INPUT) */}
		{active && (
			<div className="flex items-center px-2 border-l border-current/20">
				<input
					type="number"
					value={offset || 0}
					onChange={(e) => {
						const val = parseInt(e.target.value)

						if (isNaN(val)) {
							setOffset(0)
							return
						}
						const limitedVal = Math.min(Math.max(0, val), 120)

						setOffset(limitedVal)
					}}
					min={0}
					max={120}
					className={clsx(
						"bg-transparent w-7 text-[10px] text-center outline-none font-bold appearance-none",
						colorCode,
					)}
					style={{ MozAppearance: "textfield" }}
				/>
				<span className="text-[8px] opacity-60 font-bold ml-0.5 leading-none">
					S
				</span>
			</div>
		)}
	</div>
)

export default CompactToggle
