import { useCatalogFilter } from "@/src/shared/store/useCatalogFilter"
import { useApplyFilters } from "./useApplyFilters"
import { useCatalogQuery } from "./useCatalogQuery"
import { useInfiniteScroll } from "./useInfiniteScroll"
import { useSyncMediaType } from "./useSyncMediaType"

export const useCatalog = () => {
	const { mediaType } = useCatalogFilter()

	const {
		data,
		isPending,
		isPlaceholderData,
		fetchNextPage,
		isFetchingNextPage,
		refetch,
		isError,
		hasNextPage,
	} = useCatalogQuery()

	useSyncMediaType()
	useApplyFilters(refetch, mediaType)
	const { ref } = useInfiniteScroll(
		fetchNextPage,
		isFetchingNextPage,
		isError,
		hasNextPage
	)

	return {
		data,
		isPending,
		isPlaceholderData,
		ref,
		mediaType,
		isFetchingNextPage,
	}
}
