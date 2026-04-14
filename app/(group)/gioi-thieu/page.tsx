import AboutUs from "@/components/AboutUs"
export const metadata = {
	title: "Sơ Lược Môn Phái | Tu Phim",
	description:
		"Tìm hiểu về nguồn gốc và tâm nguyện của những người sáng lập Tu Phim.",
}

export default async function AboutUsPage() {
	return (
		<main className="min-h-screen bg-[#0a0a0a]">
			<AboutUs />
		</main>
	)
}
