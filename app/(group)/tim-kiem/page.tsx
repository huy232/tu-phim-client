import { Metadata } from "next"
import PageFilmListContainer from "@/components/PageFilmListContainer"
import PageHeading from "@/components/PageHeading"
import { Suspense } from "react"

interface Props {
	params: Promise<{ [key: string]: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// --- GENERATE METADATA CHO TÌM KIẾM ---
export async function generateMetadata({
	searchParams,
}: Props): Promise<Metadata> {
	const sParams = await searchParams
	const keyword = (sParams.keyword as string) || ""

	const decodedQuery = decodeURIComponent(keyword)

	const title = keyword
		? `Truy tìm: ${decodedQuery} | Tu Phim`
		: "Truy Tìm Bí Tịch | Tu Phim"

	const description = keyword
		? `Kết quả tìm kiếm bí tịch cho từ khóa "${decodedQuery}" tại Tu Phim. Chúc đạo hữu sớm tìm được chân kinh!`
		: "Tìm kiếm những bộ phim tu tiên, hành động, kiếm hiệp đặc sắc nhất tại Tu Phim."

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			siteName: "Tu Phim",
			type: "website",
		},
		robots: {
			index: false,
			follow: true,
		},
	}
}

// --- SEARCH PAGE COMPONENT ---
export default async function SearchPage({ searchParams }: Props) {
	const sParams = await searchParams
	const keyword = (sParams.keyword as string) || ""

	const decodedQuery = decodeURIComponent(keyword)
	const displayTitle = keyword
		? `Kết quả cho: ${decodedQuery}`
		: "Thần thức đang trống..."

	return (
		<main className="relative min-h-svh mt-24 px-4 md:px-10 max-w-7xl mx-auto w-full">
			<PageHeading
				slug={keyword}
				displayTitle={displayTitle}
				type="Truy Tìm Bí Tịch"
				color="purple"
			/>
			<PageFilmListContainer initialSlug={keyword} type="tim-kiem" />

			{!keyword && (
				<div className="mt-20 text-center text-zinc-600 italic">
					Đạo hữu vui lòng nhập từ khóa để khởi động trận pháp tìm kiếm.
				</div>
			)}
		</main>
	)
}
