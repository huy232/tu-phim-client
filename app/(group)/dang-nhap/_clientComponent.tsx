"use client"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Film, Popcorn, Ghost, Wand2 } from "lucide-react"
import { movieQuotes } from "@/constants/movieQuotes"
import { DiscordSVG, GoogleSVG } from "@/assets/icons"
import CinematicSide from "@/components/LoginSection/CinemaSide"
import { supabase } from "@/supabase/client"
import { useMediaQuery } from "@/hooks/useMediaQuery"

interface CyberParticle {
	id: number
	size: number
	left: string
	bottom: string
	color: string
	shadow: string
	maxY: string
	shakeX: number
	duration: number
	delay: number
}

const funnyStatus = [
	"Đăng nhập nhanh đi còn cày tiếp tập 5 bạn ơi! 🍿",
	"Hứa là xem nốt tập này rồi đi ngủ nhé?",
	"Vô lưu phim chứ để lướt mỏi tay tìm lại mệt lắm.",
	"Chào mừng chiến thần luyện phim xuyên màn đêm! 🦇",
	"Không đăng nhập là mất tủ phim đó.",
]

const Login = () => {
	const [currentQuote, setCurrentQuote] = useState(0)
	const [statusIndex, setStatusIndex] = useState(0)

	const isTablet = useMediaQuery("(max-width: 1024px)")

	const disableMotion = isTablet

	const motionProps = disableMotion
		? {}
		: {
				initial: { opacity: 0, y: 10 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: -10 },
				transition: { duration: 0.3 },
			}

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentQuote((prev) => (prev + 1) % movieQuotes.length)
			setStatusIndex((prev) => (prev + 1) % funnyStatus.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	const particles = useMemo<CyberParticle[]>(() => {
		return [...Array(15)].map((_, i) => {
			const pseudoRandom = (seed: number) => {
				const x = Math.sin(seed) * 10000
				return x - Math.floor(x)
			}

			const r1 = pseudoRandom(i + 1)
			const r2 = pseudoRandom(i + 2)
			const r3 = pseudoRandom(i + 3)
			const r4 = pseudoRandom(i + 4)

			const size = r1 * 4 + 2

			return {
				id: i,
				size,
				left: `${r2 * 100}%`,
				bottom: "-20px",
				color: i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#ec4899" : "#a855f7",
				shadow:
					i % 3 === 0
						? "0 0 10px #ea580c"
						: i % 3 === 1
							? "0 0 10px #db2777"
							: "0 0 10px #9333ea",
				maxY: `-${r3 * 60 + 40}vh`,
				shakeX: (r4 - 0.5) * 60,
				duration: r1 * 5 + 4,
				delay: r2 * 5,
			}
		})
	}, [])

	const handleOAuthLogin = async (provider: "google" | "discord") => {
		const siteUrl = process.env.NEXT_PUBLIC_URL || window.location.origin

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${siteUrl}/auth/callback`,
				queryParams: {
					access_type: "offline",
					prompt: "select_account",
				},
			},
		})

		if (error) {
			console.error(`Lỗi khi cố đăng nhập bằng ${provider}:`, error.message)
			return
		}
	}

	return (
		<div className="w-full h-svh grid grid-cols-1 lg:grid-cols-10 bg-[#0a0a0a] overflow-hidden font-rowdies">
			{!disableMotion && <CinematicSide currentQuote={currentQuote} />}

			<div className="col-span-1 md:col-span-3 flex flex-col justify-center items-center p-8 lg:p-12 bg-[#0a0a0a] border-l border-white/5 shadow-[-20px_0px_50px_rgba(0,0,0,0.5)] z-20 relative">
				<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
					{!disableMotion && (
						<>
							<motion.div
								animate={{
									x: [0, 15, -10, 0],
									y: [0, -20, 10, 0],
									scale: [1, 1.1, 0.9, 1],
								}}
								transition={{
									repeat: Infinity,
									duration: 8,
									ease: "easeInOut",
								}}
								className="absolute -top-10 -right-10 w-44 h-44 bg-purple-600/20 blur-[60px] rounded-full"
							/>

							<motion.div
								animate={{
									x: [0, -20, 20, 0],
									y: [0, 15, -15, 0],
									scale: [1, 0.9, 1.1, 1],
								}}
								transition={{
									repeat: Infinity,
									duration: 10,
									ease: "easeInOut",
									delay: 1,
								}}
								className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/20 blur-[50px] rounded-full"
							/>
						</>
					)}

					{!disableMotion &&
						particles.map((particle) => (
							<motion.div
								key={particle.id}
								className="absolute rounded-full"
								style={{
									width: particle.size,
									height: particle.size,
									left: particle.left,
									bottom: particle.bottom,
									background: particle.color,
									boxShadow: particle.shadow,
								}}
								animate={{
									y: ["0vh", particle.maxY],
									x: [0, particle.shakeX],
									opacity: [0, 0.8, 0],
								}}
								transition={{
									duration: particle.duration,
									repeat: Infinity,
									delay: particle.delay,
									ease: "easeOut",
								}}
							/>
						))}
				</div>

				<div className="w-full max-w-sm space-y-8">
					<div className="text-center md:text-left space-y-2">
						<h1 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
							Chuyên mục đăng nhập
							{disableMotion ? (
								<span>
									<Sparkles size={20} className="text-yellow-400" />
								</span>
							) : (
								<motion.span
									animate={{ rotate: [0, 15, -15, 0] }}
									transition={{ repeat: Infinity, duration: 2 }}
								>
									<Sparkles size={20} className="text-yellow-400" />
								</motion.span>
							)}
						</h1>

						<div className="h-5 overflow-hidden">
							{disableMotion ? (
								<p className="text-sm text-gray-500">
									{funnyStatus[statusIndex]}
								</p>
							) : (
								<AnimatePresence mode="wait">
									<motion.p key={statusIndex} {...motionProps}>
										{funnyStatus[statusIndex]}
									</motion.p>
								</AnimatePresence>
							)}
						</div>
					</div>

					<div className="space-y-3 pt-2">
						<motion.button
							whileHover={disableMotion ? undefined : { scale: 1.02 }}
							whileTap={disableMotion ? undefined : { scale: 0.98 }}
							onClick={() => handleOAuthLogin("google")}
							className="w-full flex items-center justify-center sm:justify-start gap-3 sm:gap-4 bg-white text-black font-semibold py-3 px-4 sm:pl-8 sm:pr-4 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer shadow-lg font-phudu"
						>
							<div className="w-6 sm:w-7 flex justify-center items-center shrink-0">
								<GoogleSVG size={24} />
							</div>

							<span className="text-sm sm:text-base leading-tight text-center sm:text-left">
								Đăng nhập bằng Google
							</span>
						</motion.button>

						<motion.button
							whileHover={disableMotion ? undefined : { scale: 1.02 }}
							whileTap={disableMotion ? undefined : { scale: 0.98 }}
							onClick={() => handleOAuthLogin("discord")}
							className="w-full flex items-center justify-center sm:justify-start gap-3 sm:gap-4 bg-[#5865F2] text-white font-semibold py-3 px-4 sm:pl-8 sm:pr-4 rounded-xl hover:bg-[#4752C4] transition-colors cursor-pointer shadow-lg font-phudu"
						>
							<div className="w-6 sm:w-7 flex justify-center items-center shrink-0">
								<DiscordSVG size={24} className="fill-white" />
							</div>

							<span className="text-sm sm:text-base leading-tight text-center sm:text-left">
								Đăng nhập bằng Discord
							</span>
						</motion.button>
					</div>

					<div className="flex items-center justify-around text-gray-700 py-4 border-t border-white/5 mt-4">
						<motion.div className="cursor-pointer hover:text-purple-400 transition-colors">
							<Popcorn size={18} />
						</motion.div>
						<motion.div className="cursor-pointer hover:text-pink-400 transition-colors">
							<Film size={18} />
						</motion.div>
						<motion.div className="cursor-pointer hover:text-blue-400 transition-colors">
							<Ghost size={18} />
						</motion.div>
						<motion.div className="cursor-pointer hover:text-yellow-400 transition-colors">
							<Wand2 size={18} />
						</motion.div>
					</div>

					<p className="text-[11px] text-center text-gray-700 leading-relaxed pt-2">
						Không có điều khoản gì ở đây đâu, cứ bấm bừa vào 1 trong 2 cái nút ở
						trên để đăng nhập là được!
					</p>
				</div>
			</div>
		</div>
	)
}

export default Login
