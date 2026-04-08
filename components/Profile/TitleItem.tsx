import clsx from "clsx"
import { Check, Lock } from "lucide-react"

interface TitleItemProps {
	asset: Asset
	isOwned: boolean
	canUnlock: boolean
	isEquipped: boolean
	onClick: () => void
}

export const TitleItem = ({
	asset,
	isOwned,
	canUnlock,
	isEquipped,
	onClick,
}: TitleItemProps) => {
	const { color, css } = asset.metadata || {}
	const isGradient = color?.includes("linear-gradient")

	return (
		<button
			onClick={onClick}
			className={clsx(
				"group relative px-4 py-3 rounded-xl border transition-all duration-300 text-left min-h-[110px] flex flex-col",
				isEquipped
					? "border-purple-500 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
					: "border-white/10 bg-white/5 hover:border-white/20",
				!isOwned && !canUnlock && "opacity-40",
			)}
		>
			<div className="relative z-10 w-full">
				{/* TITLE: Luôn nằm trên cùng */}
				<span
					className={clsx(
						"text-md uppercase tracking-tight block truncate transition-all duration-500",
						css,
						isGradient && "bg-clip-text text-transparent",
					)}
					style={{
						color: isGradient ? "transparent" : color,
						backgroundImage: isGradient ? color : undefined,
						WebkitBackgroundClip: isGradient ? "text" : undefined,
					}}
				>
					{asset.name}
				</span>

				<span className="text-sm text-zinc-500 font-bold mt-0.5 block opacity-70">
					CẤP {asset.required_level}
				</span>

				<div className="mt-2 min-h-[32px]">
					{asset.description && (
						<p className="text-xs text-zinc-500 leading-tight line-clamp-2 group-hover:text-zinc-300 transition-colors italic">
							{asset.description}
						</p>
					)}
				</div>
			</div>

			<div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

			{isEquipped && (
				<div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center border-2 border-[#0b0b0b] z-20 shadow-lg">
					<Check size={12} className="text-white" strokeWidth={4} />
				</div>
			)}

			{!isOwned && !canUnlock && (
				<div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-[1px] rounded-xl flex items-center justify-center z-20">
					<Lock size={18} className="text-zinc-500/50" />
				</div>
			)}

			<div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-[12px] text-zinc-300 w-52 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-2xl scale-95 group-hover:scale-100">
				<p
					className="font-bold text-white mb-1"
					style={{ color: !isGradient ? color : "#fff" }}
				>
					{asset.name}
				</p>
				<p className="text-zinc-400 leading-relaxed">{asset.description}</p>
				<div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-900" />
			</div>
		</button>
	)
}
