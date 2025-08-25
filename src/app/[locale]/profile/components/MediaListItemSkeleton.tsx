import { Skeleton } from "@/src/components/ui/skeleton"

export const MediaListItemSkeleton = () => {
	return (
		<div className="flex gap-2 md:gap-4 rounded-xl overflow-hidden bg-background border border-border shadow h-40 md:h-50">
			<div className="p-1 md:p-2">
				<Skeleton className="aspect-[2/3] h-full rounded-lg" />
			</div>

			<div className="flex justify-between w-full items-center gap-2 md:gap-15 px-1 md:px-2">
				<div className="flex flex-col flex-grow gap-0.5 md:gap-1">
					<Skeleton className="h-5 md:h-6 w-32 md:w-40 rounded" />

					<Skeleton className="h-4 w-16 rounded" />

					<Skeleton className="h-4 w-12 rounded" />
				</div>

				<div className="hidden sm:block mr-2 md:mr-10 xl:mr-0">
					<Skeleton className="h-4 w-16 mb-1 rounded" />
					<Skeleton className="h-4 w-20 rounded" />
				</div>

				<div className="w-20 md:w-32 lg:w-40 mr-2 md:mr-10 hidden xl:block"></div>
			</div>
		</div>
	)
}
