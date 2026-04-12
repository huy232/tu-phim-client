const DesktopBannerSkeleton = () => {
	return (
		<div className="relative h-[660px] w-full bg-black group overflow-visible">
			<div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111]" />

			<div className="absolute inset-0 bg-black/40" />

			<div className="absolute top-16 left-10 space-y-4 z-10 max-w-md">
				<div className="h-8 w-64 bg-white/10 rounded" />
				<div className="h-4 w-40 bg-white/10 rounded" />
				<div className="h-4 w-52 bg-white/10 rounded" />
			</div>

			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-3">
				{Array.from({ length: 12 }).map((_, i) => (
					<div
						key={i}
						className="w-12 lg:w-16 xl:w-20 aspect-[2/3] rounded-lg bg-white/10 animate-pulse"
					/>
				))}
			</div>
		</div>
	)
}

export default DesktopBannerSkeleton
