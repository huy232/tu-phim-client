import TermsOfService from "@/components/TermOfServices"
export const metadata = {
	title: "Quy Tắc Môn Phái | Tu Phim",
	description:
		"Những quy định cần biết khi gia nhập và tu luyện tại thế giới Tu Phim.",
}

export default async function TOSPAge() {
	return (
		<main className="min-h-screen bg-[#0a0a0a]">
			<TermsOfService />
		</main>
	)
}
