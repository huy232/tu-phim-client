"use server"

import { createClient } from "@/supabase/server"
import { ensureFilmExists } from "./check-film"

export async function toggleFavorite(filmPayload: FilmInfo) {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) throw new Error("Vui lòng đăng nhập để lưu phim")

	try {
		const internalFilmId = await ensureFilmExists(supabase, filmPayload)

		const { data: existing, error: fetchError } = await supabase
			.from("favorites")
			.select("id")
			.eq("user_id", user.id)
			.eq("film_id", internalFilmId)
			.maybeSingle()

		if (fetchError) {
			console.error(">>> [ERROR] Fetching favorite:", fetchError.message)
			throw fetchError
		}

		if (existing) {
			const { error: deleteError } = await supabase
				.from("favorites")
				.delete()
				.eq("id", existing.id)

			if (deleteError) throw deleteError
			return { action: "removed", error: null }
		} else {
			const { error: insertError } = await supabase.from("favorites").insert([
				{
					user_id: user.id,
					film_id: internalFilmId,
				},
			])

			if (insertError) throw insertError
			return { action: "added", error: null }
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("❌ Lỗi:", error.message)
			return { action: "failed", error: error.message }
		}

		console.error("❌ Lỗi không xác định:", error)
		return { action: "failed", error: String(error) }
	}
}

export async function getPaginatedFavorites(page: number) {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) return { data: [], count: 0 }

	const ITEMS_PER_PAGE = 12
	const from = (page - 1) * ITEMS_PER_PAGE
	const to = from + ITEMS_PER_PAGE - 1

	const { data, count, error } = await supabase
		.from("favorites")
		.select(
			`
			*,
			film:film_id (*)
		`,
			{ count: "exact" },
		)
		.eq("user_id", user.id)
		.order("created_at", { ascending: false })
		.range(from, to)

	if (error) {
		console.error(error)
		return { data: [], count: 0 }
	}

	return {
		data: data ?? [],
		count: count ?? 0,
	}
}
