"use client"

import { PAGES } from "@/src/shared/config/pages.config"
import { useCatalogFilter } from "@/src/shared/store/useCatalogFilter"
import { Genre } from "@/src/shared/types/genre"
import { MediaType } from "@/src/shared/types/media"

import { useRouter } from "@/src/i18n/navigation"
import { Fragment } from "react"
import { DetailRow } from "./DetailRow"

type Props = {
	title: string
	genres: Genre[]
	mediaType: MediaType
}

export const MediaDetailsGenres = ({ title, genres, mediaType }: Props) => {
	const { setSelectedGenres } = useCatalogFilter()
	const router = useRouter()

	return (
		<DetailRow label={title}>
			{genres.map((genre: Genre, index: number) => (
				<Fragment key={genre.id}>
					<span
						onClick={() => {
							setSelectedGenres([genre.id])
							router.replace(
								mediaType === "movie"
									? PAGES.CATALOG_MOVIE
									: PAGES.CATALOG_SERIES
							)
						}}
						className="cursor-pointer"
					>
						{genre.name}
					</span>
					{index < genres.length - 1 ? ", " : " "}
				</Fragment>
			))}
		</DetailRow>
	)
}
