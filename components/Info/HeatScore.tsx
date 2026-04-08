"use client"
import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { Flame } from "lucide-react"

const HeatScore = ({ value }: { value: number }) => {
	const springValue = useSpring(0, { stiffness: 45, damping: 15 })

	const color = useTransform(
		springValue,
		[0, 20, 50, 100],
		["#60a5fa", "#ffffff", "#fbbf24", "#ef4444"],
	)

	const glow = useTransform(
		springValue,
		[0, 50, 100],
		[
			"0px 0px 0px rgba(0,0,0,0)",
			"0px 0px 10px rgba(251, 191, 36, 0.3)",
			"0px 0px 20px rgba(239, 68, 68, 0.6)",
		],
	)

	useEffect(() => {
		springValue.set(value)
	}, [value, springValue])

	const [display, setDisplay] = useState("0.0")
	useEffect(() => {
		return springValue.on("change", (v) => setDisplay(v.toFixed(1)))
	}, [springValue])

	return (
		<motion.div
			style={{ color, textShadow: glow }}
			className="flex items-center gap-1.5 font-black text-lg italic tracking-tighter"
		>
			<motion.span>{display}</motion.span>
			{value > 50 && (
				<motion.div
					animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
					transition={{ repeat: Infinity, duration: 1 }}
				>
					<Flame size={14} className="fill-current" />
				</motion.div>
			)}
		</motion.div>
	)
}

export default HeatScore
