import { ChevronDown, ChevronUp } from "lucide-react"
import { useTranslations } from "next-intl"
import { JSX } from "react"
import { SortValue } from "../../../../shared/store/useCatalogFilter"

type SORT_OPTION = {
	label: JSX.Element
	value: SortValue
}

export const useSortOptions = (): SORT_OPTION[] => {
	const t = useTranslations("Catalog.sort")
	return [
		{
			label: (
				<span className="flex items-center gap-1">
					{t("popular")} <ChevronDown />
				</span>
			),
			value: "popularity.desc",
		},
		{
			label: (
				<span className="flex items-center gap-1">
					{t("popular")} <ChevronUp />
				</span>
			),
			value: "popularity.asc",
		},

		{
			label: (
				<span className="flex items-center gap-1">
					{t("rating")} <ChevronDown />
				</span>
			),
			value: "vote_average.desc",
		},
		{
			label: (
				<span className="flex items-center gap-1">
					{t("rating")} <ChevronUp />
				</span>
			),
			value: "vote_average.asc",
		},

		{
			label: (
				<span className="flex items-center gap-1">
					{t("date")} <span>{t("new_first")}</span>
				</span>
			),
			value: "release_date.desc",
		},
		{
			label: (
				<span className="flex items-center gap-1">
					{t("date")} <span>{t("old_first")}</span>
				</span>
			),
			value: "release_date.asc",
		},

		{
			label: (
				<span className="flex items-center gap-1">
					{t("votes")} <ChevronDown />
				</span>
			),
			value: "vote_count.desc",
		},
		{
			label: (
				<span className="flex items-center gap-1">
					{t("votes")}в <ChevronUp />
				</span>
			),
			value: "vote_count.asc",
		},
	]
}
