export default function SectionSkeleton() {
	return (
		<div className="w-full space-y-4 animate-pulse">
			<div className="h-8 w-48 bg-white/10 rounded-md" />

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="space-y-2">
						<div className="aspect-[2/3] w-full bg-white/10 rounded-lg" />
						<div className="h-4 w-3/4 bg-white/10 rounded" />
						<div className="h-4 w-1/2 bg-white/10 rounded" />
					</div>
				))}
			</div>
		</div>
	)
}
