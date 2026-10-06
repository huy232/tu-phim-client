"use client"

import { supabase } from "@/supabase/client"
import { useState, useEffect, useRef, useCallback } from "react"

const LIMIT = 10

export const useNotifications = () => {
	const loadingRef = useRef(false)
	const mountedRef = useRef(false)

	const [notifications, setNotifications] = useState<AppNotification[]>([])
	const [page, setPage] = useState(0)
	const [loading, setLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)

	// ================= FETCH =================
	const fetchNotifications = useCallback(
		async (pageParam: number, reset = false) => {
			if (loadingRef.current) return

			loadingRef.current = true
			setLoading(true)

			try {
				const from = pageParam * LIMIT
				const to = from + LIMIT - 1

				const { data, error } = await supabase
					.from("notification_with_actors")
					.select("*")
					.order("created_at", { ascending: false })
					.range(from, to)

				if (error) {
					console.error("Fetch notifications error:", error)
					return
				}

				// Component đã unmount
				if (!mountedRef.current) return

				if (!data) return

				setNotifications((prev) => {
					if (reset) {
						return data as AppNotification[]
					}

					const map = new Map(prev.map((item) => [item.id, item]))

					data.forEach((item) => {
						map.set(item.id, item as AppNotification)
					})

					return Array.from(map.values()).sort(
						(a, b) =>
							new Date(b.created_at).getTime() -
							new Date(a.created_at).getTime(),
					)
				})

				if (data.length < LIMIT) {
					setHasMore(false)
				} else if (reset) {
					setHasMore(true)
				}
			} finally {
				loadingRef.current = false

				if (mountedRef.current) {
					setLoading(false)
				}
			}
		},
		[],
	)

	// ================= INIT =================
	useEffect(() => {
		mountedRef.current = true

		const init = async () => {
			await fetchNotifications(0, true)

			if (mountedRef.current) {
				setPage(1)
			}
		}

		init()

		return () => {
			mountedRef.current = false
		}
	}, [fetchNotifications])

	// ================= LOAD MORE =================
	const loadMore = useCallback(async () => {
		if (loadingRef.current || !hasMore) return

		const currentPage = page

		await fetchNotifications(currentPage)

		if (mountedRef.current) {
			setPage((p) => p + 1)
		}
	}, [fetchNotifications, page, hasMore])

	// ================= REALTIME =================

	useEffect(() => {
		let cancelled = false

		const channelName = `notifications-realtime-${crypto.randomUUID()}`

		const channel = supabase.channel(channelName).on(
			"postgres_changes",
			{
				event: "INSERT",
				schema: "public",
				table: "notifications",
			},
			async () => {
				if (cancelled || !mountedRef.current) return

				console.log("[Notifications] New notification")

				await fetchNotifications(0, true)

				if (!cancelled && mountedRef.current) {
					setPage(1)
				}
			},
		)

		channel.subscribe((status, error) => {
			if (cancelled) return

			switch (status) {
				case "SUBSCRIBED":
					console.log("[Notifications] Realtime subscribed:", channelName)
					break

				case "CHANNEL_ERROR":
					console.error("[Notifications] Realtime error:", error)
					break

				case "TIMED_OUT":
					console.error("[Notifications] Realtime timeout:", error)
					break

				case "CLOSED":
					console.log("[Notifications] Realtime closed:", channelName)
					break
			}
		})

		return () => {
			cancelled = true

			void supabase.removeChannel(channel)
		}
	}, [fetchNotifications])

	// ================= MARK AS READ =================
	const markAsRead = async (id: string) => {
		const { error } = await supabase
			.from("notifications")
			.update({ is_read: true })
			.eq("id", id)

		if (error) {
			console.error("Mark notification as read error:", error)
			return
		}

		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
		)
	}

	// ================= MARK ALL AS READ =================
	const markAllAsRead = async () => {
		const { error } = await supabase
			.from("notifications")
			.update({ is_read: true })
			.eq("is_read", false)

		if (error) {
			console.error("Mark all notifications as read error:", error)
			return
		}

		setNotifications((prev) =>
			prev.map((n) => ({
				...n,
				is_read: true,
			})),
		)
	}

	return {
		notifications,
		loadMore,
		hasMore,
		loading,
		markAsRead,
		markAllAsRead,
	}
}
