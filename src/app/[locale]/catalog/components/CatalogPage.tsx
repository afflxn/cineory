"use client"

import { MediaCard } from "@/src/components/custom/MediaCard"
import { Skeleton } from "@/src/components/ui/skeleton"
import { useTranslations } from "next-intl"
import { useCatalog } from "../hooks/useCatalog"
import { CatalogGrid } from "./CatalogGrid"
import { CatalogSkeleton } from "./CatalogSkeleton"
import { FilterPanel } from "./FilterPanel"
import { SortPanel } from "./SortPanel"

const CatalogPage = () => {
	const {
		data,
		isPending,
		isPlaceholderData,
		ref,
		mediaType,
		isFetchingNextPage,
	} = useCatalog()

	const t = useTranslations("Catalog")

	return (
		<div className="container px-2 py-6 space-y-4">
			<h1 className="text-center text-4xl font-logo">
				{mediaType === "movie" ? t("movie") : t("tv")}
			</h1>

			<div className="flex flex-col lg:flex-row gap-4 relative">
				<aside className="lg:w-70 shrink-0 lg:sticky lg:top-25 lg:self-start lg:h-fit">
					<div className="lg:hidden ">
						<details className="bg-secondDark p-3 rounded-lg">
							<summary className="cursor-pointer">Filters</summary>
							<FilterPanel />
						</details>
					</div>

					<div className="hidden lg:block">
						<FilterPanel />
					</div>
				</aside>

				<main className="flex-1">
					<SortPanel />
					{isPending ? (
						<CatalogSkeleton />
					) : !data ? (
						<div className="text-center">{t("nothing")}</div>
					) : (
						<CatalogGrid isPlaceholder={isPlaceholderData}>
							{data.pages.flatMap((page) =>
								page?.results.map((item) => (
									<MediaCard inCatalog key={item.id} media={item} />
								))
							)}
							{isFetchingNextPage &&
								Array.from({ length: 10 }).map((_, index) => (
									<Skeleton key={index} className="aspect-[2/3]" />
								))}
						</CatalogGrid>
					)}

					<div className="mb-25" ref={ref}></div>
				</main>
			</div>
		</div>
	)
}

export default CatalogPage
