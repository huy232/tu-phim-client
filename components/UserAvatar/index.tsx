import clsx from "clsx"
import Image from "next/image"

interface UserAvatarProps {
	profile: {
		avatar_url?: string | null
		equippedFrame?: string | null
		equippedFrameMask?: string | null
	}
	size?: "xs" | "sm" | "md" | "lg" | "xl" | number
	className?: string
}

export default function UserAvatar({
	profile,
	size = "md",
	className,
}: UserAvatarProps) {
	const sizeMap = {
		xs: "w-6 h-6",
		sm: "w-10 h-10",
		md: "w-16 h-16",
		lg: "w-32 h-32",
		xl: "w-40 h-40",
	}

	const containerSize =
		typeof size === "number" ? `w-[${size}px] h-[${size}px]` : sizeMap[size]

	const getPadding = () => {
		if (size === "sm") return "p-[10%]"
		return "p-[15%]"
	}

	return (
		<div
			className={clsx(
				"relative flex items-center justify-center shrink-0",
				containerSize,
				className,
			)}
		>
			{/* AVATAR / MASK */}
			<div
				className="absolute inset-0 z-10 w-full h-full flex items-center justify-center"
				style={{
					WebkitMaskImage: profile.equippedFrameMask
						? `url(${profile.equippedFrameMask})`
						: "none",
					maskImage: profile.equippedFrameMask
						? `url(${profile.equippedFrameMask})`
						: "none",
					WebkitMaskSize: "contain",
					maskSize: "contain",
					WebkitMaskPosition: "center",
					maskPosition: "center",
					WebkitMaskRepeat: "no-repeat",
					maskRepeat: "no-repeat",
					maskMode: "luminance",
					borderRadius: profile.equippedFrameMask ? "0" : "50%",
				}}
			>
				<Image
					src={profile.avatar_url || "/default-avatar.png"}
					alt="Avatar"
					width={200}
					height={200}
					className={clsx(
						"object-cover w-full h-full rounded-full",
						getPadding(),
					)}
				/>
			</div>

			{profile.equippedFrame && (
				<div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
					<Image
						src={profile.equippedFrame}
						alt="Frame"
						width={200}
						height={200}
						className="w-full h-full object-contain"
					/>
				</div>
			)}
		</div>
	)
}
