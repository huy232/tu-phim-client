type Person = {
	tmdb_people_id: number
	// id: number
	adult: boolean
	gender: number
	gender_name: string
	name: string
	original_name: string
	character: string
	known_for_department: string
	profile_path: string
	also_known_as: string[] | null
}

type TransformedPerson = Person & {
	department_vi: string
	gender_vi: string
	character_vi: string
}

type Actor = {
	tmdb_id: number
	tmdb_type: string
	tmdb_season: number
	ophim_id: string
	slug: string
	imdb_id: string
	profile_sizes: {
		h632: string
		original: string
		w185: string
		w45: string
	}
	peoples: Person[]
}

type NewActor = {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string
	cast_id: number
	character: string
	credit_id: string
	order: number
	character?: string

	job?: string
	department_vi?: string
	gender_vi?: string
	character_vi?: string
}

type Cast = NewActor[]
type Crew = NewActor[]

type Department =
	| "Acting"
	| "Directing"
	| "Writing"
	| "Sound"
	| "Art"
	| "Editing"
	| "Visual Effects"
	| "Camera"
