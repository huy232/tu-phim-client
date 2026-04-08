export const departmentMap: Record<string, string> = {
	Acting: "Diễn viên",
	Directing: "Đạo diễn",
	Writing: "Biên kịch",
	Sound: "Âm thanh",
	Art: "Mỹ thuật",
	Editing: "Dựng phim",
	"Visual Effects": "Kỹ xảo",
	Camera: "Quay phim",
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

export const transformPeople = (people: Person[]): TransformedPerson[] => {
	return people.map((p) => ({
		...p,
		department_vi:
			departmentMap[p.known_for_department] || p.known_for_department,
		gender_vi: genderMap[p.gender] || "Không rõ",
		character_vi: formatCharacter(p.character),
	}))
}
