"use client"
import InfoCard from "../InfoCard"
import CompanyLogo from "./CompanyLogo"

const TmdbExtraInfo = ({ tmdbData }: { tmdbData: TMDBData | null }) => {
	if (!tmdbData) return null

	return (
		<div className="space-y-4">
			<InfoCard>
				<div className="grid grid-cols-1 gap-6">
					<div className="flex justify-between items-center border-b border-white/5 pb-4">
						<div className="text-center flex-1 border-r border-white/5">
							<p className="text-gray-500 text-[10px] uppercase">Phổ biến</p>
							<p className="text-purple-400 font-mono font-bold text-lg">
								{tmdbData.popularity?.toFixed(1)}
							</p>
						</div>
						<div className="text-center flex-1">
							<p className="text-gray-500 text-[10px] uppercase">Đánh giá</p>
							<p className="text-yellow-500 font-mono font-bold text-lg">
								{tmdbData.vote_average?.toFixed(1)}{" "}
								<span className="text-[10px] text-gray-600">
									({tmdbData.vote_count})
								</span>
							</p>
						</div>
					</div>

					<CompanyLogo title="Kênh phát sóng" items={tmdbData.networks} />

					<CompanyLogo
						title="Hãng sản xuất"
						items={tmdbData.production_companies}
					/>
				</div>
			</InfoCard>
		</div>
	)
}

export default TmdbExtraInfo
