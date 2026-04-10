import { saveProgressAction } from "@/app/actions/watch-progress"

let isSaving = false

export const handleSaveProgress = async (
	film: FilmInfo,
	userId: string,
	episode: { slug: string; name: string },
	currentTime: number,
	duration: number,
	sid: string,
	svt: string,
) => {
	if (isSaving) return

	const percent = (currentTime / duration) * 100
	if (!duration || isNaN(percent) || percent < 10) return

	try {
		isSaving = true
		const result = await saveProgressAction({
			film,
			userId,
			episode,
			currentTime,
			duration,
			sid,
			svt,
		})

		if (result.success) {
			console.log("✅ Server đã lưu xong!")
		}
	} catch (error) {
		console.error("❌ Lỗi gọi Server Action:", error)
	} finally {
		isSaving = false
	}
}
