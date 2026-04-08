"use client"
import { Dropdown } from "@/assets/icons"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import React, { useEffect, useState } from "react"

interface NavItem {
	id: string
	name: string
	slug: string
}

interface NavDropdownProps {
	title: string
	routePrefix: string
	isOpen: boolean
	onToggle: () => void
	items: NavItem[]
}

const NavDropdown = ({
	title,
	routePrefix,
	isOpen,
	onToggle,
	items,
}: NavDropdownProps) => {
	return (
		<li
			className="relative list-none"
			onMouseEnter={() => window.innerWidth >= 1024 && onToggle()}
			onMouseLeave={() => window.innerWidth >= 1024 && onToggle()}
			onClick={(e) => {
				if (window.innerWidth < 1024) {
					e.stopPropagation()
					onToggle()
				}
			}}
		>
			<div className="flex items-center justify-between lg:justify-start gap-1 cursor-pointer select-none py-2 lg:py-1 group">
				<span className="group-hover:text-purple-400 transition-colors uppercase tracking-widest text-sm md:text-[9px] lg:text-[10px] xl:text-[11px]">
					{title}
				</span>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<Dropdown className="w-3 h-3 lg:w-4 lg:h-4 fill-current opacity-50" />
				</motion.div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={
							window.innerWidth < 1024
								? { height: 0, opacity: 0 }
								: { opacity: 0, y: 10, scale: 0.95 }
						}
						animate={
							window.innerWidth < 1024
								? { height: "auto", opacity: 1 }
								: { opacity: 1, y: 0, scale: 1 }
						}
						exit={
							window.innerWidth < 1024
								? { height: 0, opacity: 0 }
								: { opacity: 0, y: 10, scale: 0.95 }
						}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="relative lg:absolute lg:top-full lg:right-0 z-50 lg:pt-3 w-full lg:w-max min-w-full lg:min-w-112.5 overflow-hidden"
					>
						<div className="hidden lg:block absolute top-0 left-0 w-full h-3" />

						<div className="p-1 bg-[#0a0a0a]/95 border border-purple-500/10 lg:border-purple-500/20 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
							<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1 p-2 lg:px-4 lg:py-2">
								{items.map((item, index) => (
									<Link
										key={item.id || index}
										href={`/${routePrefix}/${item.slug}`}
										className="relative group/item px-3 py-2 rounded-lg hover:bg-purple-500/10 transition-all flex items-center"
										onClick={(e) => e.stopPropagation()}
									>
										<span className="text-[10px] lg:text-[11px] text-gray-500 lg:text-gray-400 group-hover/item:text-purple-300 transition-colors whitespace-nowrap">
											{item.name}
										</span>
										<div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-purple-500 group-hover/item:h-1/2 transition-all duration-300" />
									</Link>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</li>
	)
}

export default NavDropdown
