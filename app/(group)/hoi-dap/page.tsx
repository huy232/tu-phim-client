import FAQ from "@/components/FAQs"

interface Props {
	params: Promise<{ film_slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata = {
	title: "Giải Đáp Nghi Hoặc | Tu Phim",
	description:
		"Nơi giải đáp các thắc mắc thường gặp trên con đường tu luyện phim ảnh.",
}

export default async function FAQsPage({ params, searchParams }: Props) {
	return (
		<main className="min-h-screen container bg-[#0a0a0a]">
			<FAQ />
		</main>
	)
}
