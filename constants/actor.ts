// export const departmentMap: Record<string, string> = {
// 	Acting: "Diễn viên",
// 	Directing: "Đạo diễn",
// 	Writing: "Biên kịch",
// 	Sound: "Âm thanh",
// 	Art: "Mỹ thuật",
// 	Editing: "Dựng phim",
// 	"Visual Effects": "Kỹ xảo",
// 	Camera: "Quay phim",
// }

// export const genderMap: Record<number, string> = {
// 	0: "Không rõ",
// 	1: "Nữ",
// 	2: "Nam",
// }

export interface TMDBPerson {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string | null
	credit_id: string
	department?: string
	job?: string
	character?: string
}

export interface TransformedPerson extends TMDBPerson {
	department_vi: string
	gender_vi: string
	character_vi: string
}

export const departmentMap: Record<string, string> = {
	Acting: "Diễn viên",
	Directing: "Đạo diễn",
	Writing: "Biên kịch",
	Sound: "Âm thanh",
	Art: "Mỹ thuật",
	Editing: "Dựng phim",
	"Visual Effects": "Kỹ xảo",
	Camera: "Quay phim",
	Production: "Sản xuất",
	Crew: "Đội ngũ sản xuất",
	Lighting: "Ánh sáng",
	Costume: "Trang phục",
	"Costume & Make-Up": "Trang phục & hóa trang",
	"Camera & Electrical": "Máy quay & điện",
}

export const genderMap: Record<number, string> = {
	0: "Không rõ",
	1: "Nữ",
	2: "Nam",
}

export const formatCharacter = (character: string) => {
	if (!character) return ""

	return character.replace("(voice)", "(lồng tiếng)")
}

export const transformPeople = (
	people: TMDBPerson[] | null | undefined,
): TransformedPerson[] => {
	if (!people || !Array.isArray(people)) return []

	return people.map((p: TMDBPerson) => ({
		...p,

		department_vi:
			departmentMap[p.department || ""] ||
			departmentMap[p.known_for_department] ||
			p.department ||
			p.known_for_department ||
			"Không rõ",

		gender_vi: genderMap[p.gender] || "Không rõ",

		character_vi: p.character ? formatCharacter(p.character) : "",
	}))
}
