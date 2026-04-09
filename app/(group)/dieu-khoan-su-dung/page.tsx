import TermsOfService from "@/components/TermOfServices"

interface Props {
	params: Promise<{ film_slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata = {
	title: "Quy Tắc Môn Phái | Tu Phim",
	description:
		"Những quy định cần biết khi gia nhập và tu luyện tại thế giới Tu Phim.",
}

export default async function TOSPAge({ params, searchParams }: Props) {
	return (
		<main className="min-h-screen bg-[#0a0a0a]">
			<TermsOfService />
		</main>
	)
}
