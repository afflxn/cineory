import { fetchSafe } from "@/src/shared/lib/fetchSafe"
import { Genre } from "@/src/shared/types/genre"
import { MediaType } from "@/src/shared/types/media"
import { useQuery } from "@tanstack/react-query"

import { useLocale } from "next-intl"

export const useGenres = (mediaType: MediaType) => {
	const locale = useLocale()
	const { data: genres, isPending: isGenresPending } = useQuery<Genre[] | null>(
		{
			queryKey: ["genres", mediaType, locale],
			queryFn: ({ signal }) =>
				fetchSafe<Genre[]>(`/${locale}/api/${mediaType}/genres`, { signal }),
		}
	)

	return { genres, isGenresPending }
}
