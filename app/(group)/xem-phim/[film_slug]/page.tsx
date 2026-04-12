import { Metadata } from "next"
import WatchFilm from "./_clientComponent"
import { getMainComments } from "@/services/binh-luan"
import { getStickers } from "@/services/emoji"
import { IMAGE_URL } from "@/constants"
import { fetchFilmInfoFromBackend } from "@/services"
import { getWatchedEpisodes } from "@/services/lich-su"

interface Props {
	params: Promise<{ film_slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// --- GENERATE METADATA CHO TRANG XEM PHIM ---
export async function generateMetadata({
	params,
	searchParams,
}: Props): Promise<Metadata> {
	const { film_slug } = await params
	const { ep } = await searchParams

	const filmResponse = await fetchFilmInfoFromBackend(film_slug)
	const film = filmResponse?.data

	if (!film) {
		return {
			title: "Đang Tìm Bí Tịch... | Tu Phim",
		}
	}

	const currentEp = ep ? ` - Tập ${ep}` : ""
	const title = `Đang Xem: ${film.name}${currentEp} | Tu Phim`
	const description = `Tu luyện bí tịch ${film.name}${currentEp}. ${film.content?.slice(0, 100)}...`

	const thumbUrl = film.thumb_url
		? `${IMAGE_URL}/${film.thumb_url}`
		: `${IMAGE_URL}/${film.poster_url}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `${process.env.NEXT_PUBLIC_DOMAIN}/xem-phim/${film_slug}${ep ? `?ep=${ep}` : ""}`,
			siteName: "Tu Phim",
			images: [
				{
					url: thumbUrl,
					width: 1200,
					height: 630,
					alt: `Đang xem ${film.title}`,
				},
			],
			type: "video.episode",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [thumbUrl],
		},
	}
}

// --- WATCH PAGE COMPONENT ---
export default async function WatchPage({ params, searchParams }: Props) {
	const { film_slug } = await params
	const { ep, sid, svt } = await searchParams

	const [watchFilmResponse, watchedEpisodesResponse, stickersResponse] =
		await Promise.all([
			fetchFilmInfoFromBackend(film_slug),
			getWatchedEpisodes(film_slug),
			getStickers(),
		])

	const watchFilmData = watchFilmResponse?.data || null
	const watchedData = watchedEpisodesResponse.data || {}

	if (!watchFilmData) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-zinc-500 italic">
				Thất bại khi triệu hồi bí tịch...
			</div>
		)
	}

	const { data: commentsData } = await getMainComments(watchFilmData._id)
	const initialComments = commentsData || []
	const stickers = stickersResponse || []

	return (
		<main className="min-h-screen bg-[#0a0a0a] pb-12 px-0 md:px-4 lg:px-6 pt-16">
			<WatchFilm
				film={watchFilmData}
				ep={ep as string}
				sid={sid as string}
				svt={svt as string}
				initialComments={initialComments}
				stickers={stickers}
				watchedData={watchedData}
			/>
		</main>
	)
}
