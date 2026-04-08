import { AnonymousUser } from "@/assets/icons"
import { formatCharacter, TMDB_IMAGE_URL } from "@/constants"
import SiteImage from "../ui/site-image"
const CastGrid = ({ cast }: { cast: Person[] }) => {
	return (
		<div className="bg-white/5 border border-white/10 rounded-xl p-4">
			<p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">
				Diễn viên
			</p>

			<div className="max-h-64 overflow-y-auto pr-1 custom-scrollbar scroll-smooth">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
					{cast.length > 0 ? (
						cast.map((p) => (
							<div
								key={p.tmdb_people_id}
								className="flex items-center gap-2 bg-white/5 p-2 rounded-lg min-w-0"
							>
								{p.profile_path ? (
									<SiteImage
										src={`${TMDB_IMAGE_URL}/w185${p.profile_path}`}
										className="w-10 h-10 rounded-full object-cover shrink-0"
										alt={p.name}
										width={40}
										height={40}
										loading="lazy"
									/>
								) : (
									<AnonymousUser className="w-10 h-10 rounded-full bg-white/10" />
								)}

								<div className="min-w-0 flex-1">
									<p className="text-white text-sm truncate">{p.name}</p>
									{p.character && (
										<p className="text-gray-500 text-[11px] truncate">
											{formatCharacter(p.character)}
										</p>
									)}
								</div>
							</div>
						))
					) : (
						<p className="text-gray-500 italic text-xs">
							Thông tin diễn viên đang được cập nhật...
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default CastGrid
