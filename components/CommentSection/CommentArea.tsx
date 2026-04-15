"use client"

import { useState, useRef } from "react"
import { Send, Loader2 } from "lucide-react"
import { postComment } from "@/services/binh-luan"

import CommentAuthGuard from "./CommentAuthGuard"
import CommentSpoilerButton from "./CommentSpoilerButton"
import CommentAvatar from "./CommentAvatar"
import StickerPicker from "./StickerPicker"
import { renderCommentWithStickers } from "@/utilities"
import { User } from "@supabase/supabase-js"
import { toast } from "sonner"

interface CommentAreaProps {
	episodeId?: string
	parentId?: string | null
	placeholder?: string
	onCommentPosted: (newComment: CommentWithProfile) => void
	stickers: Sticker[]
	user: User | null
	profile: UserProfile | null
	authLoading: boolean
	film: FilmInfo
}

const CommentArea = ({
	episodeId,
	parentId = null,
	placeholder = "Viết bình luận...",
	onCommentPosted,
	stickers,
	user,
	profile,
	authLoading,
	film,
}: CommentAreaProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSpoiler, setIsSpoiler] = useState(false)
	const [previewContent, setPreviewContent] = useState("")
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const adjustHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto"
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}

	const handleSubmit = async () => {
		const content = textareaRef.current?.value.trim()

		if (!user || !content || isSubmitting) return

		setIsSubmitting(true)
		try {
			const { data, error } = await postComment({
				film: film,
				user_id: user.id,
				content: content,
				episode_id: episodeId || null,
				parent_id: parentId,
				is_spoiler: isSpoiler,
			})

			if (error) {
				toast.error("Lỗi gửi bình luận.")
				return
			}

			if (data) {
				onCommentPosted(data)

				if (textareaRef.current) {
					textareaRef.current.value = ""
					textareaRef.current.style.height = "auto"
				}
				setPreviewContent("")
				setIsSpoiler(false)
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message)
				console.error("Critical error:", error)
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleSelectSticker = (code: string) => {
		const textarea = textareaRef.current
		if (!textarea) return

		const start = textarea.selectionStart
		const end = textarea.selectionEnd
		const text = textarea.value

		const newValue =
			text.substring(0, start) + ` ${code} ` + text.substring(end)

		textarea.value = newValue
		setPreviewContent(newValue)
		const newCursorPos = start + code.length + 2

		setTimeout(() => {
			textarea.setSelectionRange(newCursorPos, newCursorPos)
			textarea.focus()
			adjustHeight()
		}, 0)
	}

	return (
		<CommentAuthGuard loading={authLoading} user={user}>
			<div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start">
				{/* AVATAR */}
				<div className="shrink-0 self-center sm:self-auto">
					<CommentAvatar profile={profile} size="md" />
				</div>

				{/* INPUT AREA */}
				<div className="flex-1 w-full min-w-0">
					{/* PREVIEW */}
					{previewContent && (
						<div className="mb-3 p-3 sm:p-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] animate-in fade-in slide-in-from-top-1 text-[12px]">
							<div className="text-[9px] text-purple-400 uppercase font-black mb-2 tracking-widest opacity-50">
								Xem trước bình luận của bạn:
							</div>

							<div className="text-white/80 break-words flex flex-wrap">
								{renderCommentWithStickers(previewContent, stickers)}
							</div>
						</div>
					)}

					{/* TEXTAREA BOX */}
					<div className="rounded-2xl border border-white/10 bg-white/[0.03] focus-within:border-purple-500/50 focus-within:bg-white/[0.05] transition-all w-full">
						<textarea
							ref={textareaRef}
							value={previewContent}
							onChange={(e) => {
								setPreviewContent(e.target.value)
								adjustHeight()
							}}
							onKeyDown={(e) =>
								e.key === "Enter" && (e.ctrlKey || e.metaKey) && handleSubmit()
							}
							placeholder={placeholder}
							className="w-full p-3 sm:p-4 text-sm text-gray-200 outline-none min-h-[90px] sm:min-h-[100px] max-h-[400px] resize-none bg-transparent scrollbar-hide text-[12px]"
						/>

						{/* ACTION BAR */}
						<div className="flex items-center justify-between px-3 sm:px-4 py-3 border-t border-white/[0.05] bg-white/[0.01] gap-2">
							<div className="flex items-center gap-2 flex-wrap">
								<CommentSpoilerButton
									isActive={isSpoiler}
									onClick={() => setIsSpoiler(!isSpoiler)}
								/>
								<StickerPicker
									stickers={stickers}
									onSelect={handleSelectSticker}
								/>
							</div>

							<button
								onClick={handleSubmit}
								disabled={isSubmitting}
								className="flex items-center gap-2 px-3 sm:px-5 py-2.5  bg-purple-600 hover:bg-purple-500 disabled:bg-white/5 disabled:text-white/20 rounded-xl transition-all shadow-xl text-[11px] font-black uppercase tracking-widest shrink-0"
							>
								{isSubmitting ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									<>
										<span className="hidden sm:inline">Gửi tin</span>
										<Send size={14} />
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</CommentAuthGuard>
	)
}

export default CommentArea
