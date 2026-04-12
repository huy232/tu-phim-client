"use client"

import dynamic from "next/dynamic"
import { useMediaQuery, useMounted } from "@/hooks/useMediaQuery"
import DesktopBannerSkeleton from "./DesktopBannerSkeleton"
import MobileBannerSkeleton from "./MobileBannerSkeleton"

const DesktopBanner = dynamic(() => import("./DesktopBanner"), {
	ssr: false,
	loading: () => <DesktopBannerSkeleton />,
})

const MobileBanner = dynamic(() => import("./MobileBanner"), {
	ssr: false,
	loading: () => <MobileBannerSkeleton />,
})

const Banner = ({ films }: { films: FilmInfo[] }) => {
	const isDesktop = useMediaQuery("(min-width: 1024px)")
	const mounted = useMounted()

	if (!mounted) {
		return (
			<div className="h-[320px] md:h-[660px] w-full bg-[#0a0a0a] animate-pulse" />
		)
	}

	return isDesktop ? (
		<DesktopBanner films={films} />
	) : (
		<MobileBanner films={films} />
	)
}

export default Banner
