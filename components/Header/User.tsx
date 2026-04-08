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

const User = () => {
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

	return (
		<div
			className="relative py-1 mx-4"
			onMouseEnter={() => !isMobile && setIsOpen(true)}
			onMouseLeave={() => !isMobile && setIsOpen(false)}
		>
			{/* AVATAR SECTION */}
			<div
				className="flex items-center gap-2 cursor-pointer group"
				onClick={() => isMobile && setIsOpen(!isOpen)}
			>
				{/* SỬ DỤNG COMPONENT DÙNG CHUNG Ở ĐÂY */}
				<UserAvatar
					profile={{
						avatar_url: user.user_metadata?.avatar_url || profile?.avatar_url,
						equippedFrame: profile?.equippedFrame,
						equippedFrameMask: profile?.equippedFrameMask,
					}}
					size={"sm"}
					className="group-hover:scale-105 transition-transform duration-300"
				/>

				{!isMobile && (
					<div
						className={clsx(
							"flex-col items-start leading-none",
							"hidden xl:flex",
						)}
					>
						<span
							className="text-[11px] font-black transition-colors"
							style={{ color: stats.color }}
						>
							Lv.{profile?.level || 1}
						</span>
						<span className="text-[9px] text-zinc-500 font-medium uppercase tracking-tighter">
							{profile?.rank_title || "Phàm Nhân"}
						</span>
					</div>
				)}

				<motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
					<Dropdown className="h-4 w-4 opacity-50 group-hover:opacity-100" />
				</motion.div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						className={clsx(
							"absolute right-0 mt-2 rounded-2xl shadow-2xl p-3 z-50 border border-purple-500/20 backdrop-blur-xl bg-zinc-950/95",
							isMobile ? "w-[200px]" : "w-56",
						)}
					>
						{/* TU TIÊN STATS CARD */}
						<div className="px-1 py-2 mb-2 border-b border-white/5">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-1.5">
									<ShieldCheck size={14} className="text-purple-400" />
									<span className="text-[10px] font-black text-purple-100 uppercase tracking-widest">
										{profile?.rank_title || "Phàm Nhân"}
									</span>
								</div>
								<span className="text-[10px] font-mono text-zinc-500">
									Lv.{profile?.level}
								</span>
							</div>

							{/* EXP BAR (ĐÃ CẬP NHẬT LOGIC %) */}
							<div className="space-y-1">
								<div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: `${stats.percentage}%` }}
										transition={{ type: "spring", stiffness: 50 }}
										className="h-full bg-linear-to-r from-purple-600 to-fuchsia-500"
									/>
								</div>
								<div className="flex justify-between items-center text-[9px] font-medium text-zinc-500">
									<div className="flex items-center gap-0.5">
										<Zap size={8} className="fill-purple-500 text-purple-500" />
										<span>
											{/* Hiển thị số EXP thực tế trong level này: ví dụ 0 / 300 */}
											{stats.currentProgress} / {stats.nextLevelRequired}
										</span>
									</div>
									<span>{Math.round(stats.percentage)}%</span>
								</div>
							</div>
						</div>

						<ul className="flex flex-col gap-1">
							{menuItems.map((item, idx) => {
								const isLogout = item.logout
								const content = (
									<li
										onClick={item.onClick}
										className={clsx(
											`flex items-center gap-3 px-3 py-2 text-xs transition-all cursor-pointer rounded-xl font-medium`,
											isLogout
												? "hover:bg-red-500/10 text-red-400 hover:text-red-500"
												: "hover:bg-purple-500/10 text-zinc-400 hover:text-purple-400",
										)}
									>
										<span className="opacity-70">{item.icon}</span>
										<span>{item.label}</span>
									</li>
								)

								return (
									<div key={idx}>
										{isLogout ? (
											content
										) : (
											<Link href={item.href || "#"}>{content}</Link>
										)}
									</div>
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
