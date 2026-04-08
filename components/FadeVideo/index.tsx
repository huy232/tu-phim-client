"use client"
import clsx from "clsx"
import { useEffect, useState } from "react"

const FadeVideo = ({ videoArray }: { videoArray: string[] }) => {
	const [active, setActive] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setActive((prev) => (prev + 1) % videoArray.length)
		}, 3000)

		return () => clearInterval(interval)
	}, [videoArray.length])

	return (
		<div className="absolute inset-0 pointer-events-none">
			{videoArray.map((src, index) => (
				<video
					key={src}
					src={src}
					autoPlay
					muted
					loop
					playsInline
					className={clsx(
						"absolute inset-0 w-full h-full object-cover blur-[2px] scale-105 transition-opacity duration-2000",
						index === active ? "opacity-50" : "opacity-0",
					)}
				/>
			))}
		</div>
	)
}

export default FadeVideo
