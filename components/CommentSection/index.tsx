"use client"

import { useEffect, useState } from "react"
import { LayoutGroup } from "framer-motion"
import { getMainComments } from "@/services/binh-luan"

import CommentArea from "./CommentArea"
import CommentEmpty from "./CommentEmpty"
import CommentLoadMore from "./CommentLoadMore"
import CommentList from "./CommentList"
import CommentHeader from "./CommentHeader"
import { useAuth } from "@/hooks/useAuth"
import CommentSort from "./CommentSort"

const LIMIT = 10

const CommentSection = ({
	initialComments = [],
	episodeId = "",
	stickers,
	film,
}: {
	initialComments: CommentWithProfile[]
	episodeId?: string
	stickers: Sticker[]
	film: FilmInfo
}) => {
	const { user, profile, loading: authLoading } = useAuth()
	const [comments, setComments] =
		useState<CommentWithProfile[]>(initialComments)
	const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
		"newest",
	)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [hasMore, setHasMore] = useState(initialComments.length >= LIMIT)

	const handleNewComment = (newComment: CommentWithProfile) => {
		setComments((prev) => [newComment, ...prev])
	}

	const handleLoadMore = async () => {
		if (loading || !hasMore) return
		setLoading(true)
		const nextPage = page + 1
		try {
			const { data } = await getMainComments(
				film._id,
				nextPage,
				LIMIT,
				episodeId,
			)
			if (data && data.length > 0) {
				setComments((prev) => [...prev, ...data])
				setPage(nextPage)
				if (data.length < LIMIT) setHasMore(false)
			} else {
				setHasMore(false)
			}
		} catch (err) {
			console.error("Error loading more:", err)
		} finally {
			setLoading(false)
		}
	}

	const handleDeleteComment = (commentId: string) => {
		setComments((prev) => prev.filter((c) => c.id !== commentId))
	}

	useEffect(() => {
		const fetchNewSort = async () => {
			setPage(1)
			const { data } = await getMainComments(film._id, 1, 10, episodeId, sortBy)
			if (data) setComments(data)
		}
		fetchNewSort()
	}, [sortBy, episodeId, film._id])

	return (
		<section
			className="pt-20 w-full max-w-4xl mx-auto px-4"
			id="comment-section"
		>
			<CommentHeader />

			<CommentArea
				onCommentPosted={handleNewComment}
				stickers={stickers}
				user={user}
				profile={profile}
				authLoading={authLoading}
				film={film}
			/>

			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-8">
				<CommentSort sortBy={sortBy} setSortBy={setSortBy} />
			</div>

			<LayoutGroup>
				<div className="space-y-4 mt-8">
					{comments.length > 0 ? (
						<CommentList
							comments={comments}
							episodeId={episodeId}
							stickers={stickers}
							user={user}
							profile={profile}
							authLoading={authLoading}
							onDeleteComment={handleDeleteComment}
							film={film}
						/>
					) : (
						<CommentEmpty />
					)}
				</div>
			</LayoutGroup>

			<CommentLoadMore
				hasMore={hasMore}
				loading={loading}
				onLoadMore={handleLoadMore}
				hasComments={comments.length > 0}
			/>
		</section>
	)
}

export default CommentSection
