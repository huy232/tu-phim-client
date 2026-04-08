import ProfileHeader from "@/components/Profile/ProfileHeader"
import ProfileTabs from "@/components/Profile/ProfileTabs"
import { getFullProfileData } from "@/services/tai-khoan"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
	title: "Thông Tin Đạo Hữu | Tu Phim",
	description:
		"Quản lý linh căn, danh hiệu và kho tàng bí tịch của bạn tại Tu Phim.",
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
}

export default async function ProfilePage() {
	const data = await getFullProfileData()

	if (!data || !data.profile) {
		redirect("/dang-nhap")
	}

	const rawProfile = data.profile as RawProfile

	// 1. Lấy Frame
	const equippedFrameAsset =
		rawProfile.user_assets?.find(
			(ua) => ua.is_equipped && ua.assets.type === "frame",
		)?.assets || null

	// 2. Lấy Badge
	const equippedBadge =
		rawProfile.user_assets?.find(
			(ua) => ua.is_equipped && ua.assets.type === "badge",
		)?.assets.image_url || null

	// 3. Lấy Danh sách Title (Mảng)
	const equippedTitles =
		rawProfile.user_assets
			?.filter((ua) => ua.is_equipped && ua.assets.type === "title")
			.map((ua) => ua.assets) || []

	// 1. Lấy Image URL của Frame
	const equippedFrame = equippedFrameAsset?.image_url || null

	// 2. Lấy Mask URL từ metadata
	const equippedFrameMask = equippedFrameAsset?.metadata?.mask_url || null

	const cleanProfile: FullProfile = {
		...rawProfile,
		equippedFrame,
		equippedFrameMask,
		equippedBadge,
		equippedTitles,
	}

	return (
		<main className="min-h-screen bg-[#050505] pt-24 pb-20 px-4 md:px-6">
			<div className="max-w-7xl mx-auto space-y-12">
				{/* ProfileHeader giờ đây sẽ nhận được cả mảng danh hiệu để hiển thị */}
				<ProfileHeader profile={cleanProfile} levels={data.levels} />

				<ProfileTabs
					initialData={{
						continueWatching: data.continueWatching,
						favorites: data.favorites,
						favoritesCount: data.favoritesCount || data.favorites.length,
						allAssets: data.allAssets,
						profile: cleanProfile,
					}}
				/>
			</div>
		</main>
	)
}
