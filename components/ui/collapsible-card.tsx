import { useState } from "react"

export const CollapsibleCard = ({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) => {
	const [open, setOpen] = useState(false)

	return (
		<div className="lg:block">
			<button
				onClick={() => setOpen(!open)}
				className="w-full flex justify-between items-center text-sm text-white bg-white/5 px-3 py-2 rounded-lg lg:hidden"
			>
				{title}
				<span className="text-xs text-gray-400">{open ? "▲" : "▼"}</span>
			</button>

			<div className={open ? "block mt-3" : "hidden lg:block"}>{children}</div>
		</div>
	)
}
