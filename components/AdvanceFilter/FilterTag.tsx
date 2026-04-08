export const FilterTag = ({
	label,
	isActive,
	onClick,
}: {
	label: string
	isActive: boolean
	onClick: () => void
}) => (
	<button
		onClick={onClick}
		className={`px-3 py-1.5 rounded-md text-[10px] transition-all border ${
			isActive
				? "bg-purple-600 border-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
				: "border-white/10 text-gray-400 hover:border-purple-500/50 hover:text-gray-200"
		}`}
	>
		{label}
	</button>
)
