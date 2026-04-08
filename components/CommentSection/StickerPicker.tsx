import { useState, useRef, useEffect } from "react"
import { Smile } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SiteImage from "../ui/site-image"

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

	return (
		<div className="relative" ref={pickerRef}>
			{/* Nút bấm để mở bảng chọn */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={`p-2 rounded-xl transition-all ${
					isOpen
						? "bg-purple-500/20 text-purple-400"
						: "bg-white/5 text-white/30 hover:bg-white/10"
				}`}
			>
				<Smile size={18} />
			</button>

			{/* Bảng chọn Sticker */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						className="absolute bottom-full left-0 mb-4 z-10 w-72 p-4 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/50"
						style={{
							isolation: "isolate",
						}}
					>
						<div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3 px-1">
							Stickers
						</div>

						<div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
							{stickers.map((s) => (
								<button
									key={s.id}
									type="button"
									onClick={() => {
										onSelect(s.code)
										setIsOpen(false)
									}}
									className="aspect-square p-1 rounded-lg hover:bg-white/5 transition-all active:scale-90"
									title={s.code}
								>
									<SiteImage
										width={20}
										height={20}
										src={s.url}
										alt={s.code}
										className="w-full h-full object-contain"
									/>
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default StickerPicker
