import { useState } from "react"
import { toggleFavorite } from "@/services/yeu-thich"
import { toast } from "sonner"
import { useAuth } from "./useAuth"

export const useFavorite = (film: FilmInfo) => {
	const { user, favoriteFilmIDs, refreshFavorites } = useAuth()
	const [loading, setLoading] = useState(false)

	const isFavorited = favoriteFilmIDs?.includes(film.slug) || false

	const handleToggle = async () => {
		if (!user) return toast.error("Vui lòng đăng nhập")

		setLoading(true)
		try {
			const result = await toggleFavorite(film)

			if (result.action !== "failed") {
				await refreshFavorites(user.id)

				toast.success(result.action === "added" ? "Đã lưu" : "Đã xóa")
			} else {
				toast.error(result.error)
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error("Thao tác yêu thích thất bại.")
				console.error(error.message)
			}
		} finally {
			setLoading(false)
		}
	}

	return { isFavorited, handleToggle, user, loading }
}
