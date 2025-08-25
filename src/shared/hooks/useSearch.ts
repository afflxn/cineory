import { useQuery } from "@tanstack/react-query"

import { useLocale } from "next-intl"
import { MultiSearchDto, MultiSearchResultDto } from "../types/multi"

export const useSearch = (debouncedQuery: string) => {
	const locale = useLocale()

	const { data, isPending } = useQuery<MultiSearchResultDto[]>({
		queryKey: ["search", debouncedQuery],
		queryFn: async () => {
			if (!debouncedQuery) return []
			const res = await fetch(`/${locale}/api/search?query=${debouncedQuery}`)

			if (!res.ok) throw res.json()

			const data: MultiSearchDto = await res.json()

			return data.results
		},
		enabled: !!debouncedQuery,
	})

	return { data, isPending }
}
