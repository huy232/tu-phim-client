import Privacy from "@/components/Privacy"

interface Props {
	params: Promise<{ film_slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata = {
	title: "Linh Tư Bảo Mật | Tu Phim",
	description:
		"Cách thức Tu Phim bảo vệ thông tin và linh căn của các đạo hữu.",
}

export default async function PrivacyPage({ params, searchParams }: Props) {
	return (
		<main className="min-h-screen bg-[#0a0a0a]">
			<Privacy />
		</main>
	)
}
