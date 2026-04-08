interface ColorTheme {
	text: string
	bg: string
	bgSoft: string
	border: string
	from: string
	glow: string
	shadow: string
}

type ColorKey =
	| "purple"
	| "orange"
	| "blue"
	| "green"
	| "pink"
	| "red"
	| "yellow"

export const colorVariants: Record<ColorKey, ColorTheme> = {
	purple: {
		text: "text-purple-400",
		bg: "bg-purple-600",
		bgSoft: "bg-purple-500/10",
		border: "border-purple-500/20",
		from: "from-purple-500/50",
		glow: "bg-purple-600/5",
		shadow: "shadow-[0_0_15px_rgba(168,85,247,0.5)]",
	},
	orange: {
		text: "text-orange-400",
		bg: "bg-orange-600",
		bgSoft: "bg-orange-500/10",
		border: "border-orange-500/20",
		from: "from-orange-500/50",
		glow: "bg-orange-600/5",
		shadow: "shadow-[0_0_15px_rgba(249,115,22,0.5)]",
	},
	blue: {
		text: "text-blue-400",
		bg: "bg-blue-600",
		bgSoft: "bg-blue-500/10",
		border: "border-blue-500/20",
		from: "from-blue-500/50",
		glow: "bg-blue-600/5",
		shadow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
	},
	green: {
		text: "text-emerald-400",
		bg: "bg-emerald-600",
		bgSoft: "bg-emerald-500/10",
		border: "border-emerald-500/20",
		from: "from-emerald-500/50",
		glow: "bg-emerald-600/5",
		shadow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
	},
	pink: {
		text: "text-pink-400",
		bg: "bg-pink-600",
		bgSoft: "bg-pink-500/10",
		border: "border-pink-500/20",
		from: "from-pink-500/50",
		glow: "bg-pink-600/5",
		shadow: "shadow-[0_0_15px_rgba(236,72,153,0.5)]",
	},
	red: {
		text: "text-rose-400",
		bg: "bg-rose-600",
		bgSoft: "bg-rose-500/10",
		border: "border-rose-500/20",
		from: "from-rose-500/50",
		glow: "bg-rose-600/5",
		shadow: "shadow-[0_0_15px_rgba(244,63,94,0.5)]",
	},
	yellow: {
		text: "text-amber-400",
		bg: "bg-amber-600",
		bgSoft: "bg-amber-500/10",
		border: "border-amber-500/20",
		from: "from-amber-500/50",
		glow: "bg-amber-600/5",
		shadow: "shadow-[0_0_15px_rgba(245,158,11,0.5)]",
	},
}
