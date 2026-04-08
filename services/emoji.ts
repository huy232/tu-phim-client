"use server"

import { createClient } from "@/supabase/server"

export const getStickers = async () => {
	const supabase = await createClient()
	const { data, error } = await supabase
		.from("stickers")
		.select("*")
		.order("created_at", { ascending: true })

	if (error) {
		console.error("Lỗi fetch sticker:", error)
		return []
	}

	return data
}
