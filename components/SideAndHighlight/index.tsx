"use client"
import { useState } from "react"
import Banner from "./Banner"
import VerticalList from "./VerticalList"
import HorizontalList from "./HorizontalList"

const SideAndHighlight = ({ items }: { items: FilmInfo[] }) => {
	const [activeId, setActiveId] = useState<string | null>(null)

	const activeFilm = items.find((film) => film._id === activeId) || items[0]

	const topItems = items.slice(0, 5)
	const bottomItems = items.slice(5)

	if (!items.length) return null

	return (
		<div className="w-full space-y-6">
			<div className="grid grid-cols-1 xl:grid-cols-12 gap-2 xl:items-stretch">
				{/* BANNER */}
				<div className="lg:col-span-9 order-1 lg:order-2 flex flex-col h-[660px] sm:h-full">
					<div className="flex-1 h-full min-h-[400px] md:min-h-[550px] relative">
						<Banner film={activeFilm} />
					</div>
				</div>

				<div className="xl:col-span-3 order-2 xl:order-1 flex flex-col xl:justify-center">
					<VerticalList
						items={topItems}
						activeId={activeId}
						setActiveId={setActiveId}
					/>
				</div>
			</div>

			<div className="w-full">
				<HorizontalList
					items={bottomItems}
					activeId={activeId}
					setActiveId={setActiveId}
				/>
			</div>
		</div>
	)
}

export default SideAndHighlight
