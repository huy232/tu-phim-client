import { Metadata } from "next"
import Login from "./_clientComponent"

interface Props {
	params: Promise<{ film_slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata: Metadata = {
	title: "Ghi Danh Môn Phái | Tu Phim",
	description:
		"Đăng nhập vào Tu Phim để lưu trữ tiến độ tu luyện, thu thập linh bảo và đàm đạo cùng các vị đại năng.",
	robots: {
		index: false,
		follow: true,
	},
	openGraph: {
		title: "Ghi Danh Môn Phái | Tu Phim",
		description: "Đăng nhập để bắt đầu hành trình tu luyện tại Tu Phim.",
		siteName: "Tu Phim",
		type: "website",
	},
}

export default async function LoginPage({ params, searchParams }: Props) {
	return (
		<main className="min-h-screen bg-[#0a0a0a] pt-16">
			<Login />
		</main>
	)
}
