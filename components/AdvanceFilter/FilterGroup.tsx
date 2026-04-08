import { FilterTag } from "./FilterTag"

interface BaseItem {
	_id?: string
	slug: string
	name?: string
	year?: string | number
}

interface FilterGroupProps {
	label: string
	items: BaseItem[]
	activeItems: string[]
	onToggle: (slug: string) => void
}

export const FilterGroup = ({
	label,
	items,
	activeItems,
	onToggle,
}: FilterGroupProps) => (
	<div>
		<label className="text-[10px] font-bold text-purple-400 uppercase mb-3 block tracking-widest">
			{label}
		</label>
		<div className="flex flex-wrap gap-2">
			{items.map((item) => (
				<FilterTag
					key={item?._id || item?.slug}
					label={(item.name || item.year || "").toString()}
					isActive={activeItems.includes(item.slug)}
					onClick={() => onToggle(item.slug)}
				/>
			))}
		</div>
	</div>
)
