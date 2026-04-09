export const FilmCarouselSkeleton = () => {
	return (
		<div className="flex gap-4 w-full overflow-hidden">
			{[...Array(4)].map((_, i) => (
				<div
					key={i}
					className="aspect-video w-[80%] md:w-[45%] lg:w-[32%] shrink-0 bg-white/5 animate-pulse rounded-xl border border-white/10 shadow-inner"
				/>
			))}
		</div>
	)
}
