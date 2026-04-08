"use client"
import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
	Sparkles,
	ChevronDown,
	Flame,
	MessageCircleQuestion,
} from "lucide-react"

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
}

const faqVariants: Variants = {
	hidden: { scale: 0.95, opacity: 0 },
	visible: {
		scale: 1,
		opacity: 1,
		transition: { type: "spring", stiffness: 100 },
	},
}

const FAQS = [
	{
		q: "Làm sao để ta trở thành cao thủ tại Linh Đài?",
		a: "Đạo hữu chỉ cần chăm chỉ đàm đạo (comment), cày bí tịch (xem phim). Khi tích đủ linh khí (EXP), đạo hữu sẽ đột phá cảnh giới, nhận được khung tên lấp lánh và uy áp trấn áp quần hùng!",
	},
	{
		q: "Tại sao ta xem phim mà thần thức cứ bị đứng (buffering)?",
		a: "Có thể do đạo hữu đang ở vị diện (mạng) quá yếu, hoặc trận pháp server đang bị quá tải do quá nhiều đại năng cùng lúc đột phá. Hãy thử chuyển sang vị diện khác (Server dự phòng) xem sao.",
	},
	{
		q: "Ta dùng Google Log-in thì có cần luyện 'Mật Mã Chú' không?",
		a: "Không cần nhé đạo hữu! Với Google Đại Pháp, đạo hữu đã có một tấm 'Thẻ Bài Thông Thiên'. Chỉ cần một cái chạm tay là thần thức tự động nhập cảnh, không cần nhớ mật khẩu cho nặng đầu.",
	},
	{
		q: "Tại sao phim này lại có 'Spoil' (Tiết lộ thiên cơ)?",
		a: "Có một số đạo hữu tu vi quá cao, xem xong liền muốn chia sẻ thiên cơ. Nếu đạo hữu chưa muốn biết trước tương lai, hãy cẩn thận với những dòng chữ bị che mờ mịt bởi sương khói (Tag Spoil) nhé!",
	},
	{
		q: "Linh Đài có thu linh thạch (thu phí) của ta không?",
		a: "Tại đây, chúng ta tu luyện vì đam mê. Mọi bí tịch phim ảnh đều mở cửa miễn phí. Tuy nhiên, nếu đạo hữu muốn ủng hộ linh thạch để duy trì trận pháp, chúng ta luôn hoan hỉ.",
	},
	{
		q: "Bị khóa tài khoản (Banned) có thể luân hồi chuyển kiếp không?",
		a: "Nếu đạo hữu phạm vào Thiên Luật nghiêm trọng (Spam, phá hoại), linh căn sẽ bị phế bỏ vĩnh viễn. Muốn luân hồi? Hãy dùng một Gmail khác và tu tâm dưỡng tính lại từ đầu!",
	},
]

export default function FAQ() {
	const [openIdx, setOpenIdx] = useState<number | null>(null)

	return (
		<div className="min-h-screen bg-[#020202] text-zinc-400 py-24 px-4 relative overflow-hidden">
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(5)].map((_, i) => (
					<motion.div
						key={i}
						animate={{
							y: [0, -100, 0],
							opacity: [0, 0.4, 0],
							scale: [1, 1.5, 1],
						}}
						transition={{ duration: 8 + i, repeat: Infinity, delay: i * 2 }}
						className="absolute w-32 h-32 bg-purple-500/10 rounded-full blur-[60px]"
						style={{
							left: `${(i * 20 + 10) % 100}%`,
							top: `${(i * 15 + 20) % 100}%`,
						}}
					/>
				))}
			</div>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-3xl mx-auto relative z-10"
			>
				{/* Header Section */}
				<div className="text-center mb-16">
					<motion.div variants={faqVariants} className="inline-block relative">
						<Flame
							className="text-purple-500 absolute -top-8 -right-8 animate-pulse"
							size={32}
						/>
						<h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter italic">
							HỎI{" "}
							<span className="text-purple-500 text-6xl md:text-8xl">XOÁY</span>{" "}
							<br />
							ĐÁP <span className="text-zinc-200">XOAY</span>
						</h1>
					</motion.div>
					<motion.p
						variants={faqVariants}
						className="text-zinc-500 mt-4 flex items-center justify-center gap-2"
					>
						<Sparkles size={16} className="text-purple-400" />
						Giải đáp nghi vấn, khai thông bế tắc cho các đạo hữu
					</motion.p>
				</div>

				{/* FAQ Accordion List */}
				<div className="space-y-4">
					{FAQS.map((faq, i) => (
						<motion.div
							key={i}
							variants={faqVariants}
							className={`rounded-2xl border transition-all duration-300 ${
								openIdx === i
									? "bg-zinc-900/80 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
									: "bg-zinc-900/30 border-white/5 hover:border-white/10"
							}`}
						>
							<button
								onClick={() => setOpenIdx(openIdx === i ? null : i)}
								className="w-full p-6 flex items-center justify-between text-left group"
							>
								<div className="flex items-center gap-4">
									<div
										className={`p-2 rounded-lg transition-colors ${openIdx === i ? "bg-purple-500 text-white" : "bg-zinc-800 text-zinc-500"}`}
									>
										<MessageCircleQuestion size={20} />
									</div>
									<span
										className={`font-bold md:text-lg transition-colors ${openIdx === i ? "text-white" : "text-zinc-300"}`}
									>
										{faq.q}
									</span>
								</div>
								<motion.div
									animate={{ rotate: openIdx === i ? 180 : 0 }}
									className="text-zinc-600"
								>
									<ChevronDown size={20} />
								</motion.div>
							</button>

							<AnimatePresence>
								{openIdx === i && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3, ease: "easeInOut" }}
										className="overflow-hidden"
									>
										<div className="px-6 pb-6 pt-2 ml-14 border-t border-white/5">
											<p className="text-zinc-400 leading-relaxed italic relative">
												<span className="absolute -left-6 top-0 text-purple-500 font-black text-2xl">
													»
												</span>
												{faq.a}
											</p>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</div>

				{/* Call to Action */}
				<motion.div
					variants={faqVariants}
					className="mt-16 text-center p-8 rounded-[2rem] border border-dashed border-zinc-800 bg-zinc-900/20"
				>
					<p className="text-zinc-500 mb-4">
						Vẫn còn thắc mắc chưa được giải đáp?
					</p>
					<button className="px-8 py-3 bg-white text-black font-black rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 uppercase text-xs tracking-widest">
						Gửi thư truyền tin (Liên hệ)
					</button>
				</motion.div>
			</motion.div>
		</div>
	)
}
