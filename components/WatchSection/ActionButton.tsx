"use client"
import clsx from "clsx"
import { motion, Variants } from "framer-motion"
import { IconType } from "react-icons"

const itemVariants: Variants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1 },
}

interface ActionButtonProps {
	icon: IconType
	label: string
	variant?: "primary" | "secondary" | "ghost"
	onClick?: (e: React.MouseEvent) => void
	className?: string
	loading?: boolean
}

export const ActionButton = ({
	icon: Icon,
	label,
	variant = "ghost",
	onClick,
	className,
	loading = false,
}: ActionButtonProps) => {
	const variantsStyle = {
		primary:
			"bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]",
		secondary:
			"bg-pink-500/20 border-pink-500/40 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.2)]",
		ghost: "bg-white/5 border-white/10 text-gray-400 hover:text-white",
	}

	const hoverColors = {
		primary: {
			bg: "rgba(147, 51, 234, 0.9)",
			border: "rgba(168, 85, 247, 0.8)",
		},
		secondary: {
			bg: "rgba(236, 72, 153, 0.3)",
			border: "rgba(236, 72, 153, 0.6)",
		},
		ghost: { bg: "rgba(255,255,255,0.15)", border: "rgba(255,255,255,0.2)" },
	}

	return (
		<motion.button
			variants={itemVariants}
			disabled={loading}
			whileHover={{
				scale: 1.0,
				backgroundColor: hoverColors[variant].bg,
				borderColor: hoverColors[variant].border,
			}}
			whileTap={{ scale: 0.95 }}
			onClick={onClick}
			className={clsx(
				"flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 border backdrop-blur-sm",
				variantsStyle[variant],
				loading && "opacity-50 cursor-not-allowed",
				className,
			)}
		>
			{loading ? (
				<div className="w-2.5 h-2.5 border border-current border-t-transparent rounded-full animate-spin" />
			) : (
				<Icon
					size={14}
					{...((variant === "primary" || variant === "secondary") && {
						fill: "currentColor",
					})}
				/>
			)}
			<span className="hidden md:inline">{label}</span>
		</motion.button>
	)
}
