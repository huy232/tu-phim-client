import Legal from "@/components/Legal"

interface Props {
	params: Promise<{ film_slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata = {
	title: "Vô Ảnh Thủ Ấn | Tu Phim",
	description: "Tuyên bố miễn trừ trách nhiệm pháp lý tại Linh Đài Tu Phim.",
}

export default async function LegalPage({ params, searchParams }: Props) {
	return (
		<main className="min-h-screen bg-[#0a0a0a]">
			<Legal />
		</main>
	)
}
