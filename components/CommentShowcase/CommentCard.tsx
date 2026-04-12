"use client"

import CommentCardDesktop from "./CommentCardDesktop"
import CommentCardMobile from "./CommentCardMobile"

const CommentCard = ({
	comment,
	stickers,
	isMobile,
}: {
	comment: CommentWithProfile
	stickers: Sticker[]
	isMobile: boolean
}) => {
	if (isMobile) {
		return <CommentCardMobile comment={comment} stickers={stickers} />
	}

	return <CommentCardDesktop comment={comment} stickers={stickers} />
}

export default CommentCard
