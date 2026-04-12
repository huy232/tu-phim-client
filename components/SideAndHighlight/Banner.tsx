import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import BannerHighlight from "./BannerHighlight"

const Banner = ({ film }: { film: FilmInfo }) => {
	return (
		<div className="relative aspect-video rounded-xl overflow-hidden w-full h-full">
			<AnimatePresence mode="wait">
				<motion.div
					key={film._id}
					initial={{ opacity: 0, scale: 1.05 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.98 }}
					transition={{ duration: 0.4 }}
					className="absolute inset-0"
				>
					<BannerHighlight
						film={film}
						youtubeId={film.trailer_url?.split("v=")[1]?.split("&")[0] || null}
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default Banner
