const SkeletonCard = ({ item }: { item: number }) => {
	return (
		<div className="flex gap-4 w-full overflow-hidden">
			{[...Array(item)].map((_, i) => (
				<div
					key={i}
					className="aspect-2/3 w-1/5 shrink-0 bg-white/5 animate-pulse rounded-xl"
				/>
			))}
		</div>
	)
}

export default SkeletonCard
