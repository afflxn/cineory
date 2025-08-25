import { MediaInList, MediaInListResponse } from "../types/media"
import { tmdbFetch } from "./tmdbFetch"

export const fetchMedia = async (
	path: string,
	signal: AbortSignal,
	language: "en-US" | "ru-RU",
	totalPages = 1
): Promise<MediaInList[]> => {
	const requests = Array.from({ length: totalPages }, (_, i) =>
		tmdbFetch<MediaInListResponse>(`${path}`, {
			signal: signal,
			params: {
				page: i + 1,
				language,
			},
		})
	)
	const response = await Promise.all(requests)

	const allMovies = response.flatMap((res) => res.results)

	return allMovies
}
