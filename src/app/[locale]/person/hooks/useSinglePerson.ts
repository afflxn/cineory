import { fetchSafe } from "@/src/shared/lib/fetchSafe"
import { SinglePerson } from "@/src/shared/types/person"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"

export const useSinglePerson = (id: number) => {
	const locale = useLocale()
	const { data: person, error } = useSuspenseQuery<SinglePerson | null>({
		queryKey: ["person", id, locale],
		queryFn: ({ signal }) =>
			fetchSafe<SinglePerson>(`/${locale}/api/person/${id}`, {
				signal,
			}),
	})

	return { person, error }
}
