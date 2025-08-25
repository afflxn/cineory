"use client"

import { AddToListSelect } from "@/src/components/custom/AddToListSelect"
import { Link } from "@/src/i18n/navigation"
import { useAuthUser } from "@/src/shared/hooks/auth/useAuthUser"
import { useMobile } from "@/src/shared/hooks/useMobile"
import { getRatingColor } from "@/src/shared/lib/getRatingColor"
import { CombinedPersonMediaCredits } from "@/src/shared/types/credits"
import { useTranslations } from "next-intl"

export const PersonMediaTabsListItem = ({
	item,
}: {
	item: CombinedPersonMediaCredits
}) => {
	const { data: auth } = useAuthUser()
	const isMobile = useMobile()
	const t = useTranslations("PersonPage")

	return (
		<li
			key={`${item.id}-${item.credit_id}`}
			className="border-b p-4 bg-background shadow-sm hover:shadow-md transition-all duration-300 hover:bg-muted/60 flex items-start gap-4 last:border-b-0 last:rounded-b-lg first:rounded-t-lg"
		>
			<Link
				href={
					item.media_type === "movie"
						? `/movie/${item.id}`
						: `/series/${item.id}`
				}
				className="flex-1 flex flex-col cursor-pointer min-w-0"
			>
				<div className="text-base lg:text-xl font-semibold truncate hover:text-primary transition-colors duration-300 break-words">
					{"title" in item ? item.title : item.name}
				</div>

				<div className="text-sm lg:text-lg text-muted-foreground mt-1 truncate break-words">
					{"character" in item ? item.character : "job" in item ? item.job : ""}
				</div>

				<div className="text-xs lg:text-sm text-muted-foreground mt-1 truncate break-words">
					{"release_date" in item
						? item.release_date
						: item.first_air_date || t("noData")}
				</div>
			</Link>

			<div className="flex flex-col items-center justify-center w-16 flex-shrink-0">
				<span
					className={`text-lg font-semibold ${getRatingColor(
						item.vote_average
					)}`}
				>
					{"vote_average" in item ? item.vote_average.toFixed(1) : "-"}
				</span>
				<span className="text-xs text-muted-foreground">
					{"vote_count" in item ? item.vote_count.toLocaleString() : "0"}
				</span>
			</div>

			{!isMobile && auth && (
				<div className="flex items-center w-44 flex-shrink-0">
					<AddToListSelect
						title={
							"original_title" in item
								? item.original_title
								: item.original_name
						}
						id={item.id}
						type={item.media_type}
					/>
				</div>
			)}
		</li>
	)
}
