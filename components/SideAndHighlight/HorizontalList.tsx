import clsx from "clsx"
import React from "react"
import { FilmImage } from "../ui/film-image"
import FilmCardTopAnimate from "./FilmCardTopAnimate"

interface Props {
	items: FilmInfo[]
	activeId: string | null
	setActiveId: (id: string) => void
}

const HorizontalList = ({ items, activeId, setActiveId }: Props) => {
	return (
		<div className="flex flex-wrap justify-center gap-3 lg:grid lg:grid-cols-5 lg:gap-4">
			{items.map((film, index) => (
				<div key={film._id} className="w-[calc(33.33%-0.5rem)] lg:w-full">
					<FilmCardTopAnimate
						film={film}
						isActive={film._id === activeId}
						onClick={setActiveId}
						layout="card"
					/>
				</div>
			))}
		</div>
	)
}

export default HorizontalList
