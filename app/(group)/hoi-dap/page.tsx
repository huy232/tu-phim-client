import FAQ from "@/components/FAQs"
export const metadata = {
	title: "Giải Đáp Nghi Hoặc | Tu Phim",
	description:
		"Nơi giải đáp các thắc mắc thường gặp trên con đường tu luyện phim ảnh.",
}

export default async function FAQsPage() {
	return (
		<main className="min-h-screen bg-[#0a0a0a]">
			<FAQ />
		</main>
	)
}
