type List = {
	id: string
	name: string
	slug: string
}

type Category = {
	id: string
	name: string
	slug: string
}

type Country = {
	id: string
	name: string
	slug: string
}

type Year = {
	id: string
	year: string
	slug: string
}

type Episode = {
	name: string
	slug: string
	filename: string
	link_embed?: string
	link_m3u8?: string
	m3u8?: string
	embed?: string
}

type Episodes = {
	server_name: string
	is_ai: boolean
	server_data: Episode[]
	server_source: "A" | "B" | "C"
	server_type: "vietsub" | "thuyet-minh" | "long-tieng"
}

type IMDB = {
	id: string
	vote_average: number
	vote_count: number
}

type TMDB = {
	type: string
	id: string
	season: number
	vote_average: number
	vote_count: number
}

type Film = {
	actor: string[]
	alternative_names: string[]
	category: Category[]
	chieurap: boolean
	content: string
	country: Country[]
	created: { time: Date }
	director: string[]
	episode_current: string
	episode_total: string
	episodes: Episodes[]
	imdb: IMDB
	is_copyright: boolean
	lang: string
	lang_key: string[]
	modified: { time: Date }
	name: string
	notify: string
	origin_name: string
	poster_url: string
	quality: string
	showtimes: string
	slug: string
	status: string
	sub_docquyen: boolean
	thumb_url: string
	time: string
	tmdb: TMDB
	trailer_url: string
	type: string
	view: number
	year: number
	_id: string
	last_episodes: { server_name: string; is_ai: boolean; name: string }[]
}

type FilmInfo = {
	actor: string[]
	alternative_names: string[]
	category: Category[]
	chieurap: boolean
	content: string
	country: Country[]
	created: { time: Date }
	director: string[]
	episode_current: string
	episode_total: string
	episodes: Episodes[]
	imdb: IMDB
	is_copyright: boolean
	lang: string
	lang_key: string[]
	modified: { time: Date }
	name: string
	notify: string
	origin_name: string
	poster_url: string
	quality: string
	showtimes: string
	slug: string
	status: string
	sub_docquyen: boolean
	thumb_url: string
	time: string
	tmdb: TMDBData
	trailer_url: string
	type: string
	view: number
	year: number
	_id: string
	last_episodes: [{ server_name: string; is_ai: boolean; name: string }]
	related: Film[]
	suggest: Film[]
	top_type: Film[]
}

type TMDBData = {
	adult: false
	tagline?: string
	type: string
	release_date: Date
	revenue: number
	budget: number
	status: string
	backdrop_path: string
	created_by: [
		{
			_id: string
			credit_id: string
			name: string
			original_name: string
			gender: number
			profile_path: string
		},
	]
	credits: {
		cast: [
			{
				adult: boolean
				character: string
				credit_id: string
				gender: number
				id: number
				known_for_department: string
				name: string
				order: boolean
				original_name: string
				popularity: number
				profile_path: string
			},
		]
		crew: [
			{
				adult: boolean
				credit_id: string
				gender: number
				id: number
				job: string
				known_for_department: string
				name: string
				original_name: string
				popularity: number
				profile_path: string
			},
		]
	}
	episode_run_time: [number]
	first_air_date: Date
	genres: [id: number, name: string]

	homepage: string
	id: number
	images: {
		backdrops: [
			{
				aspect_ratio: number
				height: number
				iso_639_1: string
				iso_3166_1: string
				vote_average: number
				vote_count: number
				width: number
				file_path: string
			},
		]
		logos: [
			{
				aspect_ratio: number
				height: number
				iso_639_1: string
				iso_3166_1: string
				vote_average: number
				vote_count: number
				width: number
				file_path: string
			},
		]
		posters: [
			{
				aspect_ratio: number
				height: number
				iso_639_1: string
				iso_3166_1: string
				vote_average: number
				vote_count: number
				width: number
				file_path: string
			},
		]
	}
	in_production: boolean
	languages: string[]
	last_air_date: Date
	last_episode_to_air: EpisodeAiring
	name: string
	networks: Network[]
	next_episode_to_air: EpisodeAiring
	number_of_episodes: number
	number_of_seasons: number
	origin_country: string[]
	original_language: string
	original_name: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: Production_Company[]
	production_countries: [{ iso_3166_1: string; name: string }]
	vote_average: number
	vote_count: number
	spoken_languages?: Array<{
		name: string
		english_name: string
		iso_639_1: string
	}>
}

type Production_Company = {
	id: number
	logo_path: null | string
	name: string
	origin_country: string
}

type Network = {
	id: number
	logo_path: string
	name: string
	origin_country: string
}

type EpisodeAiring = {
	air_date: Date
	episode_number: number
	episode_type: string
	id: number
	name: string
	overview: string
	production_code: string
	runtime: number
	season_number: number
	show_id: number
	still_path: string
	vote_average: number
	vote_count: number
}

type FilmResponse = {
	message: string
	status: string
	data: {
		breadCrumb: BreadCrumb[]
		params: ParamsData
		titlePage: string
		type_list: string
		items: FilmInfo[]
	}
}

type BreadCrumb = {
	name: string
	slug: string
	isCurrent: boolean
	position: number
}

type ParamsData = {
	type_slug: string
	slug: string
	filterCategory: []
	filterCountry: []
	filterType: string
	filterYear: string
	slug: string
	sortField: string
	sortType: string
	type_slug: string
	pagination: Pagination
}

type Pagination = {
	currentPage: number
	pageRanges: number
	totalItems: number
	totalItemsPerPage: number
}

type SupabaseFilm = {
	category: Category[]
	country: Country[]
	content: string
	created_at: Date
	external_id: string
	id: string
	lang: string
	name: string
	origin_name: string
	poster_url: string
	quality: string
	slug: string
	thumb_url: string
	time: string
	type: string
	year: number
}

type FilmAuth = {
	slug: string
}

type FavoriteItemAuth = {
	films: Film | Film[] | null
}
