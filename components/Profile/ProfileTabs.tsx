"use client"
import { useState, useEffect } from "react"
import ContinueWatching from "./ContinueWatching"
import FavoriteFilms from "./FavoriteFilms"
import AssetInventory from "./AssetInventory"
import UserComments from "./UserComments"
import { motion } from "framer-motion"
import clsx from "clsx"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

interface ProfileTabsProps {
	initialData: {
		continueWatching: UserProgress[]
		favorites: FavoriteFilmItem[]
		favoritesCount: number
		allAssets: Asset[]
		profile: FullProfile
	}
}

const ProfileTabs = ({ initialData }: ProfileTabsProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const currentTab = searchParams.get("tab") || "tu-luyen"
	const [activeTab, setActiveTab] = useState(currentTab)

	useEffect(() => {
		setActiveTab(currentTab)
	}, [currentTab])

	const tabs = [
		{
			id: "tu-luyen",
			label: "Cảnh Giới",
			count: initialData.allAssets.filter((a) =>
				initialData.profile.user_assets?.some((ua) => ua.assets.id === a.id),
			).length,
		},
		{
			id: "phim-anh",
			label: "Tàng Kinh Các",
			count: initialData.favoritesCount,
		},
		{
			id: "binh-luan",
			label: "Truyền Tin",
		},
	]

	const handleTabChange = (tabId: string) => {
		setActiveTab(tabId)
		const params = new URLSearchParams(searchParams)
		params.set("tab", tabId)
		params.delete("page")
		router.push(`${pathname}?${params.toString()}`, { scroll: false })
	}

	return (
		<div className="space-y-10">
			{/* Tab Headers */}
			<div className="flex border-b border-white/5 gap-8 overflow-x-auto no-scrollbar">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => handleTabChange(tab.id)}
						className={clsx(
							"pb-4 text-sm font-bold uppercase tracking-[0.2em] transition-all relative whitespace-nowrap flex items-center gap-2",
							activeTab === tab.id
								? "text-purple-500"
								: "text-zinc-500 hover:text-white",
						)}
					>
						{tab.label}
						{tab.count !== undefined && (
							<span
								className={clsx(
									"text-[10px] px-1.5 py-0.5 rounded-full border",
									activeTab === tab.id
										? "border-purple-500/30 bg-purple-500/10"
										: "border-white/10 bg-white/5 text-zinc-600",
								)}
							>
								{tab.count}
							</span>
						)}

						{activeTab === tab.id && (
							<motion.div
								layoutId="activeTab"
								className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
							/>
						)}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<motion.div
				key={activeTab}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="min-h-[400px]"
			>
				{activeTab === "tu-luyen" && (
					<AssetInventory
						allAssets={initialData.allAssets}
						profile={initialData.profile}
					/>
				)}

				{activeTab === "phim-anh" && (
					<div className="space-y-16">
						<ContinueWatching
							initialContinueWatching={initialData.continueWatching}
						/>
						<FavoriteFilms
							initialFavorites={initialData.favorites}
							initialTotal={initialData.favoritesCount}
						/>
					</div>
				)}

				{activeTab === "binh-luan" && (
					<UserComments userId={initialData.profile.id} />
				)}
			</motion.div>
		</div>
	)
}

export default ProfileTabs
