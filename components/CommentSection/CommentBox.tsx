"use client"

import { useState } from "react"

const CommentBox = ({
	parentId,
	initialValue = "",
	onSubmit,
	placeholder,
}: {
	parentId?: string | null
	initialValue?: string
	placeholder?: string
	onSubmit: (content: string) => void
}) => {
	const [value, setValue] = useState(initialValue)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		if (!value.trim()) return
		setLoading(true)

		await onSubmit(value)

		setValue("")
		setLoading(false)
	}

	return (
		<div className="border rounded-xl p-3 bg-white/5">
			<textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
				className="w-full bg-transparent outline-none text-sm"
			/>

			<div className="flex justify-between mt-2">
				{/* TODO: emoji + mention */}
				<div>@ mention | emoji</div>

				<button onClick={handleSubmit} disabled={loading}>
					{loading ? "..." : "Gửi"}
				</button>
			</div>
		</div>
	)
}

export default CommentBox
