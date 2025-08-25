import { Skeleton } from "@/src/components/ui/skeleton"

export const MediaSliderSkeleton = () => {
	return (
		<section className="py-10">
			<div className="container">
				<div className="flex items-center justify-between mb-4">
					<div className="h-6 w-40 rounded animate-pulse" />
					<div className="flex gap-2"></div>
				</div>
				<div className="flex gap-4 px-4 overflow-hidden">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton
							key={i}
							className="rounded-xl aspect-[2/3] w-40 sm:w-48 md:w-56"
						/>
					))}
				</div>
			</div>
		</section>
	)
}
