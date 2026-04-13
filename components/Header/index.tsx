"use client"

import Link from "next/link"
import FilmSearch from "./FilmSearch"
import NavDropdown from "./NavDropdown"
import { useEffect, useState } from "react"
import { LIST_CATALOG, ROUTE } from "@/constants"
import User from "./User"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useSidebar } from "@/context/SidebarContext"

interface HeaderProps {
	initialData: {
		genres: Category[]
		countries: Country[]
	}
}

const Header = ({ initialData }: HeaderProps) => {
	const [activeMenu, setActiveMenu] = useState<string | null>(null)
	const [isScrolled, setIsScrolled] = useState(false)
	const { isOpen: isMobileMenuOpen, toggle, close } = useSidebar()

	const openMenu = (menu: string) => setActiveMenu(menu)
	const closeMenu = (menu: string) => {
		setActiveMenu((prev) => (prev === menu ? null : prev))
	}
	const toggleMenu = (menu: string) => {
		setActiveMenu((prev) => (prev === menu ? null : menu))
	}

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20)

		handleScroll()
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	useEffect(() => {
		const body = document.body
		const scrollY = window.scrollY

		if (isMobileMenuOpen) {
			body.style.position = "fixed"
			body.style.top = `-${scrollY}px`
			body.style.width = "100%"
		} else {
			const top = body.style.top
			body.style.position = ""
			body.style.top = ""
			body.style.width = ""

			window.scrollTo(0, parseInt(top || "0") * -1)
		}
	}, [isMobileMenuOpen])

	return (
		<nav
			className={clsx(
				"fixed top-0 w-full z-50 transition-all duration-500 px-2 md:px-6 py-1",
				isScrolled || isMobileMenuOpen
					? "bg-black shadow-2xl"
					: "bg-transparent",
			)}
		>
			<div className="mx-auto flex items-center justify-between">
				{/* MENU BUTTON */}
				<button
					onClick={() => toggle()}
					className="lg:hidden relative z-60 p-2 text-white"
				>
					{isMobileMenuOpen ? (
						<X className="w-6 h-6" />
					) : (
						<Menu className="w-6 h-6" />
					)}
				</button>

				{/* LOGO */}
				<Link href="/" className="relative group flex items-center gap-2">
					<div className="flex flex-col -space-y-1">
						<h2 className="text-xl font-black tracking-tighter flex italic">
							<span className="text-white group-hover:text-purple-400 transition-colors">
								TU
							</span>
							<span className="text-purple-500 group-hover:text-white transition-colors">
								PHIM
							</span>
						</h2>
						<span className="text-[7px] tracking-[0.3em] text-purple-400/60 font-mono uppercase">
							Cùng xem phim
						</span>
					</div>
				</Link>

				{/* SEARCH */}
				<div className="hidden sm:flex items-center gap-2">
					<FilmSearch />
				</div>

				{/* DESKTOP MENU */}
				<ul className="hidden lg:flex items-center gap-4 text-sm uppercase tracking-widest text-gray-400">
					<NavDropdown
						title="Danh sách"
						items={LIST_CATALOG}
						routePrefix={ROUTE.DANH_SACH}
						isOpen={activeMenu === "danh-sach"}
						onOpen={() => openMenu("danh-sach")}
						onClose={closeMenu}
						onToggle={() => toggleMenu("danh-sach")}
						menuKey="danh-sach"
					/>
					<NavDropdown
						title="Thể loại"
						items={initialData.genres}
						routePrefix={ROUTE.THE_LOAI}
						isOpen={activeMenu === "the-loai"}
						onOpen={() => openMenu("the-loai")}
						onClose={closeMenu}
						onToggle={() => toggleMenu("the-loai")}
						menuKey="the-loai"
					/>
					<NavDropdown
						title="Quốc gia"
						items={initialData.countries}
						routePrefix={ROUTE.QUOC_GIA}
						isOpen={activeMenu === "quoc-gia"}
						onOpen={() => openMenu("quoc-gia")}
						onClose={closeMenu}
						onToggle={() => toggleMenu("quoc-gia")}
						menuKey="quoc-gia"
					/>
				</ul>

				<div className="hidden lg:flex items-center gap-2">
					<User mode="desktop" />
				</div>
			</div>

			{/* ================= MOBILE ================= */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => close()}
							className="fixed inset-0 bg-black/60 z-40"
						/>

						<motion.aside
							initial={{ x: "-100%" }}
							animate={{ x: 0 }}
							exit={{ x: "-100%" }}
							transition={{ type: "spring", damping: 25, stiffness: 200 }}
							onClick={(e) => e.stopPropagation()}
							className="fixed top-0 left-0 h-full w-full max-w-sm bg-[#050505] z-50 shadow-2xl overflow-y-auto overscroll-contain"
						>
							<div className="p-6 pt-24">
								<User mode="mobile" />

								<div className="mt-6 space-y-6">
									<FilmSearch />

									<ul className="flex flex-col gap-3 uppercase tracking-[0.2em] text-gray-400">
										<NavDropdown
											title="Danh sách"
											items={LIST_CATALOG}
											routePrefix={ROUTE.DANH_SACH}
											isOpen={activeMenu === "danh-sach"}
											onOpen={() => openMenu("danh-sach")}
											onClose={closeMenu}
											onToggle={() => toggleMenu("danh-sach")}
											menuKey="danh-sach"
										/>
										<NavDropdown
											title="Thể loại"
											items={initialData.genres}
											routePrefix={ROUTE.THE_LOAI}
											isOpen={activeMenu === "the-loai"}
											onOpen={() => openMenu("the-loai")}
											onClose={closeMenu}
											onToggle={() => toggleMenu("the-loai")}
											menuKey="the-loai"
										/>
										<NavDropdown
											title="Quốc gia"
											items={initialData.countries}
											routePrefix={ROUTE.QUOC_GIA}
											isOpen={activeMenu === "quoc-gia"}
											onOpen={() => openMenu("quoc-gia")}
											onClose={closeMenu}
											onToggle={() => toggleMenu("quoc-gia")}
											menuKey="quoc-gia"
										/>
									</ul>
								</div>
							</div>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</nav>
	)
}

export default Header
