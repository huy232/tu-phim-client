"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener("scroll", toggleVisibility)
		return () => window.removeEventListener("scroll", toggleVisibility)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.5, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.5, y: 20 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={scrollToTop}
					className="fixed bottom-8 right-8 z-100 p-3 rounded-full bg-purple text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-white/10 group overflow-hidden"
				>
					<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

					<ChevronUp className="relative z-10 w-4 h-4" />
				</motion.button>
			)}
		</AnimatePresence>
	)
}

export default ScrollToTop
