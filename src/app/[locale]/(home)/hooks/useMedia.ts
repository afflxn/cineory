import { fetchSafe } from "@/src/shared/lib/fetchSafe"
import { MediaType } from "@/src/shared/types/media"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useLocale } from "next-intl"

type Params = {
	type: MediaType | "person"
	endpoint: string
}

export const useMedia = <T>({
	type,
	endpoint,
}: Params): UseQueryResult<T | null> => {
	const locale = useLocale()

	const url =
		type !== "person"
			? `/${locale}/api/${type}/${endpoint}`
			: `/${locale}/api/${type}/${endpoint}`

	return useQuery<T | null>({
		queryKey: [type, endpoint, locale],
		queryFn: ({ signal }) =>
			fetchSafe<T>(url, {
				signal,
			}),
	})
}
