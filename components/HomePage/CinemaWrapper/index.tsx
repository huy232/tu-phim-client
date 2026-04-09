import FilmSection from "@/components/FilmCarousel/FilmSection"
import { CinemaMainHeading } from "@/components/Heading"
import { fetchFilmListFromBackend } from "@/services"

export async function CinemaWrapper() {
	const cinema = new URLSearchParams({
		limit: "24",
	}).toString()
	const trailer = new URLSearchParams({
		limit: "24",
	}).toString()

	const [movieRes, trailerRes] = await Promise.all([
		fetchFilmListFromBackend("phim-chieu-rap", cinema),
		fetchFilmListFromBackend("phim-sap-chieu", trailer),
	])

	const newestMovie = movieRes?.data || { items: [] }
	const newestTrailer = trailerRes?.data || { items: [] }

	return (
		<>
			{/* HEADING VÀ KHU VỰC ĐIỆN ẢNH */}
			<CinemaMainHeading />

			<div className="mx-auto my-4 text-white gap-4">
				<FilmSection
					title="Tận hưởng loạt phim chiếu rạp mới nhất"
					data={newestMovie}
					slug="/danh-sach/phim-chieu-rap"
					gradientFrom="from-green-600"
					position="left"
				/>
			</div>

			<div className="mx-auto mt-4 mb-20 text-white gap-4">
				<FilmSection
					title="Trailer các phim sắp ra, liệu có thành bom tấn?"
					data={newestTrailer}
					slug="/danh-sach/phim-sap-chieu"
					gradientFrom="from-red-600"
					position="right"
				/>
			</div>
		</>
	)
}
