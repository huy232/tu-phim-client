import Image from "next/image"
import { Lock } from "lucide-react"

interface InventoryItemProps {
	asset: Asset
	isOwned: boolean
	canUnlock: boolean
	isEquipped: boolean
	onClick: () => void
}

export const InventoryItem = ({
	asset,
	isOwned,
	canUnlock,
	isEquipped,
	onClick,
}: InventoryItemProps) => {
	const isInteractable = isOwned || canUnlock

	return (
		<button
			disabled={!isInteractable}
			onClick={onClick}
			className={`group relative aspect-square rounded-2xl border transition-all duration-300 ${
				isEquipped
					? "border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
					: isOwned
						? "border-white/10 bg-white/5 hover:border-white/20"
						: canUnlock
							? "border-yellow-500/50 bg-yellow-500/5 hover:bg-yellow-500/10"
							: "border-white/5 bg-white/5 opacity-50 cursor-not-allowed"
			}`}
		>
			<div className="relative w-full h-full p-3">
				{asset.image_url && (
					<Image
						src={asset.image_url}
						alt={asset.name}
						fill
						className={`object-contain p-2 transition-all ${!isInteractable ? "grayscale" : ""}`}
					/>
				)}
			</div>

			{isEquipped && (
				<div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-purple-500/20 rounded-2xl backdrop-blur-[2px]">
					<span className="text-[8px] font-black text-white uppercase bg-purple-600 px-2 py-1 rounded">
						Gỡ bỏ
					</span>
				</div>
			)}

			{!isOwned && !canUnlock && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
					<Lock size={16} className="text-zinc-600" />
				</div>
			)}
		</button>
	)
}
