"use client"

import FilmSection from "../FilmCarousel/FilmSection"

interface CountryHighlightProps {
	koreanFilm: CountryData
	chineseFilm: CountryData
	usFilm: CountryData
}

const CountryHighlight = ({
	koreanFilm,
	chineseFilm,
	usFilm,
}: CountryHighlightProps) => {
	return (
		<div
			className="mx-auto max-w-420 mt-24 text-white rounded-2xl 
                bg-linear-to-b from-[#0a0a0a] via-[#0a0a0a]/50 to-purple-500/15 
                px-4 py-4 md:px-8 md:py-6 shadow-2xl"
		>
			<div className="space-y-12 md:space-y-20">
				<FilmSection
					title="Hàn Quốc: Vibe mới mỗi ngày"
					data={koreanFilm}
					slug="/quoc-gia/han-quoc"
					gradientFrom="from-blue-600"
					position="left"
				/>
				<FilmSection
					title="Trung Hoa: Đỉnh cao giải trí"
					data={chineseFilm}
					slug="/quoc-gia/trung-quoc"
					gradientFrom="from-red-600"
					position="left"
				/>

				<FilmSection
					title="Âu - Mỹ: Đậm chất điện ảnh"
					data={usFilm}
					slug="/quoc-gia/au-my"
					gradientFrom="from-yellow-500"
					position="left"
				/>
			</div>
		</div>
	)
}

export default CountryHighlight
