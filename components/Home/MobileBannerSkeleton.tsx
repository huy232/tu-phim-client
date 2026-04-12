"use client"

const MobileBannerSkeleton = () => {
	return (
		<div className="h-[320px] bg-[#0a0a0a] px-4 flex items-center">
			<div className="w-full h-full rounded-xl overflow-hidden relative">
				{/* IMAGE */}
				<div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] animate-pulse" />

				{/* OVERLAY */}
				<div className="absolute inset-0 bg-black/50" />

				{/* CONTENT */}
				<div className="absolute bottom-0 p-4 space-y-2 w-full">
					<div className="h-5 w-3/4 bg-white/10 rounded" />
					<div className="h-4 w-1/2 bg-white/10 rounded" />

					<div className="flex gap-2 mt-2">
						<div className="h-6 w-20 bg-purple/30 rounded" />
						<div className="h-6 w-20 bg-white/10 rounded" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MobileBannerSkeleton
