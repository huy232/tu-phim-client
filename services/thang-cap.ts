"use server"
import { createClient } from "@/supabase/server"

/**
 * Cộng EXP cho người dùng thông qua RPC
 * @param expGain Số lượng EXP muốn cộng
 */
export const handleGainExp = async (expGain: number = 10) => {
	try {
		const supabase = await createClient()

		const { error } = await supabase.rpc("increment_user_exp", {
			exp_gain: expGain,
		})

		if (error) {
			console.error("Lỗi cộng EXP:", error.message)
			return { success: false, error }
		}

		return { success: true }
	} catch (err) {
		console.error("Lỗi hệ thống tu luyện:", err)
		return { success: false, err }
	}
}

export const getAllLevels = async (): Promise<LevelThreshold[]> => {
	const supabase = await createClient()

	const { data, error } = await supabase
		.from("levels")
		.select("level, required_exp, rank_title, color_code")
		.order("level", { ascending: true })

	if (error) {
		console.error("Lỗi lấy danh sách level:", error.message)
		return []
	}

	return (data as LevelThreshold[]) || []
}
