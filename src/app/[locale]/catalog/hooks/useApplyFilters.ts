import { getQueryClient } from "@/src/components/custom/providers/getQueryClient"
import { useCatalogFilter } from "@/src/shared/store/useCatalogFilter"
import { useEffect } from "react"

export const useApplyFilters = (refetch: () => void, mediaType: string) => {
	const { applyFilter, toggleApplyFilter } = useCatalogFilter()
	const queryClient = getQueryClient()

	useEffect(() => {
		if (!applyFilter) return
		queryClient.removeQueries({ queryKey: ["media-catalog", mediaType] })
		refetch()
		toggleApplyFilter(false)
	}, [applyFilter, mediaType, queryClient, refetch, toggleApplyFilter])
}
