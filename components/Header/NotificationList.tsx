"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"
import { useNotifications } from "@/hooks/useNotifications"
import Image from "next/image"
import { useIsMobile } from "@/hooks/useMediaQuery"

// ================= FORMAT =================
const formatActors = (n: AppNotification) => {
	const actors = n.actors || []

	if (actors.length === 0) return "Ai đó"

	const names = actors
		.slice(0, 2)
		.map((a) =>
			a.profile ? a.profile.full_name || a.profile.username : "Ai đó",
		)

	if (n.actors_count === 1) return names[0] || "Ai đó"
	if (n.actors_count === 2) return names.join(" và ")

	return `${names.join(", ")} và ${n.actors_count - 2} người khác`
}

const formatNotification = (n: AppNotification) => {
	const actorsText = formatActors(n)

	switch (n.type) {
		case "like_comment":
			return `${actorsText} đã thích bình luận của bạn`
		case "reply_comment":
			return `${actorsText} đã trả lời bình luận của bạn`
		default:
			return "Thông báo mới"
	}
}

// ================= ITEM =================
const NotificationItem = ({ n }: { n: AppNotification }) => {
	const firstActor = n.actors?.[0]?.profile

	return (
		<div
			className={clsx(
				"flex gap-3 p-3 rounded-xl border transition cursor-pointer",
				n.is_read
					? "bg-transparent border-white/5"
					: "bg-purple-500/10 border-purple-500/30",
			)}
		>
			<div className="w-9 h-9 rounded-full overflow-hidden bg-white/10 shrink-0">
				{firstActor?.avatar_url ? (
					<Image
						src={firstActor.avatar_url}
						alt="avatar"
						width={36}
						height={36}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-xs text-white/40">
						?
					</div>
				)}
			</div>

			<div className="flex-1 min-w-0">
				<div className="text-xs text-white leading-snug">
					{formatNotification(n)}
				</div>

				<div className="text-[10px] text-white/40 mt-1">
					{new Date(n.created_at).toLocaleString()}
				</div>
			</div>
		</div>
	)
}

// ================= MAIN =================
export default function NotificationList({
	mode = "desktop",
}: {
	mode?: "desktop" | "mobile"
}) {
	const isMobile = useIsMobile()
	const isMobileMode = mode === "mobile" || isMobile

	const { notifications, loadMore, hasMore, loading, markAllAsRead } =
		useNotifications()

	const fetchingRef = useRef(false)
	const [open, setOpen] = useState(false)

	const loadMoreRef = useRef<HTMLDivElement | null>(null)
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	const unreadCount = useMemo(() => {
		return notifications.filter((n) => !n.is_read).length
	}, [notifications])

	// LOAD MORE
	useEffect(() => {
		if (!loadMoreRef.current) return

		const observer = new IntersectionObserver(async (entries) => {
			const entry = entries[0]

			if (entry.isIntersecting && hasMore && !loading && !fetchingRef.current) {
				fetchingRef.current = true
				await loadMore()
				fetchingRef.current = false
			}
		})

		observer.observe(loadMoreRef.current)

		return () => observer.disconnect()
	}, [loadMore, hasMore, loading])

	// CLICK OUTSIDE (desktop only)
	useEffect(() => {
		if (isMobileMode) return

		const handleClickOutside = (e: MouseEvent) => {
			if (!dropdownRef.current) return
			if (!dropdownRef.current.contains(e.target as Node)) {
				setOpen(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [isMobileMode])

	// MARK READ
	useEffect(() => {
		if (open && unreadCount > 0) {
			markAllAsRead()
		}
	}, [open, unreadCount, markAllAsRead])

	return (
		<div className="relative" ref={dropdownRef}>
			{/* BUTTON */}
			<button
				onClick={() => setOpen((v) => !v)}
				className="relative p-2 rounded-xl hover:bg-white/10 transition"
			>
				<span className="flex flex-row items-center gap-2 text-sm">
					<Bell className="w-5 h-5 text-white" />
					<p className="inline-block md:hidden">Thông báo</p>
				</span>

				{unreadCount > 0 && (
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[2px] rounded-full font-bold shadow">
						{unreadCount > 9 ? "9+" : unreadCount}
					</span>
				)}
			</button>

			{/* ================= MOBILE ================= */}
			{isMobileMode && (
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-[999] bg-black/60"
							onClick={() => setOpen(false)}
						>
							<motion.div
								initial={{ y: 100 }}
								animate={{ y: 0 }}
								exit={{ y: 100 }}
								onClick={(e) => e.stopPropagation()}
								className="absolute bottom-0 left-0 right-0 max-h-[80vh] bg-zinc-950 rounded-t-2xl p-4 overflow-y-auto"
							>
								<div className="flex justify-between items-center mb-3">
									<span className="text-sm font-bold text-purple-400">
										Thông báo
									</span>
									<button onClick={() => setOpen(false)}>Đóng</button>
								</div>

								<div className="space-y-2">
									{notifications.length === 0 && (
										<div className="text-xs text-white/40 text-center py-6">
											Không có thông báo
										</div>
									)}

									{notifications.map((n) => (
										<NotificationItem key={n.id} n={n} />
									))}

									{hasMore && !loading && (
										<div
											ref={loadMoreRef}
											className="text-center text-xs text-white/40 py-2"
										>
											Kéo xuống để tải thêm...
										</div>
									)}

									{loading && (
										<div className="text-center text-xs text-white/40 py-2">
											Đang tải...
										</div>
									)}
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			)}

			{/* ================= DESKTOP ================= */}
			{!isMobileMode && (
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0, y: 10, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 10, scale: 0.95 }}
							className="absolute right-0 mt-2 w-[360px] max-h-[420px] overflow-y-auto rounded-2xl p-3 z-50 bg-zinc-950/95 border border-purple-500/20 backdrop-blur-xl shadow-2xl"
						>
							<div className="flex justify-between items-center mb-2 px-1">
								<span className="text-xs font-black text-purple-400">
									Thông báo
								</span>
							</div>

							<div className="space-y-2">
								{notifications.length === 0 && (
									<div className="text-xs text-white/40 text-center py-6">
										Không có thông báo
									</div>
								)}

								{notifications.map((n) => (
									<NotificationItem key={n.id} n={n} />
								))}

								{hasMore && !loading && (
									<div
										ref={loadMoreRef}
										className="text-center text-xs text-white/40 py-2"
									>
										Kéo xuống để tải thêm...
									</div>
								)}

								{loading && (
									<div className="text-center text-xs text-white/40 py-2">
										Đang tải...
									</div>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			)}
		</div>
	)
}
