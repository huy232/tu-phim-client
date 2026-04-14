import { Metadata } from "next"
import AdvanceFilter from "@/components/AdvanceFilter"
import PageFilmListContainer from "@/components/PageFilmListContainer"
import PageHeading from "@/components/PageHeading"
import { getNavigationData } from "@/constants"
import { Suspense } from "react"

interface Props {
	params: Promise<{ slug: string }>
}

// --- GENERATE METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const { countries } = await getNavigationData()

	const currentCountry = countries.find((c) => c.slug === slug)

	const countryName = currentCountry ? currentCountry.name : "Quốc Tế"
	const title = `Phim ${countryName} Hay Nhất - Bí Tịch Các Đại Lục | Tu Phim`
	const description = `Tổng hợp những bộ phim ${countryName} chọn lọc nhất tại Tu Phim.`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `${process.env.NEXT_PUBLIC_DOMAIN}/quoc-gia/${slug}`,
		},
	}
}

// --- COUNTRY PAGE COMPONENT ---
export default async function CountryPage({ params }: Props) {
	const { slug } = await params

	const { genres, countries, years } = await getNavigationData()

	const currentCountry = countries.find((c) => c.slug === slug)

	const displayTitle = currentCountry
		? `${currentCountry.name}`
		: "Phim Theo Quốc Gia"

	return (
		<main className="relative min-h-svh mt-24 px-4 md:px-10 max-w-7xl mx-auto w-full">
			<PageHeading
				slug={slug}
				displayTitle={displayTitle}
				type="Đại Lục"
				color="orange"
			/>
			<AdvanceFilter
				genres={genres}
				countries={countries}
				years={years}
				context="quoc-gia"
			/>

			<div className="mt-8">
				<PageFilmListContainer initialSlug={slug} type="quoc-gia" />
			</div>
		</main>
	)
}
