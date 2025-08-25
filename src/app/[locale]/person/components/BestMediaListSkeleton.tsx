import { Skeleton } from "@/src/components/ui/skeleton"
import { cn } from "@/src/shared/lib/utils"

type Props = {
	className?: string
}

export const BestMediaListSkeleton = ({ className }: Props) => {
	return (
		<div
			className={cn(
				"backdrop-blur-2xl p-4 rounded-2xl bg-black/33 z-10",
				className
			)}
		>
			<Skeleton className="h-6 mb-4" />
			<div className="relative flex flex-col gap-2">
				<ul className="flex flex-col gap-1.5">
					{Array.from({ length: 7 }).map((_, i) => (
						<Skeleton className="h-5 w-2/3" key={i} />
					))}
				</ul>
			</div>
		</div>
	)
}
