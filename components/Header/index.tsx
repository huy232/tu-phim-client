"use client"
import Link from "next/link"
import FilmSearch from "./FilmSearch"
import NavDropdown from "./NavDropdown"
import { useEffect, useState } from "react"
import { HEADER_CATALOG, LIST_CATALOG, ROUTE } from "@/constants"
import User from "./User"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"

interface HeaderProps {
	initialData: {
		genres: Category[]
		countries: Country[]
	}
}

const Header = ({ initialData }: HeaderProps) => {
	const [activeMenu, setActiveMenu] = useState<string | null>(null)
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const toggleMenu = (menuName: string) => {
		setActiveMenu((prev) => (prev === menuName ? null : menuName))
	}

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		handleScroll()
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<nav
			className={clsx(
				"fixed top-0 w-full z-100 transition-all duration-500 px-2 md:px-6 py-1",
				isScrolled || isMobileMenuOpen
					? "bg-black shadow-2xl"
					: "bg-transparent",
			)}
		>
			<div className="mx-auto flex items-center justify-between">
				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="lg:hidden relative z-110 px-2 py-1 group"
				>
					<div className="flex flex-col justify-between">
						<motion.span
							animate={
								isMobileMenuOpen
									? { rotate: 45, y: 9, backgroundColor: "#a855f7" }
									: { rotate: 0, y: 0, backgroundColor: "#fff" }
							}
							className="w-full h-0.5 rounded-full block origin-center transition-colors"
						/>
						<motion.span
							animate={
								isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }
							}
							className="w-full h-0.5 bg-white rounded-full block"
						/>
						<motion.span
							animate={
								isMobileMenuOpen
									? { rotate: -45, y: -9, backgroundColor: "#a855f7" }
									: { rotate: 0, y: 0, backgroundColor: "#fff" }
							}
							className="w-full h-0.5 rounded-full block origin-center transition-colors"
						/>
					</div>
				</button>

				{/* LOGO */}
				<Link href="/" className="relative group flex items-center gap-2">
					<div className="flex flex-col -space-y-1">
						<h2 className="text-xl font-black tracking-tighter flex italic">
							<span className="text-white group-hover:text-purple-400 transition-colors duration-300">
								TU
							</span>
							<span className="text-purple-500 group-hover:text-white transition-colors duration-300">
								PHIM
							</span>
						</h2>
						<span className="text-[7px] tracking-[0.3em] text-purple-400/60 font-mono font-bold uppercase group-hover:text-white transition-colors">
							Cùng xem phim
						</span>
					</div>
				</Link>

				<div className="hidden sm:flex items-center gap-2">
					<FilmSearch />
				</div>
				<ul className="hidden lg:flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-8 text-sm md:text-[9px] lg:text-[10px] xl:text-[11px] font-medium uppercase tracking-widest text-gray-400">
					{/* {HEADER_CATALOG.map((catalog) => (
						<li key={catalog.slug} className="relative group">
							<Link
								href={catalog.slug}
								className="hover:text-white transition-colors"
							>
								{catalog.title}
							</Link>
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
						</li>
					))} */}
					<NavDropdown
						title="Danh sách"
						items={LIST_CATALOG}
						routePrefix={ROUTE.DANH_SACH}
						isOpen={activeMenu === "danh-sach"}
						onToggle={() => toggleMenu("danh-sach")}
					/>
					<NavDropdown
						title="Thể loại"
						items={initialData.genres}
						routePrefix={ROUTE.THE_LOAI}
						isOpen={activeMenu === "the-loai"}
						onToggle={() => toggleMenu("the-loai")}
					/>
					<NavDropdown
						title="Quốc gia"
						items={initialData.countries}
						routePrefix={ROUTE.QUOC_GIA}
						isOpen={activeMenu === "quoc-gia"}
						onToggle={() => toggleMenu("quoc-gia")}
					/>
				</ul>

				<div className="hidden lg:flex items-center gap-2">
					<User />
				</div>
			</div>

			{/* MOBILE */}

			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-[#050505] border-r border-purple-500/20 z-105 shadow-2xl p-6 pt-24 overflow-y-auto"
					>
						<div className="space-y-4 pb-10">
							<User />

							<div className="space-y-6">
								<FilmSearch />
								<ul className="flex flex-col gap-3 text-sm md:text-[9px] lg:text-[10px] xl:text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
									{/* {HEADER_CATALOG.map((catalog) => (
										<li
											key={catalog.slug}
											className="border-b border-white/5 pb-2"
										>
											<Link
												href={catalog.slug}
												onClick={() => setIsMobileMenuOpen(false)}
											>
												{catalog.title}
											</Link>
										</li>
									))} */}
									<NavDropdown
										title="Thể loại"
										items={initialData.genres}
										routePrefix={ROUTE.THE_LOAI}
										isOpen={activeMenu === "the-loai"}
										onToggle={() => toggleMenu("the-loai")}
									/>
									<NavDropdown
										title="Quốc gia"
										items={initialData.countries}
										routePrefix={ROUTE.QUOC_GIA}
										isOpen={activeMenu === "quoc-gia"}
										onToggle={() => toggleMenu("quoc-gia")}
									/>
								</ul>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			{isMobileMenuOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setIsMobileMenuOpen(false)}
					className="lg:hidden fixed inset-0 bg-black/60 z-101"
				/>
			)}
		</nav>
	)
}

export default Header
