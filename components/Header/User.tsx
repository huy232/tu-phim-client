"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Dropdown, LogOut, UserOption } from "@/assets/icons"
import { useState, useMemo } from "react"
import clsx from "clsx"
import { useAuth } from "@/hooks/useAuth"
import { useIsMobile } from "@/hooks/useMediaQuery"
import LoginButton from "./LoginButton"
import { ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"
import { calculateLevelProgress } from "@/utilities"
import UserAvatar from "../UserAvatar"

interface Props {
	mode?: "desktop" | "mobile"
}

const User = ({ mode = "desktop" }: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	const { user, profile, loading, logout, allLevels } = useAuth()
	const isMobile = useIsMobile()

	const stats = useMemo(() => {
		return calculateLevelProgress(
			profile?.exp || 0,
			profile?.level || 1,
			allLevels,
		)
	}, [profile?.exp, profile?.level, allLevels])

	const handleLogout = async () => {
		await logout()
		setIsOpen(false)
	}

	const menuItems = [
		{
			icon: <UserOption />,
			label: "Tài khoản",
			href: "/tai-khoan",
		},
		{
			icon: <LogOut />,
			label: "Đăng xuất",
			logout: true,
			onClick: handleLogout,
		},
	]

	if (loading)
		return (
			<div className="py-1 mx-4 w-6 h-6 rounded-full bg-white/5 animate-pulse" />
		)

	if (!user) return <LoginButton />

	/* ================= MOBILE MODE ================= */
	if (mode === "mobile") {
		return (
			<div className="w-full bg-white/5 rounded-2xl p-4 border border-white/10">
				{/* HEADER */}
				<div className="flex items-center gap-3 mb-4">
					<UserAvatar
						profile={{
							avatar_url: user.user_metadata?.avatar_url || profile?.avatar_url,
							equippedFrame: profile?.equippedFrame,
							equippedFrameMask: profile?.equippedFrameMask,
						}}
						size="md"
					/>

					<div className="min-w-0">
						<div
							className="text-sm font-black truncate"
							style={{ color: stats.color }}
						>
							Lv.{profile?.level || 1}
						</div>
						<div className="text-xs text-zinc-400 truncate">
							{profile?.rank_title || "Phàm Nhân"}
						</div>
					</div>
				</div>

				{/* EXP */}
				<div className="mb-4">
					<div className="h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: `${stats.percentage}%` }}
							className="h-full bg-linear-to-r from-purple-600 to-fuchsia-500"
						/>
					</div>
					<div className="flex justify-between text-[10px] text-zinc-500 mt-1">
						<span>
							{stats.currentProgress} / {stats.nextLevelRequired}
						</span>
						<span>{Math.round(stats.percentage)}%</span>
					</div>
				</div>

				{/* MENU */}
				<div className="flex flex-col gap-1">
					{menuItems.map((item, idx) => {
						const content = (
							<div
								onClick={item.onClick}
								className={clsx(
									"flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer",
									item.logout
										? "text-red-400 hover:bg-red-500/10"
										: "text-zinc-300 hover:bg-white/5",
								)}
							>
								<span className="opacity-70">{item.icon}</span>
								<span>{item.label}</span>
							</div>
						)

						return item.logout ? (
							<div key={idx}>{content}</div>
						) : (
							<Link key={idx} href={item.href || "#"}>
								{content}
							</Link>
						)
					})}
				</div>
			</div>
		)
	}

	/* ================= DESKTOP MODE ================= */
	return (
		<div
			className="relative py-1 mx-4"
			onMouseEnter={() => !isMobile && setIsOpen(true)}
			onMouseLeave={() => !isMobile && setIsOpen(false)}
		>
			{/* AVATAR */}
			<div
				className="flex items-center gap-2 cursor-pointer group"
				onClick={() => isMobile && setIsOpen(!isOpen)}
			>
				<UserAvatar
					profile={{
						avatar_url: user.user_metadata?.avatar_url || profile?.avatar_url,
						equippedFrame: profile?.equippedFrame,
						equippedFrameMask: profile?.equippedFrameMask,
					}}
					size="sm"
					className="group-hover:scale-105 transition-transform duration-300"
				/>

				{!isMobile && (
					<div className="hidden xl:flex flex-col leading-none">
						<span
							className="text-[11px] font-black"
							style={{ color: stats.color }}
						>
							Lv.{profile?.level || 1}
						</span>
						<span className="text-[9px] text-zinc-500 uppercase">
							{profile?.rank_title || "Phàm Nhân"}
						</span>
					</div>
				)}

				<motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
					<Dropdown className="h-4 w-4 opacity-50 group-hover:opacity-100" />
				</motion.div>
			</div>

			{/* DROPDOWN */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						className="absolute right-0 mt-2 w-56 rounded-2xl p-3 z-50 bg-zinc-950/95 border border-purple-500/20 backdrop-blur-xl shadow-2xl"
					>
						{/* STATS */}
						<div className="px-1 py-2 mb-2 border-b border-white/5">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-1.5">
									<ShieldCheck size={14} className="text-purple-400" />
									<span className="text-[10px] font-black text-purple-100 uppercase">
										{profile?.rank_title}
									</span>
								</div>
								<span className="text-[10px] text-zinc-500">
									Lv.{profile?.level}
								</span>
							</div>

							<div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: `${stats.percentage}%` }}
									className="h-full bg-linear-to-r from-purple-600 to-fuchsia-500"
								/>
							</div>
						</div>

						{/* MENU */}
						<ul className="flex flex-col gap-1">
							{menuItems.map((item, idx) => {
								const content = (
									<li
										onClick={item.onClick}
										className={clsx(
											"flex items-center gap-3 px-3 py-2 text-xs rounded-xl cursor-pointer transition-all",
											item.logout
												? "text-red-400 hover:bg-red-500/10"
												: "text-zinc-400 hover:bg-purple-500/10 hover:text-purple-400",
										)}
									>
										<span className="opacity-70">{item.icon}</span>
										<span>{item.label}</span>
									</li>
								)

								return item.logout ? (
									<div key={idx}>{content}</div>
								) : (
									<Link key={idx} href={item.href || "#"}>
										{content}
									</Link>
								)
							})}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default User
