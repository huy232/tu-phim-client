export const getRankStyle = (rank: number) => {
	if (rank === 1)
		return {
			textClass:
				"bg-linear-to-br from-yellow-300 via-orange-500 to-red-600 bg-clip-text text-transparent",
			glow: "drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]",
			stroke: "1px rgba(253,224,71,0.3)",
		}
	if (rank === 2)
		return {
			textClass:
				"bg-linear-to-br from-slate-200 via-slate-400 to-slate-500 bg-clip-text text-transparent",
			glow: "drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]",
			stroke: "1px rgba(255,255,255,0.2)",
		}
	if (rank === 3)
		return {
			textClass:
				"bg-linear-to-br from-amber-600 via-amber-700 to-orange-900 bg-clip-text text-transparent",
			glow: "drop-shadow-[0_0_8px_rgba(180,83,9,0.2)]",
			stroke: "1px rgba(251,191,36,0.2)",
		}
	return {
		textClass: "text-white/10",
		glow: "none",
		stroke: "1px rgba(255,255,255,0.1)",
	}
}
