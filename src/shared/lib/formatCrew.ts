import { MediaCredits } from "../types/credits"

export const formatCrew = (credits?: MediaCredits | null) => {
	const director = credits?.crew.find((person) => person.job === "Director")
	const writers = credits?.crew
		.filter(
			(person) =>
				person.department === "Writing" ||
				person.job === "Screenplay" ||
				person.job === "Writer"
		)
		.slice(0, 4)

	return { director, writers }
}
