"use client"
import { AnimatePresence, motion } from "framer-motion"
import { Autoplay, FreeMode } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from "react"
import CommentCard from "./CommentCard"
import { supabase } from "@/supabase/client"

interface Props {
	initialComments: CommentWithProfile[]
	initialStickers: Sticker[]
	limit: number
}

const CommentShowcaseClient = ({
	initialComments,
	initialStickers,
	limit,
}: Props) => {
	const [comments, setComments] = useState(initialComments)

	useEffect(() => {
		const channelName = `showcase-${Math.random().toString(36).substring(7)}`
		const channel = supabase.channel(channelName)

		channel
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "comments" },
				async (payload) => {
					if (payload.new.is_spoiler) return

					await new Promise((resolve) => setTimeout(resolve, 5000))

					const { data: fullComment } = await supabase
						.from("comment_with_stats")
						.select("*")
						.eq("id", payload.new.id)
						.single()

					if (fullComment) {
						setComments((prev) => [fullComment, ...prev].slice(0, limit))
					}
				},
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [limit])

	return (
		<section className="w-full py-8 overflow-hidden bg-linear-to-b from-transparent via-purple-500/5 to-transparent">
			<div className="container mx-auto px-4 mb-6">
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_purple]" />
					<h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">
						Bình luận mới nhất
					</h2>
				</div>
			</div>

			<div className="w-full px-4 md:px-0">
				<Swiper
					modules={[Autoplay, FreeMode]}
					spaceBetween={30}
					slidesPerView={"auto"}
					freeMode={true}
					loop={comments.length > 5}
					autoplay={{
						delay: 4000,
						disableOnInteraction: false,
					}}
					breakpoints={{
						320: { slidesPerView: 1.2 },
						640: { slidesPerView: 2.2 },
						1024: { slidesPerView: 3 },
						1440: { slidesPerView: 4 },
					}}
					className="comment-swiper"
				>
					<AnimatePresence initial={false}>
						{comments.map((comment) => (
							<SwiperSlide key={comment.id} className="h-auto py-4">
								<motion.div
									layout
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.9 }}
								>
									<CommentCard comment={comment} stickers={initialStickers} />
								</motion.div>
							</SwiperSlide>
						))}
					</AnimatePresence>
				</Swiper>
			</div>
		</section>
	)
}

export default CommentShowcaseClient
