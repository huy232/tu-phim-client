import { createClient } from "@/supabase/server"

export async function getFullProfileData() {
	const supabase = await createClient()
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	if (error || !user) return null

	const userId = user.id

	const [profileRes, progressRes, favoritesRes, assetsRes, levelsRes] =
		await Promise.all([
			// 1. Query Profile
			supabase
				.from("profiles")
				.select(
					`
          *,
          user_assets (
            is_equipped,
            assets:asset_id (
              id,
              name,
              type,
              image_url,
              metadata,
              required_level
            )
          )
        `,
				)
				.eq("id", userId)
				.single(),

			// 2. Query Progress
			supabase
				.from("user_progress")
				.select(
					`
          *,
          film:film_id (*)  
        `,
				)
				.eq("user_id", userId)
				.order("updated_at", { ascending: false })
				.limit(10),

			// 3. Query Favorites
			supabase
				.from("favorites")
				.select(
					`
          *,
          film:film_id (*) 
        `,
					{ count: "exact" },
				)
				.eq("user_id", userId)
				.order("created_at", { ascending: false })
				.range(0, 11),

			// 4. Query All Assets
			supabase
				.from("assets")
				.select(
					`
          *,
          user_assets (
            is_equipped, 
            user_id
          )
        `,
				)
				.eq("user_assets.user_id", userId)
				.order("type", { ascending: true })
				.order("required_level", { ascending: true }),

			supabase.from("levels").select("*").order("level", { ascending: true }),
		])

	return {
		profile: profileRes.data,
		continueWatching: progressRes.data || [],
		favorites: favoritesRes.data || [],
		favoritesCount: favoritesRes.count || 0,
		allAssets: assetsRes.data || [],
		levels: levelsRes.data || [],
	}
}
