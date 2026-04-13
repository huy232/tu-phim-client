"use client"
import { colorVariants } from "@/constants/colorPalette"
import clsx from "clsx"
import { motion } from "framer-motion"

type ColorKey =
	| "purple"
	| "orange"
	| "blue"
	| "green"
	| "pink"
	| "red"
	| "yellow"

interface PageHeadingProps {
	slug: string
	displayTitle: string
	type: string
	color?: ColorKey | string
}

const PageHeading = ({
	slug,
	displayTitle,
	type,
	color = "purple",
}: PageHeadingProps) => {
	const theme = colorVariants[color as ColorKey] || colorVariants.purple

	return (
		<header className="mb-12 relative group">
			{/* Glow Background */}
			<div
				className={clsx(
					"absolute -top-24 left-1/2 -translate-x-1/2 w-full h-125 blur-[120px] -z-10 pointer-events-none",
					theme.glow,
				)}
			/>

			<div className="relative z-10 space-y-4">
				{/* Breadcrumb Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className={clsx(
						"flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] font-black",
						theme.text,
					)}
				>
					<span className="opacity-40">Cùng khám phá</span>
					<motion.span
						initial={{ width: 0 }}
						animate={{ width: 40 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className={clsx("h-px bg-linear-to-r to-transparent", theme.from)}
					/>
					<span
						className={clsx(
							"px-2 py-0.5 rounded-sm border",
							theme.border,
							theme.bgSoft,
						)}
					>
						{type || "Catalog"}
					</span>
				</motion.div>

				{/* Title Section */}
				<div className="overflow-hidden">
					<motion.h1
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
						className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none"
					>
						<span className="inline-block text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/30 p-3">
							{displayTitle}
						</span>
					</motion.h1>
				</div>

				{/* Metadata & Scanning Line */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="flex items-center gap-5"
				>
					<div className="hidden md:inline-block relative h-1 w-20 bg-white/5 overflow-hidden rounded-full">
						<motion.div
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ delay: 0.8, duration: 1 }}
							className={clsx("absolute inset-0 origin-left", theme.bg)}
						/>
						<motion.div
							animate={{ x: ["-100%", "200%"] }}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: "linear",
								delay: 1.5,
							}}
							className="absolute top-0 bottom-0 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent z-10"
						/>
					</div>

					<div className="flex flex-col">
						<span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 font-mono flex items-center gap-2">
							<span
								className={clsx("w-1 h-1 rounded-full animate-pulse", theme.bg)}
							/>
							System Path: root/{slug}
						</span>
					</div>
				</motion.div>
			</div>

			{/* Decorative Vertical Line */}
			<motion.div
				initial={{ height: 0 }}
				animate={{ height: "100%" }}
				transition={{ duration: 1 }}
				className={clsx(
					"absolute -left-4 top-0 w-px bg-linear-to-b via-transparent to-transparent hidden md:block",
					theme.from,
				)}
			/>
		</header>
	)
}

export default PageHeading
