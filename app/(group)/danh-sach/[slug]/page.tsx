import AdvanceFilter from "@/components/AdvanceFilter"
import PageFilmListContainer from "@/components/PageFilmListContainer"
import PageHeading from "@/components/PageHeading"
import { getNavigationData, LIST_CATALOG } from "@/constants"
import { Metadata } from "next"

interface Props {
	params: Promise<{ slug: string }>
}

// --- GENERATE METADATA CHO THIÊN BẢNG (DANH SÁCH) ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params

	const currentList = LIST_CATALOG.find(
		(l: { slug: string; name: string }) => l.slug === slug,
	)

	const listName = currentList ? currentList.name : "Danh Sách Đặc Sắc"
	const title = `${listName} - Tuyển Tập Phim Chọn Lọc | Tu Phim`
	const description = `Khám phá ${listName} tại Tu Phim. Nơi tổng hợp những bộ phim hay nhất, mới nhất được các đại năng tin dùng.`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			siteName: "Tu Phim",
			type: "website",
			url: `${process.env.NEXT_PUBLIC_DOMAIN}/danh-sach/${slug}`,
		},
	}
}

export default async function ListPage({ params }: Props) {
	const { slug } = await params
	const { genres, countries, years } = await getNavigationData()

	const currentList = LIST_CATALOG.find(
		(g: { slug: string; name: string }) => g.slug === slug,
	)

	const displayTitle = currentList ? `${currentList.name}` : "Danh Sách Bí Tịch"

	return (
		<main className="relative min-h-svh mt-24 px-4 md:px-10 max-w-7xl mx-auto w-full">
			<PageHeading
				slug={slug}
				displayTitle={displayTitle}
				type="Thiên Bảng"
				color="green"
			/>

			<AdvanceFilter
				genres={genres}
				countries={countries}
				years={years}
				context="danh-sach"
			/>

			<div className="mt-8">
				<PageFilmListContainer initialSlug={slug} type="danh-sach" />
			</div>
		</main>
	)
}
