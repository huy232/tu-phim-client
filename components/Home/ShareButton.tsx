"use client"
import { useState } from "react"
import { Check, Share2 } from "lucide-react"
import { toast } from "sonner"
import clsx from "clsx"

interface ShareButtonProps {
	slug: string
}

export const ShareButton = ({ slug }: ShareButtonProps) => {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		const shareUrl = `${window.location.origin}/thong-tin/${slug}`

		try {
			await navigator.clipboard.writeText(shareUrl)
			setCopied(true)
			toast.success("Đã sao chép liên kết!")

			setTimeout(() => {
				setCopied(false)
			}, 2000)
		} catch (err) {
			toast.error("Không thể sao chép liên kết")
		}
	}

	return (
		<button
			onClick={handleCopy}
			title="Chia sẻ phim"
			className={clsx(
				"cursor-pointer transition-all duration-300 hover:scale-110",
				copied
					? "text-green-400 scale-125"
					: "hover:text-purple-400 text-white",
			)}
		>
			{copied ? (
				<Check size={18} className="animate-in zoom-in duration-300" />
			) : (
				<Share2 size={18} />
			)}
		</button>
	)
}
