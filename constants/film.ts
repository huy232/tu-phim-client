export const filmTypeMap: Record<
	string,
	{ label: string; color: string; textColor: string }
> = {
	series: {
		label: "Phim bộ",
		color: "bg-purple/20 text-purple border-purple/30",
		textColor: "text-purple",
	},
	single: {
		label: "Phim lẻ",
		color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
		textColor: "text-blue-400",
	},
	hoathinh: {
		label: "Hoạt hình",
		color: "bg-green-500/20 text-green-400 border-green-500/30",
		textColor: "text-green-400",
	},
	tvshows: {
		label: "TV Show",
		color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
		textColor: "text-pink-400",
	},
}

export const filmStatusMap: Record<
	string,
	{ label: string; color: string; textColor: string }
> = {
	ongoing: {
		label: "Còn tiếp",
		color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
		textColor: "text-yellow-500",
	},
	completed: {
		label: "Hoàn thành",
		color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
		textColor: "text-emerald-400",
	},
	trailer: {
		label: "Chưa chiếu",
		color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
		textColor: "text-gray-400",
	},
}
