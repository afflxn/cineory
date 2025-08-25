import { Skeleton } from "@/src/components/ui/skeleton"
import { CatalogGrid } from "./CatalogGrid"

export const CatalogSkeleton = () => (
	<CatalogGrid>
		{Array.from({ length: 10 }).map((_, index) => (
			<Skeleton key={index} className="aspect-[2/3]" />
		))}
	</CatalogGrid>
)
