"use client"

const Score = ({ film }: { film: FilmInfo }) => {
	return (
		<div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest justify-center md:justify-start w-full">
			{(film.tmdb?.vote_average > 0 || film.imdb?.vote_average > 0) && (
				<div className="flex items-center bg-black/60 rounded-full p-0.5 border border-white/10 shadow-2xl">
					{/* Badge TMDB */}
					{film.tmdb?.vote_average > 0 && (
						<div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full transition-colors">
							<span className="text-xs font-black text-blue-400 tracking-tighter">
								TMDB
							</span>
							<span className="text-xs font-bold text-white leading-none">
								{film.tmdb.vote_average.toFixed(1)}
							</span>
						</div>
					)}

					{film.tmdb?.vote_average > 0 && film.imdb?.vote_average > 0 && (
						<div className="w-px h-2.5 bg-white/20 mx-0.5" />
					)}

					{film.imdb?.vote_average > 0 && (
						<div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full transition-colors">
							<span className="text-xs font-black text-yellow-500 tracking-tighter">
								IMDB
							</span>
							<span className="text-xs font-bold text-white leading-none">
								{film.imdb.vote_average.toFixed(1)}
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Score
