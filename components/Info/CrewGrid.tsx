"use client"
const CrewGrid = ({ groupCrew }: { groupCrew: Record<string, Person[]> }) => {
	const hasData = groupCrew && Object.keys(groupCrew).length > 0

	return (
		<div className="bg-white/5 border border-white/10 rounded-xl p-4">
			<p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">
				Đội ngũ sản xuất
			</p>

			{!hasData ? (
				<p className="text-xs text-gray-500 italic">Đang cập nhật...</p>
			) : (
				<div className="max-h-50 overflow-y-auto pr-1 custom-scrollbar scroll-smooth grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
					{Object.entries(groupCrew).map(([dept, list]) => (
						<div key={dept}>
							<p className="text-xs text-gray-400">{dept}</p>
							<p className="text-sm text-white line-clamp-2">
								{list
									.slice(0, 4)
									.map((p) => p.name)
									.join(", ")}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default CrewGrid
