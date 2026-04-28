import SiteImage from "@/components/ui/site-image"

export const getYoutubeId = (url?: string) => {
	if (!url) return null

	const match = url.match(
		/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11})/,
	)

	return match ? match[1] : null
}

export const formatDateVN = (dateStr: Date) => {
	if (!dateStr) return ""
	const date = new Date(dateStr)
	return new Intl.DateTimeFormat("vi-VN", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(date)
}

export const languageNames = new Intl.DisplayNames(["vi"], { type: "language" })

export const getPaginationRange = (current: number, total: number) => {
	const delta = 2
	const range = []
	const rangeWithDots = []
	let l

	for (let i = 1; i <= total; i++) {
		if (
			i === 1 ||
			i === total ||
			(i >= current - delta && i <= current + delta)
		) {
			range.push(i)
		}
	}

	for (const i of range) {
		if (l) {
			if (i - l === 2) {
				rangeWithDots.push(l + 1)
			} else if (i - l !== 1) {
				rangeWithDots.push("...")
			}
		}
		rangeWithDots.push(i)
		l = i
	}
	return rangeWithDots
}

export const swiperInteraction = {
	isInteracting: false,
}

export const renderCommentWithStickers = (
	content: string,
	stickers: Sticker[],
) => {
	const parts = content.split(/(:\w+:)/g)

	return parts.map((part, index) => {
		if (part.startsWith(":") && part.endsWith(":")) {
			const sticker = stickers.find((s) => s.code === part)
			if (sticker) {
				return (
					<span
						key={index}
						className="inline-flex items-center leading-none translate-y-0.5 mx-1"
					>
						<SiteImage
							src={sticker.url}
							alt={sticker.code}
							width={48}
							height={48}
							containerClassName="inline-block"
							className="w-12 h-12 object-contain"
						/>
					</span>
				)
			}
		}

		return (
			<span key={index} className="whitespace-pre-wrap">
				{part}
			</span>
		)
	})
}

export const formatTime = (seconds: number) => {
	const mins = Math.floor(seconds / 60)
	const secs = Math.floor(seconds % 60)
	return `${mins}:${secs.toString().padStart(2, "0")}`
}

export const formatFullTime = (seconds: number) => {
	const mins = Math.floor(seconds / 60)
	const secs = Math.floor(seconds % 60)
	return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}

export const calculateLevelProgress = (
	exp: number,
	currentLevel: number,
	allLevels: LevelThreshold[],
) => {
	const levelData =
		allLevels.find((l) => l.level === currentLevel) || allLevels[0]
	const nextLevelData = allLevels.find((l) => l.level === currentLevel + 1)

	const minExp = levelData?.required_exp || 0
	const maxExp = nextLevelData?.required_exp || minExp

	const currentProgress = exp - minExp
	const nextLevelRequired = maxExp - minExp

	const percentage =
		nextLevelRequired > 0
			? Math.min((currentProgress / nextLevelRequired) * 100, 100)
			: 100

	return {
		minExp,
		maxExp,
		currentProgress,
		nextLevelRequired,
		percentage,
		isMaxLevel: !nextLevelData,
		color: levelData?.color_code || "#9ca3af",
	}
}

export const stripHtml = (html: string) => {
	return html?.replace(/<[^>]*>?/gm, "") || ""
}

export const buildEpisodeKey = (slug: string, sid: string, svt: string) => {
	return `${slug}?sid=${sid}&svt=${svt}`
}

export const extractMentions = (text: string): string[] => {
	const matches = text.match(/@([a-zA-Z0-9_]+)/g)
	if (!matches) return []
	return matches.map((m) => m.slice(1).toLowerCase())
}

export const groupComments = (comments: CommentWithProfile[]) => {
	const map = new Map<
		string,
		CommentWithProfile & { replies: CommentWithProfile[] }
	>()

	const roots: (CommentWithProfile & { replies: CommentWithProfile[] })[] = []

	for (const c of comments) {
		map.set(c.id, { ...c, replies: [] })
	}

	for (const c of comments) {
		if (c.parent_id) {
			const parent = map.get(c.parent_id)
			if (parent) {
				parent.replies.push(map.get(c.id)!)
			}
		} else {
			roots.push(map.get(c.id)!)
		}
	}

	return roots
}
