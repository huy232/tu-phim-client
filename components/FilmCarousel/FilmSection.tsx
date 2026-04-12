"use client"
import Link from "next/link"
import { BackNavigateIcon, NextNavigateIcon } from "@/assets/icons"
import dynamic from "next/dynamic"
import clsx from "clsx"
import { gradientMaps } from "@/constants/gradient"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface FilmSectionProps {
	title: string
	data: CountryData
	slug: string
	gradientFrom?: string
	position?: string
}

const FilmCarousel = dynamic(() => import("./FilmCarousel"), {
	ssr: false,
	loading: () => (
		<div className="flex gap-4 w-full overflow-hidden">
			{[...Array(5)].map((_, i) => (
				<div
					key={i}
					className="aspect-video w-1/5 shrink-0 bg-white/5 animate-pulse rounded-xl"
				/>
			))}
		</div>
	),
})

const FilmSection = ({
	title,
	data,
	slug,
	gradientFrom = "from-blue-600",
	position = "left",
}: FilmSectionProps) => {
	const safeId = slug.replace(/[^a-z0-9]/gi, "-")
	const nextClass = `next-${safeId}`
	const prevClass = `prev-${safeId}`
	const btnStyles =
		"p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all disabled:opacity-20 cursor-pointer shrink-0"

	const secondaryGradients =
		gradientMaps[gradientFrom] || "via-gray-400 to-gray-600"
	const h2Class = clsx(
		"text-md md:text-2xl font-bold self-start transition-all duration-500",
		"text-transparent bg-clip-text bg-linear-to-br",
		gradientFrom,
		secondaryGradients,
		"bg-[length:250%_auto] animate-gradient-text",
		"drop-shadow-[0_0_8px_rgba(168,85,247,0.2)] transition-all duration-500",
	)

	const sectionPosition = clsx(
		position === "left" && "lg:flex-row",
		position === "right" && "lg:flex-row-reverse",
		"flex flex-col lg:flex-row items-start lg:items-center gap-4",
	)

	return (
		<section className={sectionPosition}>
			<div className="w-full lg:w-1/6 flex flex-col">
				<h2 className={clsx(h2Class)}>{title}</h2>
				<Link href={slug} className="group self-start mt-2">
					<motion.div
						className="flex items-center md:text-xs text-white/50 group-hover:text-white transition-colors"
						whileHover="hover"
					>
						<span className="text-md">Xem thêm</span>

						<motion.span
							variants={{
								initial: { x: -5, opacity: 0 },
								hover: { x: 2, opacity: 1 },
							}}
							transition={{ duration: 0.3, ease: "easeOut" }}
						>
							<ChevronRight size={14} className="ml-1 text-purple-500" />
						</motion.span>
					</motion.div>
				</Link>
			</div>

			<div className="w-full lg:w-5/6 relative overflow-hidden flex items-center gap-2">
				<button className={clsx(prevClass, btnStyles)}>
					<BackNavigateIcon size={20} />
				</button>
				<FilmCarousel
					items={data.items}
					nextClass={nextClass}
					prevClass={prevClass}
				/>
				<button className={clsx(nextClass, btnStyles)}>
					<NextNavigateIcon size={20} />
				</button>
			</div>
		</section>
	)
}

export default FilmSection
