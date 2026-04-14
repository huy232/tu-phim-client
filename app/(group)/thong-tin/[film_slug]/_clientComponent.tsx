"use client"
import dynamic from "next/dynamic"
import ActionButtons from "@/components/Info/ActionButtons"
import Banner from "@/components/Info/Banner"
import ContentSection from "@/components/Info/ContentSection"
import LeftSide from "@/components/Info/LeftSide"
import Score from "@/components/Info/Score"
import YoutubePlayer from "@/components/Info/YoutubePlayer"
import { departmentMap } from "@/constants"
import FilmStats from "@/components/Info/FilmStats"
import CommentSection from "@/components/CommentSection"
import { ReviewFormWrapper } from "@/components/Review/ReviewFormWrapper"
import { ReviewSection } from "@/components/Review/ReviewSection"

const EpisodeSection = dynamic(
	() => import("@/components/EpisodeSection.tsx"),
	{
		ssr: false,
		loading: () => (
			<div className="h-30 w-full bg-white/5 animate-pulse rounded-xl mt-12" />
		),
	},
)

const MediaGallery = dynamic(() => import("@/components/Info/MediaGallery"), {
	ssr: false,
	loading: () => (
		<div className="h-150 w-full bg-white/5 animate-pulse rounded-xl mt-10" />
	),
})

const ExtraTMDBContent = dynamic(
	() => import("@/components/Info/ExtraTMDBContent"),
	{
		ssr: false,
	},
)

const PeopleSection = dynamic(() => import("@/components/Info/PeopleSection"), {
	ssr: false,
	loading: () => (
		<div className="space-y-4 mt-6">
			<div className="h-48 w-full bg-white/5 animate-pulse rounded-xl border border-white/5" />
			<div className="h-32 w-full bg-white/5 animate-pulse rounded-xl border border-white/5" />
		</div>
	),
})

const RelatedFilm = dynamic(() => import("@/components/Info/RelatedFilm"), {
	ssr: false,
	loading: () => (
		<div className="h-60 w-full bg-white/5 animate-pulse rounded-xl mt-12" />
	),
})

const SuggestedFilm = dynamic(() => import("@/components/Info/SuggestedFilm"), {
	ssr: false,
	loading: () => (
		<div className="h-60 w-full bg-white/5 animate-pulse rounded-xl mt-12" />
	),
})

const InfoHero = ({
	film,
	actors,
	initialComments,
	stickers,
	watchedSlugs,
}: {
	film: FilmInfo
	actors: Actor
	initialComments: CommentWithProfile[]
	stickers: Sticker[]
	watchedSlugs: string[]
}) => {
	const peoples = actors?.peoples || []

	const cast = peoples.filter((p) => p.known_for_department === "Acting")
	const crew = peoples.filter((p) => p.known_for_department !== "Acting")

	const groupCrew = crew.reduce(
		(acc, p) => {
			const key =
				departmentMap[p.known_for_department] || p.known_for_department
			if (!acc[key]) acc[key] = []
			acc[key].push(p)
			return acc
		},
		{} as Record<string, Person[]>,
	)

	return (
		<div className="relative w-full bg-[#0a0a0a]">
			<Banner poster_url={film.poster_url} />

			<div className="relative z-20 px-2 md:px-4 lg:px-6 -mt-24 md:-mt-32 lg:-mt-40 mb-20">
				<div className="mx-auto w-full">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
						{/* LEFT */}
						<div className="lg:col-span-3">
							<LeftSide film={film} tmdbData={film.tmdb} />
						</div>

						{/* RIGHT */}
						<section className="lg:col-span-9 pb-4 lg:pb-8 space-y-6">
							{/* HERO TITLE BLOCK*/}
							<div className="space-y-3 text-center md:text-left">
								<h1 className="text-2xl md:text-4xl font-black text-white uppercase italic">
									{film.name}
								</h1>

								<p className="text-purple-500 text-xs md:text-sm uppercase tracking-widest">
									{film.origin_name}
								</p>

								<ActionButtons
									firstEpisode={`/xem-phim/${film.slug}`}
									film={film}
								/>
								<Score film={film} />
							</div>

							<ContentSection content={film.content} />

							{/* EPISODE */}
							<div className="lg:mt-0 mt-2">
								<EpisodeSection
									episodes={film.episodes}
									film_slug={film.slug}
									watchedSlugs={watchedSlugs}
								/>
							</div>

							<YoutubePlayer url={film.trailer_url} />

							<FilmStats
								data={{
									first_air_date: film.tmdb?.first_air_date,
									last_air_date: film.tmdb?.last_air_date,
									popularity: film.tmdb?.popularity,
									homepage: film.tmdb?.homepage,
									next_episode_to_air: film.tmdb?.next_episode_to_air,
									last_episode_to_air: film.tmdb?.last_episode_to_air,
								}}
							/>

							<ExtraTMDBContent tmdbData={film.tmdb} film={film} />
							<PeopleSection cast={cast} groupCrew={groupCrew} />

							<MediaGallery
								backdrops={film.tmdb?.images?.backdrops || []}
								posters={film.tmdb?.images?.posters || []}
							/>

							<RelatedFilm relatedFilm={film.related} />
							<SuggestedFilm suggestedFilm={film.suggest} />

							<ReviewSection film={film} />
							<CommentSection
								initialComments={initialComments}
								stickers={stickers}
								film={film}
							/>
						</section>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InfoHero
