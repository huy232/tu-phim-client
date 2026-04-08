import { useState, useEffect, useCallback } from "react"
import { getWatchProgressAction } from "@/app/actions/watch-progress"

export const useWatchHistory = (
	filmId: string,
	userId: string | undefined,
	currentEpisodeSlug: string,
	isAutoResume: boolean,
) => {
	const [history, setHistory] = useState<HistoryProgress | null>(null)
	const [showResumeModal, setShowResumeModal] = useState(false)

	useEffect(() => {
		if (!userId) return
		const fetchHistory = async () => {
			const { data } = await getWatchProgressAction(filmId, userId)
			if (data) {
				setHistory(data)
				if (!isAutoResume && data.episode_slug === currentEpisodeSlug) {
					setShowResumeModal(true)
				}
			}
		}
		fetchHistory()
	}, [filmId, userId, currentEpisodeSlug, isAutoResume])

	return { history, showResumeModal, setShowResumeModal }
}
