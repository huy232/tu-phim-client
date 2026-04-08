"use client"
import Image, { ImageProps, StaticImageData } from "next/image"
import { useState } from "react"
import clsx from "clsx"

interface SiteImageProps extends Omit<ImageProps, "src"> {
	src: string | StaticImageData
	containerClassName?: string
}

const normalizeSrc = (src: string | StaticImageData): string => {
	return typeof src === "string" ? src : src.src
}
const SiteImage = ({
	className,
	containerClassName,
	alt,
	height,
	width,
	src,
	...props
}: SiteImageProps) => {
	const FALLBACK_IMAGE = "/img/not-found.webp"

	const [isLoaded, setIsLoaded] = useState(false)
	const [imgSrc, setImgSrc] = useState<string>(normalizeSrc(src))

	return (
		<div className={clsx("relative overflow-hidden", containerClassName)}>
			{!isLoaded && (
				<div className="absolute inset-0 z-10 animate-pulse bg-neutral-800" />
			)}

			<Image
				{...props}
				height={height}
				width={width}
				alt={alt}
				src={imgSrc}
				className={clsx(
					className,
					"transition-all duration-700 ease-in-out",
					isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm",
				)}
				loading="lazy"
				onLoad={() => setIsLoaded(true)}
				onError={() => {
					if (imgSrc !== FALLBACK_IMAGE) {
						setImgSrc(FALLBACK_IMAGE)
					}
				}}
				key={imgSrc}
			/>
		</div>
	)
}

export default SiteImage
