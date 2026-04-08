"use client"
const InfoCardSkeleton = () => (
	<div className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse space-y-3">
		<div className="h-4 bg-white/10 rounded w-1/3"></div>
		<div className="flex gap-2">
			<div className="h-10 w-10 bg-white/10 rounded-lg"></div>
			<div className="h-10 w-10 bg-white/10 rounded-lg"></div>
		</div>
	</div>
)

export default InfoCardSkeleton
