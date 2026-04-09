import { Metadata } from "next"
import AdvanceFilter from "@/components/AdvanceFilter"
import PageFilmListContainer from "@/components/PageFilmListContainer"
import PageHeading from "@/components/PageHeading"
import { getNavigationData } from "@/constants"

interface Props {
	params: Promise<{ slug: string }>
}

// --- GENERATE METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const { genres } = await getNavigationData()

	const currentGenre = genres.find((g) => g.slug === slug)
	const genreName = currentGenre ? currentGenre.name : "Đặc Sắc"
	const title = `Phim ${genreName} Hay Nhất - Tuyển Tập Bí Tịch | Tu Phim`

	return {
		title,
		description: `Tổng hợp những bộ phim ${genreName} chọn lọc, linh khí dồi dào tại Tu Phim.`,
		openGraph: {
			title,
			url: `${process.env.NEXT_PUBLIC_DOMAIN}/the-loai/${slug}`,
		},
	}
}

// --- GENRE PAGE COMPONENT ---
export default async function GenrePage({ params }: Props) {
	const { slug } = await params

	const { genres, countries, years } = await getNavigationData()

	const currentGenre = genres.find((g) => g.slug === slug)
	const displayTitle = currentGenre
		? `Phim ${currentGenre.name}`
		: "Thể Loại Bí Tịch"

	return (
		<main className="relative min-h-svh mt-24 px-4 md:px-10 max-w-7xl mx-auto w-full">
			<PageHeading
				slug={slug}
				displayTitle={displayTitle}
				type="Pháp Môn"
				color="purple"
			/>

			{/* Dữ liệu sạch, không còn bóng dáng 'any' */}
			<AdvanceFilter
				genres={genres}
				countries={countries}
				years={years}
				context="the-loai"
			/>

			<div className="mt-8">
				<PageFilmListContainer initialSlug={slug} type="the-loai" />
			</div>
		</main>
	)
}
