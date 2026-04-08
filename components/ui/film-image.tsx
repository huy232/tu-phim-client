import { IMAGE_URL } from "@/constants"
import SiteImage from "./site-image"

interface FilmImageProps {
	image_slug: string
	name: string
	width?: number
	height?: number
	className?: string
	containerClassName?: string
}

export const FilmImage = ({
	image_slug,
	name,
	width = 320,
	height = 480,
	containerClassName,
	...props
}: FilmImageProps) => {
	return (
		<SiteImage
			{...props}
			src={`${IMAGE_URL}/${image_slug}`}
			width={width}
			height={height}
			alt={name}
			containerClassName={containerClassName}
		/>
	)
}
