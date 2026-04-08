import React from "react"

export const PaginationIconButton = ({
	disabled,
	onClick,
	icon,
	label,
}: {
	disabled: boolean
	onClick: () => void
	icon: React.ReactNode
	label: string
}) => (
	<button
		disabled={disabled}
		onClick={onClick}
		title={label}
		className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
	>
		{icon}
	</button>
)
