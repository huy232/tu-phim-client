import Privacy from "@/components/Privacy"

export const metadata = {
	title: "Linh Tư Bảo Mật | Tu Phim",
	description:
		"Cách thức Tu Phim bảo vệ thông tin và linh căn của các đạo hữu.",
}

export default async function PrivacyPage() {
	return (
		<main className="min-h-screen bg-[#0a0a0a]">
			<Privacy />
		</main>
	)
}
