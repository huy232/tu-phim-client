export default function FilmListSkeleton() {
	return (
		<div className="mx-auto my-8 px-4 flex items-center gap-4 w-full overflow-hidden">
			<div className="w-10 h-10 rounded-full border border-white/5 shrink-0 hidden md:flex" />

			{/* Container chính */}
			<div className="flex-1 flex gap-4 overflow-hidden items-start">
				{[...Array(10)].map((_, i) => (
					<div
						key={i}
						className="flex flex-col gap-2 animate-pulse shrink-0 
							w-[calc(50%-8px)] 
							sm:w-[calc(33.33%-11px)] 
							md:w-[calc(25%-12px)] 
							lg:w-[calc(16.66%-14px)] 
							xl:w-[calc(12.5%-14px)]"
					>
						<div className="relative aspect-2/3 w-full bg-white/5 rounded-xl border border-white/10" />
						<div className="h-3 bg-white/10 rounded w-3/4 mx-auto" />
					</div>
				))}
			</div>

			<div className="w-10 h-10 rounded-full border border-white/5 shrink-0 hidden md:flex" />
		</div>
	)
}
