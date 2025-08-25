import { Skeleton } from "@/src/components/ui/skeleton"

export const HeroSliderSkeleton = () => {
	return (
		<section className="relative w-full h-[75vh] flex items-end px-8 mb-30">
			<div className="relative flex-[0_0_100%] h-[75vh] flex items-end p-8">
				<div className="container z-10 px-4 md:px-12 flex flex-col md:flex-row items-center gap-6 relative">
					<Skeleton className="w-48 md:w-64 h-[384px] rounded-lg hidden md:block" />
					<div className="space-y-4 w-full max-w-xl">
						<Skeleton className="h-12 w-1/3" />
						<div className="flex gap-2">
							<Skeleton className="h-10 w-1/8" />
							<Skeleton className="h-10 w-1/10" />
							<Skeleton className="h-10 w-1/5" />
							<Skeleton className="h-10 w-1/5" />
							<Skeleton className="h-10 w-1/5" />
						</div>
						<Skeleton className="h-10 w-full" />
						<div className="flex gap-4 mt-6">
							<Skeleton className="h-10 w-36 rounded" />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
