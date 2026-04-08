"use client"
import { useRouter } from "next/navigation"
import { supabase } from "@/supabase/client"
import { TitleItem } from "./TitleItem"
import { InventoryItem } from "./InventoryItem"
import { useAuth } from "@/context/AuthContext"

interface AssetInventoryProps {
	allAssets: Asset[]
	profile: FullProfile
}

interface AssetStatus {
	isOwned: boolean
	isEquipped: boolean
	canUnlock: boolean
}

export default function AssetInventory({
	allAssets,
	profile,
}: AssetInventoryProps) {
	const { fetchProfile, user } = useAuth()

	const router = useRouter()

	const handleEquip = async (assetId: string, type: Asset["type"]) => {
		const { error } = await supabase.rpc("equip_user_asset", {
			target_asset_id: assetId,
			asset_type: type,
		})

		if (!error) {
			if (user) await fetchProfile(user.id)

			router.refresh()
		} else {
			console.error("Lỗi luyện hóa:", error.message)
		}
	}

	const getAssetStatus = (
		assetId: string,
		requiredLevel: number,
	): AssetStatus => {
		const userAsset = profile.user_assets?.find(
			(ua) => ua.assets.id === assetId,
		)
		return {
			isOwned: !!userAsset,
			isEquipped: userAsset?.is_equipped || false,
			canUnlock: profile.level >= requiredLevel,
		}
	}

	return (
		<div className="space-y-16">
			{/* Khung Hình */}
			<section className="space-y-4">
				<h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
					Khung Hình
				</h3>
				<div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
					{allAssets
						.filter((a) => a.type === "frame")
						.map((asset) => (
							<InventoryItem
								key={asset.id}
								asset={asset}
								{...getAssetStatus(asset.id, asset.required_level)}
								onClick={() => handleEquip(asset.id, asset.type)}
							/>
						))}
				</div>
			</section>

			{/* Huy Hiệu */}
			<section className="space-y-4">
				<h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
					Huy Hiệu
				</h3>
				<div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
					{allAssets
						.filter((a) => a.type === "badge")
						.map((asset) => (
							<InventoryItem
								key={asset.id}
								asset={asset}
								{...getAssetStatus(asset.id, asset.required_level)}
								onClick={() => handleEquip(asset.id, asset.type)}
							/>
						))}
				</div>
			</section>

			{/* Danh Hiệu (Title) */}
			<section className="space-y-4">
				<h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
					Danh Hiệu
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
					{allAssets
						.filter((a) => a.type === "title")
						.map((asset) => (
							<TitleItem
								key={asset.id}
								asset={asset}
								{...getAssetStatus(asset.id, asset.required_level)}
								onClick={() => handleEquip(asset.id, asset.type)}
							/>
						))}
				</div>
			</section>
		</div>
	)
}
