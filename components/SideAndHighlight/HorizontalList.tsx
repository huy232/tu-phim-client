import FilmCardTopAnimate from "./FilmCardTopAnimate"

interface Props {
	items: FilmInfo[]
	activeId: string | null
	setActiveId: (id: string) => void
	mode?: "grid" | "scroll"
}

const HorizontalList = ({
	items,
	activeId,
	setActiveId,
	mode = "grid",
}: Props) => {
	if (mode === "scroll") {
		return (
			<div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-1">
				{items.map((film) => (
					<div
						key={film._id}
						className="w-[70%] sm:w-[240px] shrink-0 snap-start"
					>
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

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{items.map((film) => (
				<div key={film._id}>
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
