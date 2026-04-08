"use client"
import { motion } from "framer-motion"
import { Calendar, Flame, Tv, Globe } from "lucide-react"
import { formatDateVN } from "@/utilities"
import EpisodeAiringCard from "./EpisodeAiringCard"

interface FilmStatsProps {
	data: {
		first_air_date?: Date
		last_air_date?: Date
		popularity?: number
		homepage?: string
		next_episode_to_air?: EpisodeAiring
		last_episode_to_air?: EpisodeAiring
	}
}

const FilmStats = ({ data }: FilmStatsProps) => {
	if (!data) return null

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	}

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			transition={{ staggerChildren: 0.1 }}
			className="flex flex-col gap-4 w-full"
		>
			<div className="grid grid-cols-2 gap-4">
				{data.last_episode_to_air && (
					<motion.div variants={itemVariants}>
						<EpisodeAiringCard
							episode={data.last_episode_to_air}
							label="Tập gần đây nhất"
						/>
					</motion.div>
				)}

				{data.next_episode_to_air && (
					<motion.div variants={itemVariants}>
						<EpisodeAiringCard
							episode={data.next_episode_to_air}
							label="Sắp chiếu"
							isNext
						/>
					</motion.div>
				)}
			</div>
		</motion.div>
	)
}

export default FilmStats
