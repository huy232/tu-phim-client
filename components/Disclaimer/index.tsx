import { motion } from "framer-motion"
import { ShieldAlert, Sparkles } from "lucide-react"

const Disclaimer = () => {
	return (
		<div className="pt-4 border-t border-white/10 mt-2">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="relative p-3.5 rounded-xl overflow-hidden border border-purple-500/20 bg-linear-to-br from-purple-900/10 via-[#0a0a0a] to-white/2"
			>
				<div className="absolute inset-0 -z-10 bg-linear-to-r from-purple-600/5 to-pink-600/5 blur-xl opacity-50" />

				<div className="flex items-center gap-2 mb-1.5">
					<motion.div
						animate={{
							rotate: [0, 5, -5, 0],
							scale: [1, 1.1, 1.1, 1],
						}}
						transition={{
							repeat: Infinity,
							duration: 4,
							ease: "easeInOut",
						}}
						className="text-purple-400"
					>
						<ShieldAlert size={15} />
					</motion.div>
					<h5 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1">
						Lưu ý về Quảng cáo
						<Sparkles size={11} className="text-yellow-400 inline" />
					</h5>
				</div>

				<p className="text-[16px] leading-relaxed text-gray-400">
					Tất cả quảng cáo <span className="italic">(nếu có)</span> xuất hiện
					trong lúc xem đều thuộc về{" "}
					<span className="text-white font-medium">
						máy chủ nguồn phát video
					</span>{" "}
					và mình không hề nhận được một đồng nào cả. Trang web của mình được
					xây dựng phi lợi nhuận và{" "}
					<span className="text-purple-400 font-bold bg-purple-500/10 px-1 rounded">
						cam kết 100% không chèn bất kỳ quảng cáo nào từ phía mình để
					</span>{" "}
					làm phiền trải nghiệm của các bạn.
				</p>

				<motion.div
					className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
					initial={{ x: "-100%" }}
					animate={{ x: "100%" }}
					transition={{
						repeat: Infinity,
						repeatType: "loop",
						duration: 3,
						ease: "linear",
						delay: 1,
					}}
				/>
			</motion.div>
		</div>
	)
}

export default Disclaimer
