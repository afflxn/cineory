import { fetchSafe } from "@/src/shared/lib/fetchSafe"
import { PersonMediaCredits } from "@/src/shared/types/credits"
import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"

export const usePersonCredits = (id: number) => {
	const locale = useLocale()
	return useQuery<PersonMediaCredits | null>({
		queryKey: ["credits", "media", "person", id, locale],
		queryFn: ({ signal }) =>
			fetchSafe<PersonMediaCredits>(`/${locale}/api/person/${id}/credits`, {
				signal,
			}),
		select: (data) => {
			if (!data) return null
			data.cast = [...data.cast.filter((media) => media.vote_count > 50)]
			return data
		},
	})
}
