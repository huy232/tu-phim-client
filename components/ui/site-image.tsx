"use client"

import Image, { ImageProps, StaticImageData } from "next/image"
import { useState } from "react"
import clsx from "clsx"

interface SiteImageProps extends Omit<ImageProps, "src"> {
	src: string | StaticImageData
	containerClassName?: string
	fill?: boolean
}

const normalizeSrc = (src: string | StaticImageData): string => {
	return typeof src === "string" ? src : src.src
}

const FALLBACK_IMAGE = "/img/not-found.webp"

const SiteImage = ({
	className,
	containerClassName,
	alt,
	height,
	width,
	src,
	fill,
	...props
}: SiteImageProps) => {
	const normalized = normalizeSrc(src)

	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)

	const currentSrc = hasError ? FALLBACK_IMAGE : normalized

	const handleLoad = () => {
		setIsLoaded(true)
	}

	const handleError = () => {
		setHasError(true)
		setIsLoaded(true)
	}

	return (
		<div
			className={clsx(
				"relative overflow-hidden",
				fill && "w-full h-full",
				containerClassName,
			)}
		>
			{!isLoaded && (
				<div className="absolute inset-0 z-10 animate-pulse bg-neutral-900" />
			)}

			<Image
				{...props}
				src={currentSrc}
				alt={alt}
				fill={fill}
				width={!fill ? width : undefined}
				height={!fill ? height : undefined}
				className={clsx(
					className,
					"transition-all duration-500 ease-in-out",
					isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
				)}
				sizes={
					fill
						? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						: undefined
				}
				loading="lazy"
				onLoad={handleLoad}
				onError={handleError}
			/>
		</div>
	)
}

export default SiteImage
