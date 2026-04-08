import SiteImage from "./site-image"

interface WebImageProps {
	image_src: string
	name: string
	width?: number
	height?: number
	className?: string
	containerClassName?: string
}

export const WebImage = ({
	image_src,
	name,
	width = 320,
	height = 480,
	containerClassName,
	...props
}: WebImageProps) => {
	return (
		<SiteImage
			{...props}
			src={image_src}
			width={width}
			height={height}
			alt={name}
			containerClassName={containerClassName}
		/>
	)
}
