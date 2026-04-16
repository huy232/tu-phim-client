"use client"
import { useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles, Trophy } from "lucide-react"

export default function ProfileHeader({ profile, levels }: ProfileHeaderProps) {
	const stats = useMemo(() => {
		const currentLevel =
			levels.find((l) => l.level === profile.level) || levels[0]

		const nextLevel = levels.find((l) => l.level === profile.level + 1)

		const color = currentLevel.color_code || "#9ca3af"
		const currentExp = profile.exp || 0

		const requiredExp = nextLevel
			? nextLevel.required_exp
			: currentLevel.required_exp

		const progress = nextLevel
			? Math.min((currentExp / requiredExp) * 100, 100)
			: 100

		return { currentLevel, nextLevel, progress, color }
	}, [profile, levels])

	const maskStyle = profile.equippedFrameMask
		? {
				WebkitMaskImage: `url(${profile.equippedFrameMask})`,
				maskImage: `url(${profile.equippedFrameMask})`,
				WebkitMaskSize: "contain",
				maskSize: "contain",
				WebkitMaskPosition: "center",
				maskPosition: "center",
				WebkitMaskRepeat: "no-repeat",
				maskRepeat: "no-repeat",
				maskMode: "luminance",
			}
		: {}

	return (
		<div className="relative w-full rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/50 backdrop-blur-xl p-8 md:p-12">
			<div
				className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[120px] opacity-20 animate-pulse"
				style={{ backgroundColor: stats.color }}
			/>

			<div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
				<div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
					<div
						className="absolute inset-2 rounded-full blur-[25px] opacity-30 animate-pulse"
						style={{ backgroundColor: stats.color }}
					/>

					<div
						className="absolute inset-0 z-10 w-full h-full flex items-center justify-center"
						style={maskStyle}
					>
						<Image
							src={profile.avatar_url || "/default-avatar.png"}
							alt="Avatar"
							width={200}
							height={200}
							className="object-cover w-full h-full p-4 rounded-full"
						/>
					</div>

					{profile.equippedFrame && (
						<div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
							<Image
								src={profile.equippedFrame}
								alt="Frame"
								width={160}
								height={160}
								className="w-full h-full object-contain"
								priority
							/>
						</div>
					)}
				</div>

				<div className="flex-1 text-center md:text-left space-y-4">
					<div>
						<div className="flex items-center justify-center md:justify-start gap-3 mb-1">
							<h1 className="text-3xl font-black text-white tracking-tight">
								{profile.full_name || "Vô Danh Đạo Hữu"}
							</h1>
							<span
								className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"
								style={{
									backgroundColor: `${stats.color}20`,
									color: stats.color,
									border: `1px solid ${stats.color}40`,
								}}
							>
								{stats.currentLevel.rank_title}
							</span>
						</div>
					</div>

					<div className="max-w-md mx-auto md:mx-0 space-y-2">
						<div className="flex justify-between items-end">
							<span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1">
								<Sparkles size={12} className="text-purple-400" />
								CẤP ĐỘ {profile.level}
							</span>
							<span className="text-[10px] font-mono text-zinc-500">
								{profile.exp.toLocaleString("en-US")} /{" "}
								{stats.nextLevel?.required_exp.toLocaleString("en-US") || "MAX"}{" "}
								EXP
							</span>
						</div>

						<div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: `${stats.progress}%` }}
								transition={{ duration: 1, ease: "easeOut" }}
								className="h-full rounded-full relative"
								style={{ backgroundColor: stats.color }}
							>
								<div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
							</motion.div>
						</div>
					</div>

					<div className="flex items-center justify-center md:justify-start gap-6 pt-2">
						<div className="flex items-center gap-2">
							<div className="p-2 rounded-lg bg-white/5 text-yellow-500">
								<Trophy size={16} />
							</div>
							<div>
								<p className="text-[10px] text-zinc-500 leading-none">
									Linh Thạch
								</p>
								<p className="text-sm font-bold text-white">
									{profile.gold || 0}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
