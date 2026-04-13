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
		console.error(
			"⚠️ RootLayout: Không thể kết nối API. Đang dùng dữ liệu dự phòng để Build.",
		)
	}

	return (
		<html
			lang="en"
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
				<AuthProvider>
					<Header initialData={navData} />
					<ScrollToTheTop />
					{children}
					<Footer />
					<ScrollToTop />
				</AuthProvider>
			</body>
		</html>
	)
}
