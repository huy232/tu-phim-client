import FilmCardTopAnimate from "./FilmCardTopAnimate"

interface Props {
	items: FilmInfo[]
	activeId: string | null
	setActiveId: (id: string) => void
}

const VerticalList = ({ items, activeId, setActiveId }: Props) => {
	return (
		<div className="flex xl:flex-col gap-3 overflow-x-auto xl:overflow-visible no-scrollbar snap-x snap-mandatory pb-4 xl:pb-0">
			{items.map((film) => (
				<div
					key={film._id}
					className="w-[35vw] md:w-[320px] xl:w-full shrink-0 snap-start"
				>
					<FilmCardTopAnimate
						film={film}
						isActive={film._id === activeId}
						onClick={setActiveId}
						layout="row"
					/>
				</div>
			))}
		</div>
	)
}

export default VerticalList
