import { useSortOptions } from "@/src/app/[locale]/catalog/hooks/useSortOptions"
import { Input } from "@/src/components/ui/input"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
} from "@/src/components/ui/select"
import {
	SortValue,
	useCatalogFilter,
} from "@/src/shared/store/useCatalogFilter"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

export const SortPanel = () => {
	const { query, sortBy, setQuery, setSortBy, toggleApplyFilter } =
		useCatalogFilter()

	const sortOptions = useSortOptions()
	const t = useTranslations("Catalog")

	useEffect(() => {
		const handler = setTimeout(() => {
			toggleApplyFilter(true)
		}, 500)
		return () => clearTimeout(handler)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query])

	return (
		<div className="lg:mt-7 mb-5 rounded-xl border border-border p-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-background">
			<Input
				placeholder={t("search")}
				value={query}
				onChange={(e) => {
					setQuery(e.target.value)
				}}
				className="w-full bg-secondDark max-w-md"
			/>
			{query && <div>{t("sort.notWork")}</div>}

			<div className="max-w-[300px] relative">
				<Select
					value={sortBy}
					onValueChange={(value: SortValue) => {
						setSortBy(value)
						toggleApplyFilter(true)
					}}
				>
					<SelectTrigger className="w-full bg-secondDark border border-border text-foreground rounded-md h-10 px-3 cursor-pointer">
						<span>
							{sortOptions.find((option) => option.value === sortBy)?.label ||
								t("sorting")}
						</span>
					</SelectTrigger>

					<SelectContent
						className="w-full  bg-secondDark text-foreground border border-border rounded-md shadow-lg z-50"
						side="bottom"
						align="start"
					>
						<SelectGroup>
							<SelectLabel className="px-3 py-1 text-xs text-foreground">
								{t("sort.sortBy")}
							</SelectLabel>
							{sortOptions.map((option) => (
								<SelectItem
									key={option.value}
									value={option.value}
									className="hover:bg-primary cursor-pointer px-3 py-2 transition-colors"
								>
									{option.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
