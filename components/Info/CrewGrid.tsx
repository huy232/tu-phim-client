"use client"

import { AnonymousUser } from "@/assets/icons"
import SiteImage from "../ui/site-image"

const CrewGrid = ({ groupCrew }: { groupCrew: NewActor[] }) => {
	const hasData = groupCrew.length > 0

	return (
		<div className="bg-white/5 border border-white/10 rounded-xl p-4">
			<p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">
				Đội ngũ sản xuất
			</p>

			{!hasData ? (
				<p className="text-xs text-gray-500 italic">Đang cập nhật...</p>
			) : (
				<div className="max-h-64 overflow-y-auto pr-1 custom-scrollbar scroll-smooth">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{groupCrew.map((p, idx) => (
							<div
								key={p.credit_id || `${p.id}-${idx}`}
								className="flex items-center gap-2 bg-white/5 p-2 rounded-lg min-w-0"
							>
								{p.profile_path ? (
									<SiteImage
										src={p.profile_path}
										className="w-10 h-10 rounded-full object-cover shrink-0"
										alt={p.name}
										width={40}
										height={40}
										loading="lazy"
									/>
								) : (
									<AnonymousUser className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
								)}

								<div className="min-w-0 flex-1">
									{/* Tên */}
									<p className="text-white text-sm truncate">{p.name}</p>

									{/* Phòng ban bằng tiếng Việt */}
									{p.department_vi && (
										<p className="text-gray-500 text-[11px] truncate">
											{p.department_vi}
										</p>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default CrewGrid
