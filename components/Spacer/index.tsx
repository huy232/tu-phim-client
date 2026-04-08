interface SpacerProps {
	x?: number | string
	y?: number | string
}

export const Spacer = ({ x = 1, y = 1 }: SpacerProps) => {
	const width = typeof x === "number" ? `${x * 4}px` : x
	const height = typeof y === "number" ? `${y * 4}px` : y

	return (
		<div
			style={{ width, height, flexShrink: 0 }}
			aria-hidden="true"
			className="pointer-events-none"
		/>
	)
}
