import { fetchSafe } from "@/src/shared/lib/fetchSafe"
import { useCatalogFilter } from "@/src/shared/store/useCatalogFilter"
import { MediaInListResponse } from "@/src/shared/types/media"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"

export const useCatalogQuery = () => {
	const {
		mediaType,
		query,
		sortBy,
		selectedGenres,
		excludedGenres,
		includeAdult,
		yearFrom,
		yearTo,
		ratingFrom,
		ratingTo,
	} = useCatalogFilter()

	const locale = useLocale()

	return useInfiniteQuery<MediaInListResponse | null>({
		queryKey: ["media-catalog", mediaType],
		queryFn: ({ signal, pageParam }) => {
			const searchParams = new URLSearchParams()

			if (pageParam) searchParams.set("page", String(pageParam))
			if (query) searchParams.set("query", query)
			if (sortBy) searchParams.set("sortBy", sortBy)
			if (selectedGenres.length)
				searchParams.set("selectedGenres", selectedGenres.join(","))
			if (excludedGenres.length)
				searchParams.set("excludedGenres", excludedGenres.join(","))
			if (includeAdult !== undefined)
				searchParams.set("includeAdult", String(includeAdult))
			if (yearFrom) searchParams.set("yearFrom", String(yearFrom))
			if (yearTo) searchParams.set("yearTo", String(yearTo))
			if (ratingFrom) searchParams.set("ratingFrom", String(ratingFrom))
			if (ratingTo) searchParams.set("ratingTo", String(ratingTo))

			return fetchSafe<MediaInListResponse>(
				`/${locale}/api/${mediaType}/catalog/?${searchParams.toString()}`,
				{ signal }
			)
		},
		enabled: false,
		initialPageParam: 1,
		getNextPageParam: (result) => {
			if (!result || (result && result.page >= result.total_pages))
				return undefined
			return result.page + 1
		},
	})
}
