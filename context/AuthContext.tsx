"use client"

import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	ReactNode,
} from "react"
import { PostgrestError, User } from "@supabase/supabase-js"
import { supabase } from "@/supabase/client"
import { getAllLevels } from "@/services/thang-cap"

interface AuthContextType {
	user: User | null
	profile: UserProfile | null
	loading: boolean
	logout: () => Promise<void>
	favoriteFilmIDs: string[]
	refreshFavorites: (explicitUserId?: string) => Promise<void>
	allLevels: LevelThreshold[]
	fetchProfile: (userId: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [profile, setProfile] = useState<UserProfile | null>(null)
	const [favoriteFilmIDs, setFavoriteFilmIDs] = useState<string[]>([])
	const [allLevels, setAllLevels] = useState<LevelThreshold[]>([])
	const [loading, setLoading] = useState(true)

	// =========================
	// FETCH PROFILE
	// =========================
	const fetchProfile = useCallback(async (userId: string) => {
		const { data, error } = (await supabase
			.from("profiles")
			.select(
				`
      *,
      user_assets (
        is_equipped,
        assets (
          id,
          name,
          image_url,
          type,
          metadata
        )
      )
    `,
			)
			.eq("id", userId)
			.single()) as { data: RawProfile | null; error: PostgrestError }

		if (error) {
			console.error("Fetch profile error:", error)
			return
		}

		if (data) {
			const rawAssets = data.user_assets || []

			// 1. Tìm asset Khung đang trang bị
			const frameAsset = rawAssets.find(
				(ua) => ua.is_equipped && ua.assets.type === "frame",
			)?.assets

			// 2. Trích xuất URL ảnh và URL Mask từ metadata
			const equippedFrame = frameAsset?.image_url || null
			const equippedFrameMask = frameAsset?.metadata?.mask_url || null

			const equippedBadge =
				rawAssets.find((ua) => ua.is_equipped && ua.assets.type === "badge")
					?.assets.image_url || null

			const equippedTitles =
				rawAssets
					.filter((ua) => ua.is_equipped && ua.assets.type === "title")
					.map((ua) => ({
						name: ua.assets.name,
						color_code: ua.assets.metadata?.color || "#a855f7",
					})) || []

			// Cập nhật State toàn cục
			setProfile({
				...data,
				equippedFrame,
				equippedFrameMask,
				equippedBadge,
				equippedTitles,
			})
		}
	}, [])

	// =========================
	// FETCH FAVORITES
	// =========================
	const fetchFavorites = useCallback(async (userId: string) => {
		const { data, error } = await supabase
			.from("favorites")
			.select(`films:film_id ( slug )`)
			.eq("user_id", userId)
			.order("created_at", { ascending: false })

		if (error) {
			console.error("Fetch favorites error:", error)
			return
		}

		if (!data) return

		const typedData = data as FavoriteItemAuth[] | null

		const slugs =
			typedData
				?.map((item) => {
					if (!item.films) return null

					if (Array.isArray(item.films)) {
						return item.films[0]?.slug ?? null
					}

					return item.films.slug
				})
				.filter((slug): slug is string => Boolean(slug)) ?? []

		setFavoriteFilmIDs(slugs)
	}, [])

	// =========================
	// INIT AUTH + LISTENER
	// =========================
	useEffect(() => {
		let isMounted = true

		const init = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession()

			const currentUser = session?.user ?? null

			if (!isMounted) return

			setUser(currentUser)

			if (currentUser) {
				await Promise.all([
					fetchProfile(currentUser.id),
					fetchFavorites(currentUser.id),
				])
			}

			setLoading(false)
		}

		init()

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			const currentUser = session?.user ?? null

			setUser(currentUser)

			if (currentUser) {
				await Promise.all([
					fetchProfile(currentUser.id),
					fetchFavorites(currentUser.id),
				])
			} else {
				setProfile(null)
				setFavoriteFilmIDs([])
			}
		})

		return () => {
			isMounted = false
			subscription.unsubscribe()
		}
	}, [fetchFavorites, fetchProfile])

	// =========================
	// REALTIME PROFILE & ASSETS
	// =========================
	useEffect(() => {
		if (!user) return

		const channel = supabase
			.channel(`user-updates-${user.id}`)
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "user_assets",
					filter: `user_id=eq.${user.id}`,
				},
				() => {
					fetchProfile(user.id)
				},
			)
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "profiles",
					filter: `id=eq.${user.id}`,
				},
				() => {
					fetchProfile(user.id)
				},
			)
			.subscribe()

		return () => {
			channel.unsubscribe()
		}
	}, [user, fetchProfile])

	// =========================
	// LOAD LEVELS
	// =========================
	useEffect(() => {
		const load = async () => {
			const levels = await getAllLevels()
			setAllLevels(levels)
		}
		load()
	}, [])

	// =========================
	// LOGOUT
	// =========================
	const logout = async () => {
		await supabase.auth.signOut()
		setUser(null)
		setProfile(null)
		setFavoriteFilmIDs([])
	}

	// =========================
	// REFRESH FAVORITES
	// =========================
	const refreshFavorites = useCallback(
		async (explicitUserId?: string) => {
			const id = explicitUserId || user?.id
			if (!id) return

			await fetchFavorites(id)
		},
		[user, fetchFavorites],
	)

	return (
		<AuthContext.Provider
			value={{
				user,
				profile,
				favoriteFilmIDs,
				loading,
				logout,
				refreshFavorites,
				allLevels,
				fetchProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider")
	}
	return context
}
