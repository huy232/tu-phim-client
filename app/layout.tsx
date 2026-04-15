import type { Metadata } from "next"
import { Rowdies, Geist, Phudu, Lobster, Arima } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import { getNavigationData } from "@/constants"
import { AuthProvider } from "@/context/AuthContext"
import ScrollToTheTop from "@/components/ScrollToTheTop"
import { SidebarProvider } from "@/context/SidebarContext"
import { Toaster, toast } from "sonner"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import NextTopLoader from "nextjs-toploader"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const rowdies = Rowdies({
	variable: "--font-rowdies",
	subsets: ["vietnamese"],
	weight: ["300", "400", "700"],
	display: "auto",
})

const phudu = Phudu({
	variable: "--font-phudu",
	subsets: ["vietnamese"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
})

const lobster = Lobster({
	variable: "--font-lobster",
	subsets: ["vietnamese"],
	weight: ["400"],
	display: "swap",
})

const arima = Arima({
	variable: "--font-arima",
	subsets: ["vietnamese"],
	weight: ["400"],
	display: "swap",
})

export const metadata: Metadata = {
	title: "Tu phim - Trang chủ",
	description: "Xem phim thỏa thích.",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	let navData: NavigationData = { genres: [], countries: [], years: [] }

	try {
		const data = await getNavigationData()
		if (data) {
			navData = data
		}
	} catch (error) {
		toast.error(
			"⚠️ RootLayout: Không thể kết nối API. Đang dùng dữ liệu dự phòng để Build.",
		)
		console.error(error)
	}

	return (
		<html
			lang="vi"
			className={cn(
				"antialiased",
				rowdies.variable,
				geist.variable,
				phudu.variable,
				lobster.variable,
				arima.variable,
				"font-sans",
			)}
		>
			<body className="bg-foreground text-white flex flex-col min-h-screen">
				<NextTopLoader
					color="#ce53e0"
					initialPosition={0.08}
					crawlSpeed={200}
					height={5}
					crawl={true}
					showSpinner={false}
					easing="ease"
					speed={200}
					shadow={false}
					showAtBottom={true}
				/>
				<SidebarProvider>
					<AuthProvider>
						<Header initialData={navData} />
						<Toaster position="top-center" expand visibleToasts={5} />
						<Suspense>
							<ScrollToTheTop />
						</Suspense>
						{children}
						<Footer />
						<ScrollToTop />
					</AuthProvider>
				</SidebarProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
