import AboutUs from "@/components/AboutUs"

interface Props {
	params: Promise<{ film_slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata = {
	title: "Sơ Lược Môn Phái | Tu Phim",
	description:
		"Tìm hiểu về nguồn gốc và tâm nguyện của những người sáng lập Tu Phim.",
}

export default async function AboutUsPage({ params, searchParams }: Props) {
	return (
		<main className="min-h-screen container bg-[#0a0a0a]">
			<AboutUs />
		</main>
	)
}
