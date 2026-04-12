"use client"
import { Dropdown } from "@/assets/icons"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import React, { useRef } from "react"

interface NavItem {
	id: string
	name: string
	slug: string
}

interface NavDropdownProps {
	title: string
	menuKey: string
	routePrefix: string
	isOpen: boolean
	onOpen: (key: string) => void
	onClose: (key: string) => void
	onToggle: (key: string) => void
	items: NavItem[]
}

const NavDropdown = ({
	title,
	menuKey,
	routePrefix,
	isOpen,
	onOpen,
	onClose,
	onToggle,
	items,
}: NavDropdownProps) => {
	const isDesktop = useMediaQuery("(min-width: 1024px)")
	const closeTimeout = useRef<NodeJS.Timeout | null>(null)

	const handleMouseEnter = () => {
		if (!isDesktop) return
		if (closeTimeout.current) clearTimeout(closeTimeout.current)
		onOpen(menuKey)
	}

	const handleMouseLeave = () => {
		if (!isDesktop) return
		closeTimeout.current = setTimeout(() => {
			onClose(menuKey)
		}, 120)
	}

	const handleToggle = (e: React.MouseEvent) => {
		e.stopPropagation()
		onToggle(menuKey)
	}

	return (
		<li
			className="relative list-none"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* TRIGGER */}
			<div
				className="flex items-center justify-between cursor-pointer select-none py-2 group"
				onClick={handleToggle}
			>
				<span className="group-hover:text-purple-400 transition-colors uppercase tracking-widest text-sm lg:text-[11px]">
					{title}
				</span>

				<motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
					<Dropdown className="w-4 h-4 opacity-50" />
				</motion.div>
			</div>

			{/* DROPDOWN */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={
							isDesktop
								? { opacity: 0, y: 10, scale: 0.95 }
								: { height: 0, opacity: 0 }
						}
						animate={
							isDesktop
								? { opacity: 1, y: 0, scale: 1 }
								: { height: "auto", opacity: 1 }
						}
						exit={
							isDesktop
								? { opacity: 0, y: 10, scale: 0.95 }
								: { height: 0, opacity: 0 }
						}
						className={clsx(
							"overflow-hidden",
							isDesktop
								? "absolute top-full right-0 z-50 pt-3 w-max min-w-72"
								: "w-full mt-2",
						)}
					>
						{isDesktop && (
							<div className="absolute -top-3 left-0 right-0 h-3" />
						)}

						<div className="p-2 bg-[#0a0a0a]/95 border border-purple-500/10 rounded-xl w-full">
							<div className="max-h-72 overflow-y-auto custom-scrollbar px-2">
								<div
									className={clsx(
										"grid gap-1",
										isDesktop ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-2",
									)}
								>
									{items.map((item) => (
										<Link
											key={item.slug}
											href={`/${routePrefix}/${item.slug}`}
											className="px-3 py-2 rounded-lg hover:bg-purple-500/10 text-[11px] wrap-break-word"
										>
											{item.name}
										</Link>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</li>
	)
}

export default NavDropdown
