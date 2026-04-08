"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const AlternativeNames = ({ names = [] }: { names: string[] }) => {
	const filteredNames = names.filter((name) => name && name.trim() !== "")

	const [expanded, setExpanded] = useState(false)

	const visible = expanded ? filteredNames : filteredNames.slice(0, 6)

	if (filteredNames.length === 0) return null

	return (
		<div className="bg-white/5 border border-white/10 rounded-xl p-4">
			<p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">
				Tên khác
			</p>

			<motion.div layout className="flex flex-wrap gap-2 overflow-hidden">
				<AnimatePresence mode="popLayout">
					{visible.map((name, i) => (
						<motion.span
							key={name + i}
							layout
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.2 }}
							className="text-[11px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300"
						>
							{name}
						</motion.span>
					))}
				</AnimatePresence>
			</motion.div>

			{filteredNames.length > 6 && (
				<button
					onClick={() => setExpanded(!expanded)}
					className="mt-3 text-xs text-purple-400 hover:text-purple-300 transition"
				>
					{expanded ? "Thu gọn" : "Xem thêm"}
				</button>
			)}
		</div>
	)
}

export default AlternativeNames
