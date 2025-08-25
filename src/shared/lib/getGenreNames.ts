import { Genre, GenreIds } from "../types/genre"

export const getGenreNames = (
	genreIds: GenreIds | undefined | null,
	genres: Genre[] | undefined | null,
	amount = 5
) => {
	if (!Array.isArray(genres)) {
		return []
	}

	if (genreIds && genres) {
		const genreNames = genreIds
			.map((id) => genres.find((genre: Genre) => genre.id === id)?.name)
			.filter((el) => el != undefined)

		return genreNames
			.map((genre) => (genre.length > 13 ? genre.slice(0, 7) : genre))
			.slice(0, amount)
	}
}
