import { Metadata } from "next"
import { getActorByInfo, getFilmByInfo } from "@/services"
import InfoHero from "./_clientComponent"
import { getMainComments } from "@/services/binh-luan"
import { getStickers } from "@/services/emoji"
import { IMAGE_URL } from "@/constants"

interface Props {
	params: Promise<{ film_slug: string }>
}

// --- PHẦN GENERATE METADATA ĐỘNG ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { film_slug } = await params
	const filmResponse = await getFilmByInfo(film_slug)
	const film = filmResponse?.data

	if (!film) {
		return {
			title: "Bí Tịch Thất Lạc | Tu Phim",
			description: "Bí tịch này đã bị thất lạc trong dòng thời gian.",
		}
	}

	const title = `${film.name} - Bí Tịch Tu Tiên | Tu Phim`
	const description = film.content
		? film.content.slice(0, 160) + "..."
		: `Xem phim ${film.name} tại Tu Phim - Nơi hội tụ các đại năng đam mê điện ảnh.`

	// Tối ưu hóa ảnh hiển thị: Ưu tiên Thumb cho OpenGraph vì nó nằm ngang (1200x630)
	const thumbUrl = film.thumb_url
		? `${IMAGE_URL}/${film.thumb_url}`
		: `${IMAGE_URL}/${film.poster_url}`
	const posterUrl = film.poster_url
		? `${IMAGE_URL}/${film.poster_url}`
		: thumbUrl

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `${process.env.NEXT_PUBLIC_DOMAIN}/thong-tin/${film_slug}`,
			siteName: "Tu Phim",
			images: [
				{
					url: thumbUrl, // Ảnh ngang cho các nền tảng phổ biến
					width: 1200,
					height: 630,
					alt: `Bí tịch ${film.name}`,
				},
				{
					url: posterUrl, // Ảnh dọc - TypeScript sẽ thấy biến này đã được sử dụng
					width: 600,
					height: 900,
					alt: `Poster bí tịch ${film.name}`,
				},
			],
			type: "video.movie",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [thumbUrl],
		},
	}
}

// --- COMPONENT CHÍNH ---
export default async function InfoPage({ params }: Props) {
	const { film_slug } = await params
	const [mainFilmInfoResponse, actorInfoResponse, stickersResponse] =
		await Promise.all([
			getFilmByInfo(film_slug),
			getActorByInfo(film_slug),
			getStickers(),
		])

	const film = mainFilmInfoResponse?.data
	const actors = actorInfoResponse?.data || []
	const stickers = stickersResponse || []

	if (!film)
		return (
			<div className="min-h-svh flex items-center justify-center text-zinc-500 italic">
				Bí tịch đã bị xóa bỏ khỏi Thiên Đình...
			</div>
		)

	const { data: commentsData } = await getMainComments(film._id)
	const initialComments = commentsData || []

	return (
		<main className="min-h-svh w-full pt-16">
			<InfoHero
				film={film}
				actors={actors}
				initialComments={initialComments}
				stickers={stickers}
			/>
		</main>
	)
}
