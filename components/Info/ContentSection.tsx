"use client"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

const ContentSection = ({ content }: { content: string }) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const [shouldShowButton, setShouldShowButton] = useState(false)
	const contentRef = useRef<HTMLDivElement>(null)

	const LIMIT_HEIGHT = 130

	useEffect(() => {
		if (contentRef.current) {
			setShouldShowButton(contentRef.current.scrollHeight > LIMIT_HEIGHT)
		}
	}, [content])

	return (
		<div className="mt-6 w-full">
			<motion.div
				initial={false}
				animate={{
					height: !shouldShowButton
						? "auto"
						: isExpanded
							? "auto"
							: LIMIT_HEIGHT,
				}}
				transition={{ duration: 0.4, ease: "circOut" }}
				style={{
					WebkitMaskImage:
						isExpanded || !shouldShowButton
							? "none"
							: "linear-gradient(to bottom, black 60%, transparent 100%)",
				}}
				className="relative overflow-hidden"
			>
				<div
					ref={contentRef}
					className="bg-white/2 border border-white/5 rounded-xl p-5"
				>
					<div
						className="text-xs md:text-sm text-gray-400 leading-relaxed font-extralight"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</div>
			</motion.div>

			{shouldShowButton && (
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="ml-auto mt-2 flex items-center gap-2 group cursor-pointer py-2 px-1"
				>
					<div className="h-px w-6 bg-purple-500/40 group-hover:w-10 group-hover:bg-purple-500 transition-all duration-300" />
					<span className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-500/80 group-hover:text-purple-300 transition-colors">
						{isExpanded ? "Rút gọn" : "Xem thêm"}
					</span>
					<motion.span
						animate={{ y: isExpanded ? -1 : 1 }}
						transition={{
							repeat: Infinity,
							duration: 1.2,
							repeatType: "mirror",
						}}
						className="text-[9px] text-purple-500"
					>
						{isExpanded ? "▲" : "▼"}
					</motion.span>
				</button>
			)}
		</div>
	)
}

export default ContentSection
