"use client"

import { Link } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { useSearch } from "@/src/shared/hooks/useSearch"
import { getRatingColor } from "@/src/shared/lib/getRatingColor"
import { useHeaderStore } from "@/src/shared/store/useHeaderStore"
import { MultiSearchResultDto } from "@/src/shared/types/multi"
import { useTranslations } from "next-intl"
import { Image } from "./Image"

export const SearchResults = ({ query }: { query: string }) => {
	const { data, isPending } = useSearch(query)
	const { setSearchQuery } = useHeaderStore()
	const t = useTranslations("Header.Search")

	if (!query) return null

	const sorted = [...(data || [])].sort((a, b) => b.popularity - a.popularity)

	const renderItem = (item: MultiSearchResultDto) => {
		const isMovie = item.media_type === "movie"
		const isSeries = item.media_type === "tv"
		const isPerson = item.media_type === "person"

		const title = isMovie ? item.title : item.name
		const originalTitle = isMovie
			? item.original_title
			: isSeries
			? item.original_name
			: item.known_for_department
		const imgPath = isMovie
			? item.poster_path
			: isSeries
			? item.poster_path
			: item.profile_path

		return (
			<Link
				key={`${item.media_type}-${item.id}`}
				onClick={() => setSearchQuery("")}
				href={
					isMovie
						? PAGES.MOVIE(item.id)
						: isSeries
						? PAGES.SERIES(item.id)
						: PAGES.PERSON(item.id)
				}
				className="flex gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer transition-all"
			>
				<div className="relative aspect-[2/3] w-[48px] h-[72px]">
					<Image
						fallback="/fallback-avatar.jpg"
						src={`${TMDB_IMAGE_BASE}w92${imgPath}`}
						alt={title || ""}
						className="object-cover rounded-md shrink-0"
						sizes="15vw"
					/>
				</div>

				<div className="text-sm w-full">
					<div className="font-medium">{title}</div>
					<p className="text-xs line-clamp-2">{originalTitle}</p>
					<div className="flex justify-between mt-4">
						{!isPerson && (
							<div className={`text-sm ${getRatingColor(item.vote_average)}`}>
								{item.vote_average.toFixed(1)}
							</div>
						)}
						{!isPerson && (
							<div className="text-sm text-primary">
								{isMovie
									? item.release_date.slice(0, 4)
									: item.first_air_date.slice(0, 4)}
							</div>
						)}
					</div>
				</div>
			</Link>
		)
	}

	const categories = {
		[t("movie")]: sorted.filter((item) => item.media_type === "movie"),
		[t("tv")]: sorted.filter((item) => item.media_type === "tv"),
		[t("person")]: sorted.filter((item) => item.media_type === "person"),
	}

	return (
		<div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-md shadow max-h-[500px] overflow-y-auto scrollbar-custom">
			{isPending ? (
				<div className="p-4 text-center">{t("load")}</div>
			) : (
				Object.entries(categories).map(([label, items]) =>
					items.length > 0 ? (
						<div key={label} className="p-2 border-b last:border-none">
							<div className="text-xs font-bold  uppercase mb-1">{label}</div>
							{items.map(renderItem)}
						</div>
					) : null
				)
			)}
		</div>
	)
}
