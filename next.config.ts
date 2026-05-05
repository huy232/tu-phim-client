import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.ophim.live",
			},
			{
				protocol: "https",
				hostname: "api.qrserver.com",
			},
			{ protocol: "https", hostname: "media.discordapp.net" },
			{
				protocol: "https",
				hostname: "wsrv.nl",
			},
			{
				protocol: "https",
				hostname: "image.tmdb.org",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "lh2.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "lh1.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "aywlgeduzayczgrfbumy.supabase.co",
			},
		],
		unoptimized: true
	},
	
}

export default nextConfig
