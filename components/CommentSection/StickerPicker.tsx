"use client"

import { useState, useRef, useEffect } from "react"
import { Smile } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SiteImage from "../ui/site-image"
import { createPortal } from "react-dom"

interface StickerPickerProps {
	stickers: Sticker[]
	onSelect: (code: string) => void
}

const StickerPicker = ({ stickers, onSelect }: StickerPickerProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const pickerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				pickerRef.current &&
				!pickerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsOpen(false)
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [])

	const toggle = () => setIsOpen((v) => !v)

	return (
		<div className="relative" ref={pickerRef}>
			{/* BUTTON */}
			<button
				type="button"
				onClick={toggle}
				className={`p-2 rounded-xl transition-all ${
					isOpen
						? "bg-purple-500/20 text-purple-400"
						: "bg-white/5 text-white/30 hover:bg-white/10"
				}`}
			>
				<Smile size={18} />
			</button>

			{/* PORTAL */}
			{typeof window !== "undefined" &&
				createPortal(
					<AnimatePresence>
						{isOpen && (
							<>
								{/* BACKDROP */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="fixed inset-0 bg-black/60 z-[999]"
									onClick={() => setIsOpen(false)}
								/>

								{/* PANEL (RESPONSIVE FIX) */}
								<motion.div
									initial={{ opacity: 0, scale: 0.95, y: 20 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.95, y: 20 }}
									transition={{ duration: 0.15 }}
									className="fixed z-[1000] bottom-0 left-0 right-0 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-[360px] max-h-[70vh 	bg-zinc-900 border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-black/60 p-4 flex flex-col"
									onClick={(e) => e.stopPropagation()}
								>
									{/* HEADER */}
									<div className="flex items-center justify-between mb-3">
										<div className="text-[10px] font-black uppercase tracking-widest text-white/30">
											Stickers
										</div>

										<button
											onClick={() => setIsOpen(false)}
											className="text-white/40 hover:text-white text-xs"
										>
											✕
										</button>
									</div>

									{/* GRID */}
									<div className="grid grid-cols-4 sm:grid-cols-5 gap-2 overflow-y-auto pr-1">
										{stickers.map((s) => (
											<button
												key={s.id}
												type="button"
												onClick={() => {
													onSelect(s.code)
													setIsOpen(false)
												}}
												className="
													aspect-square
													p-1
													rounded-lg
													hover:bg-white/5
													active:scale-90
													transition
												"
												title={s.code}
											>
												<SiteImage
													width={24}
													height={24}
													src={s.url}
													alt={s.code}
													className="w-full h-full object-contain"
												/>
											</button>
										))}
									</div>
								</motion.div>
							</>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</div>
	)
}

export default StickerPicker
