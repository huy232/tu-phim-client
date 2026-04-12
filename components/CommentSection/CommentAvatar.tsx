"use client"

import UserAvatar from "../UserAvatar"

interface CommentAvatarProps {
	profile?: {
		avatar_url?: string | null
		equippedFrame?: string | null
		equippedFrameMask?: string | null
	} | null
	size: "xs" | "sm" | "md" | "lg" | "xl"
}

const CommentAvatar = ({ profile, size }: CommentAvatarProps) => {
	return (
		<UserAvatar
			profile={{
				avatar_url: profile?.avatar_url,
				equippedFrame: profile?.equippedFrame,
				equippedFrameMask: profile?.equippedFrameMask,
			}}
			size={size}
			className="shadow-lg"
		/>
	)
}

export default CommentAvatar
