"use client"
import { useState } from "react"
import Banner from "./Banner"
import VerticalList from "./VerticalList"
import HorizontalList from "./HorizontalList"

const SideAndHighlight = ({ items }: { items: FilmInfo[] }) => {
	const [activeId, setActiveId] = useState<string | null>(null)

	if (!items.length) return null

	const activeFilm = items.find((film) => film._id === activeId) || items[0]

	const topItems = items.slice(0, 5)
	const bottomItems = items.slice(5)

	const allItems = items

	return (
		<div className="w-full space-y-6">
			{/* ================= DESKTOP ================= */}
			<div className="hidden xl:grid grid-cols-12 gap-2 items-stretch">
				{/* LEFT */}
				<div className="col-span-3 flex flex-col justify-center">
					<VerticalList
						items={topItems}
						activeId={activeId}
						setActiveId={setActiveId}
					/>
				</div>

				{/* RIGHT */}
				<div className="col-span-9 flex flex-col h-[660px]">
					<Banner film={activeFilm} />
				</div>
			</div>

			{/* ================= MOBILE / TABLET ================= */}
			<div className="xl:hidden space-y-4">
				{/* Banner */}
				<div className="w-full h-[550px] relative">
					<Banner film={activeFilm} />
				</div>

				<HorizontalList
					items={allItems}
					activeId={activeId}
					setActiveId={setActiveId}
					mode="scroll"
				/>
			</div>

			{/* ================= DESKTOP BOTTOM ================= */}
			<div className="hidden xl:block">
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
