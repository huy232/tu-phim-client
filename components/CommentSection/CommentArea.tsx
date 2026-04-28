"use client"

import { useState, useRef } from "react"
import { Send, Loader2 } from "lucide-react"
import { postComment, updateComment } from "@/services/binh-luan"

import CommentAuthGuard from "./CommentAuthGuard"
import CommentSpoilerButton from "./CommentSpoilerButton"
import CommentAvatar from "./CommentAvatar"
import StickerPicker from "./StickerPicker"
import { renderCommentWithStickers } from "@/utilities"
import { User } from "@supabase/supabase-js"
import { toast } from "sonner"
import Image from "next/image"
import { useMentions } from "@/hooks/useMention"

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
	mode?: "create" | "edit"
	defaultValue?: string
	commentId?: string

	// ✅ thêm cái này
	onCancel?: () => void
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
	mode,
	defaultValue,
	commentId,
	onCancel, // ✅ nhận prop
}: CommentAreaProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSpoiler, setIsSpoiler] = useState(false)
	const [previewContent, setPreviewContent] = useState(defaultValue || "")
	const [mentionQuery, setMentionQuery] = useState("")
	const [showMentionBox, setShowMentionBox] = useState(false)

	const mentionUsers = useMentions(mentionQuery)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	// ================= AUTO HEIGHT =================
	const adjustHeight = () => {
		const el = textareaRef.current
		if (!el) return
		el.style.height = "auto"
		el.style.height = `${el.scrollHeight}px`
	}

	// ================= INSERT MENTION =================
	const insertMention = (username: string) => {
		const textarea = textareaRef.current
		if (!textarea) return

		const start = textarea.selectionStart
		const text = previewContent

		const before = text.slice(0, start)
		const after = text.slice(start)

		const newBefore = before.replace(/@\w*$/, `@${username} `)
		const newValue = newBefore + after

		setPreviewContent(newValue)
		setShowMentionBox(false)

		requestAnimationFrame(() => {
			const newPos = newBefore.length
			textarea.setSelectionRange(newPos, newPos)
			textarea.focus()
			adjustHeight()
		})
	}

	// ================= SUBMIT =================
	const handleSubmit = async () => {
		const content = previewContent.trim()

		if (!user || !content || isSubmitting) return

		setIsSubmitting(true)

		try {
			if (mode === "edit" && commentId) {
				const { data, error } = await updateComment(
					commentId,
					user.id,
					content,
					isSpoiler,
				)

				if (error) {
					toast.error("Lỗi cập nhật bình luận")
					return
				}

				if (data) {
					onCommentPosted(data)
				}
			} else {
				const { data, error } = await postComment({
					film,
					user_id: user.id,
					content,
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

					setPreviewContent("")
					setIsSpoiler(false)
					setMentionQuery("")
					setShowMentionBox(false)

					requestAnimationFrame(() => {
						if (textareaRef.current) {
							textareaRef.current.style.height = "auto"
						}
					})
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message)
				console.error(error)
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	// ================= STICKER =================
	const handleSelectSticker = (code: string) => {
		const textarea = textareaRef.current
		if (!textarea) return

		const start = textarea.selectionStart
		const end = textarea.selectionEnd

		const newValue =
			previewContent.substring(0, start) +
			` ${code} ` +
			previewContent.substring(end)

		setPreviewContent(newValue)

		requestAnimationFrame(() => {
			const newCursorPos = start + code.length + 2
			textarea.setSelectionRange(newCursorPos, newCursorPos)
			textarea.focus()
			adjustHeight()
		})
	}

	return (
		<CommentAuthGuard loading={authLoading} user={user}>
			<div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start">
				<div className="shrink-0 self-center sm:self-auto">
					<CommentAvatar profile={profile} size="md" />
				</div>

				<div className="flex-1 w-full min-w-0">
					{previewContent && (
						<div className="mb-3 p-3 sm:p-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] text-[12px]">
							<div className="text-[9px] text-purple-400 uppercase font-black mb-2 opacity-50">
								Xem trước bình luận:
							</div>
							<div className="text-white/80 break-words flex flex-wrap">
								{renderCommentWithStickers(previewContent, stickers)}
							</div>
						</div>
					)}

					<div className="relative rounded-2xl border border-white/10 bg-white/[0.03] focus-within:border-purple-500/50">
						<textarea
							ref={textareaRef}
							value={previewContent}
							onChange={(e) => {
								const value = e.target.value
								setPreviewContent(value)
								adjustHeight()

								const cursor = e.target.selectionStart
								const match = value.slice(0, cursor).match(/@(\w*)$/)

								if (match) {
									setMentionQuery(match[1])
									setShowMentionBox(true)
								} else {
									setShowMentionBox(false)
								}
							}}
							placeholder={placeholder}
							className="w-full p-4 text-sm text-gray-200 outline-none min-h-[100px] max-h-[400px] resize-none bg-transparent"
						/>

						<div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.05]">
							<div className="flex gap-2">
								<CommentSpoilerButton
									isActive={isSpoiler}
									onClick={() => setIsSpoiler(!isSpoiler)}
								/>
								<StickerPicker
									stickers={stickers}
									onSelect={handleSelectSticker}
								/>
							</div>

							<div className="flex items-center gap-2">
								{/* ✅ NÚT HỦY */}
								{mode === "edit" && (
									<button
										type="button"
										onClick={() => {
											setPreviewContent(defaultValue || "")
											onCancel?.()
										}}
										className="px-3 py-2 text-[11px] text-white/60 hover:text-white"
									>
										Hủy
									</button>
								)}

								<button
									onClick={handleSubmit}
									disabled={isSubmitting}
									className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-white/5 rounded-xl text-[11px] font-black uppercase"
								>
									{isSubmitting ? (
										<Loader2 size={16} className="animate-spin" />
									) : (
										<>
											<span className="hidden sm:inline">Gửi</span>
											<Send size={14} />
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CommentAuthGuard>
	)
}

export default CommentArea
