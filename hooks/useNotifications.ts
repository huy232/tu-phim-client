"use client"

import { supabase } from "@/supabase/client"
import { useState, useEffect, useRef, useCallback } from "react"

const LIMIT = 10

export const useNotifications = () => {
	const loadingRef = useRef(false)
	const mounted = useRef(false)

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

			const from = pageParam * LIMIT
			const to = from + LIMIT - 1

			const { data, error } = await supabase
				.from("notification_with_actors")
				.select("*")
				.order("created_at", { ascending: false })
				.range(from, to)

			if (error) {
				console.error("Fetch notifications error:", error)
				loadingRef.current = false
				setLoading(false)
				return
			}

			if (!mounted.current) return

			if (data) {
				setNotifications((prev) => {
					// 👉 reset khi realtime hoặc load lần đầu
					if (reset) return data

					const map = new Map(prev.map((i) => [i.id, i]))
					data.forEach((item) => map.set(item.id, item))
					return Array.from(map.values())
				})

				// 👉 chỉ set hasMore khi KHÔNG phải reset
				if (!reset) {
					if (data.length < LIMIT) setHasMore(false)
				} else {
					setHasMore(true) // reset lại
				}
			}

			loadingRef.current = false
			setLoading(false)
		},
		[],
	)

	// ================= INIT =================
	useEffect(() => {
		mounted.current = true

		const init = async () => {
			await fetchNotifications(0, true)
			setPage(1)
		}

		init()

		return () => {
			mounted.current = false
		}
	}, [fetchNotifications])

	// ================= LOAD MORE =================
	const loadMore = useCallback(async () => {
		if (loading || !hasMore) return

		await fetchNotifications(page)
		setPage((p) => p + 1)
	}, [fetchNotifications, page, loading, hasMore])

	// ================= REALTIME (FIX CHUẨN) =================
	useEffect(() => {
		const channel = supabase
			.channel("notifications-realtime")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "notifications",
				},
				async (payload) => {
					const newItem = payload.new as AppNotification

					// 👉 optimistic update (mượt hơn fetch lại)
					setNotifications((prev) => {
						// tránh duplicate
						if (prev.some((n) => n.id === newItem.id)) return prev
						return [newItem, ...prev]
					})

					// 👉 optional: sync lại cho chắc (background)
					await fetchNotifications(0, true)
					setPage(1)
				},
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [fetchNotifications])

	// ================= MARK =================
	const markAsRead = async (id: string) => {
		await supabase.from("notifications").update({ is_read: true }).eq("id", id)

		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
		)
	}

	const markAllAsRead = async () => {
		await supabase
			.from("notifications")
			.update({ is_read: true })
			.eq("is_read", false)

		setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
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
