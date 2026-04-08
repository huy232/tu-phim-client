"use client"
import { TMDB_IMAGE_URL } from "@/constants"
import SiteImage from "../ui/site-image"

const CompanyLogo = ({
	title,
	items,
}: {
	title: string
	items: Network[] | Production_Company[]
}) => {
	if (!items || items.length === 0) return null

	return (
		<div className="space-y-3">
			<span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
				{title}
			</span>
			<div className="flex flex-wrap gap-2">
				{items.map((item) => (
					<div key={item.id} className="group relative cursor-default">
						<div className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-lg transition-all duration-300 flex items-center justify-center min-h-8">
							{item.logo_path ? (
								<SiteImage
									src={`${TMDB_IMAGE_URL}/w200${item.logo_path}`}
									alt={item.name}
									className="h-2 w-auto object-contain brightness-110 filter grayscale group-hover:grayscale-0 transition-all duration-500"
									width={80}
									height={20}
									loading="lazy"
									// containerClassName="w-full h-full"
								/>
							) : (
								<span className="text-[10px] text-gray-500 font-medium leading-none text-center max-w-25 block">
									{item.name}
								</span>
							)}
						</div>

						<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#0a0a0a] border border-white/10 text-[9px] px-2 py-1 rounded whitespace-nowrap z-50 shadow-xl pointer-events-none">
							{item.name}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CompanyLogo
