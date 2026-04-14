import AdvanceFilter from "@/components/AdvanceFilter"
import PageFilmListContainer from "@/components/PageFilmListContainer"
import PageHeading from "@/components/PageHeading"
import { getNavigationData, LIST_CATALOG } from "@/constants" // LIST_CATALOG là data tĩnh
import { Metadata } from "next"
import { Suspense } from "react"

interface Props {
	params: Promise<{ slug: string }>
}

// --- GENERATE METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params

	const currentList = LIST_CATALOG.find(
		(l: { slug: string; name: string }) => l.slug === slug,
	)

	const listName = currentList ? currentList.name : "Danh Sách Đặc Sắc"
	const title = `${listName} - Tuyển Tập Phim Chọn Lọc | Tu Phim`

	return {
		title,
		description: `Khám phá ${listName} tại Tu Phim. Nơi tổng hợp những bộ phim hay nhất được các đại năng tin dùng.`,
		openGraph: {
			title,
			url: `${process.env.NEXT_PUBLIC_DOMAIN}/danh-sach/${slug}`,
		},
	}
}

// --- LIST PAGE COMPONENT ---
export default async function ListPage({ params }: Props) {
	const { slug } = await params

	const { genres, countries, years } = await getNavigationData()

	const currentList = LIST_CATALOG.find(
		(l: { slug: string; name: string }) => l.slug === slug,
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
