"use client"
import { motion } from "framer-motion"
import CastGrid from "./CastGrid"
import CrewGrid from "./CrewGrid"

const PeopleSection = ({
	cast,
	groupCrew,
}: {
	cast: Person[]
	groupCrew: Record<string, Person[]>
}) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="space-y-4"
		>
			<CastGrid cast={cast} />
			<CrewGrid groupCrew={groupCrew} />
		</motion.div>
	)
}
export default PeopleSection
