"use client"

import Image, { ImageProps, StaticImageData } from "next/image"
import { useState, useRef, useEffect } from "react"
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
const MAX_RETRIES = 3

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
	const [imgSrc, setImgSrc] = useState<string>(normalized)
	const [retryCount, setRetryCount] = useState(0)

	const [prevSrc, setPrevSrc] = useState(normalized)

	if (normalized !== prevSrc) {
		setPrevSrc(normalized)
		setImgSrc(normalized)
		setRetryCount(0)
		setIsLoaded(false)
	}

	const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const handleError = () => {
		if (retryCount < MAX_RETRIES) {
			const nextRetry = retryCount + 1

			if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current)

			retryTimeoutRef.current = setTimeout(() => {
				setRetryCount(nextRetry)

				const separator = normalized.includes("?") ? "&" : "?"
				setImgSrc(`${normalized}${separator}retry=${nextRetry}`)
			}, 1000 * nextRetry)
		} else {
			if (imgSrc !== FALLBACK_IMAGE) {
				setImgSrc(FALLBACK_IMAGE)
				setIsLoaded(true)
			}
		}
	}

	useEffect(() => {
		return () => {
			if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current)
		}
	}, [])

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
				src={imgSrc}
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
				onLoad={() => setIsLoaded(true)}
				onError={handleError}
				key={imgSrc}
			/>
		</div>
	)
}

export default SiteImage
