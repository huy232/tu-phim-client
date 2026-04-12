import clsx from "clsx"
import { Server } from "lucide-react"
import React from "react"

interface ServerTabProps {
	episodes: Episodes[]
	setActiveChunk: (value: React.SetStateAction<number>) => void
	activeServer: Episodes
	setActiveServer: (server: Episodes) => void
}

const ServerTab = ({
	episodes,
	setActiveServer,
	setActiveChunk,
	activeServer,
}: ServerTabProps) => {
	return (
		<div className="flex gap-2 mt-6 mb-2 flex-nowrap overflow-x-auto md:flex-wrap md:overflow-visible py-4 md:pb-0 scrollbar-hide">
			{episodes.map((server) => {
				const uniqueKey = `${server.server_source}-${server.server_type}-${server.server_name}`

				const isActive =
					activeServer.server_source === server.server_source &&
					activeServer.server_type === server.server_type &&
					activeServer.server_name === server.server_name

				return (
					<button
						key={uniqueKey}
						onClick={() => {
							setActiveServer(server)
							setActiveChunk(0)
						}}
						className={clsx(
							`
					flex items-center gap-2 whitespace-nowrap
					px-4 py-2 rounded-full text-xs font-bold border
					transition-all shrink-0
					`,
							isActive
								? "bg-white/10 border-purple text-purple shadow-[0_0_15px_rgba(168,85,247,0.2)]"
								: "bg-white/5 border-white/10 text-gray-500 hover:text-white",
						)}
					>
						<Server size={14} />
						{server.server_name}
					</button>
				)
			})}
		</div>
	)
}

export default ServerTab
