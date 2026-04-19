export const SkeletonCard = () => (
	<div className="flex flex-col animate-pulse mt-8">
		<div className="relative aspect-2/3 w-full bg-white/5 rounded-xl border border-white/10 overflow-hidden">
			<div className="absolute top-2 right-2 w-12 h-4 bg-white/10 rounded-full" />
			<div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/10 rounded border border-white/5" />
		</div>

		<div className="flex flex-col gap-2 px-1 mt-2">
			<div className="h-4 w-20 bg-white/10 rounded-sm border-l-2 border-white/20" />
			<div className="space-y-2 mt-1">
				<div className="h-3 bg-white/10 rounded w-full" />
				<div className="h-2 bg-white/5 rounded w-2/3" />
			</div>
		</div>
	</div>
)

export const SkeletonGrid = ({ count = 10 }: { count?: number }) => (
	<>
		{Array.from({ length: count }).map((_, i) => (
			<SkeletonCard key={i} />
		))}
	</>
)
