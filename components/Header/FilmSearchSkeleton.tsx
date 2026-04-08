const FilmSearchSkeleton = () => {
	return (
		<div className="p-10 text-center flex flex-col items-center gap-3">
			<div className="animate-pulse w-10 h-10 bg-purple-500/20 rounded-full" />
			<span className="text-[10px] text-gray-500 animate-pulse uppercase tracking-widest">
				Đang tìm kiếm...
			</span>
		</div>
	)
}

export default FilmSearchSkeleton
