"use client"

import { useGenres } from "@/src/app/[locale]/(home)/hooks/useGenres"
import { Link } from "@/src/i18n/navigation"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { useUserMediaMap } from "@/src/shared/hooks/useUserMediaMap"
import { getCategoryLabel } from "@/src/shared/lib/getCategoryLabel"
import { getGenreNames } from "@/src/shared/lib/getGenreNames"
import { getRatingColorBg } from "@/src/shared/lib/getRatingColor"
import { isMovieInList } from "@/src/shared/lib/isMovie"
import { cn } from "@/src/shared/lib/utils"
import { MediaInList } from "@/src/shared/types/media"
import { useTranslations } from "next-intl"
import { Image } from "./Image"

type Props = {
	media: MediaInList
	inCatalog?: boolean
}

export const MediaCard = ({ media, inCatalog }: Props) => {
	const { data: mediaMap } = useUserMediaMap()

	const { genres } = useGenres(isMovieInList(media) ? "movie" : "series")

	const t = useTranslations("MediaCategories")

	const category =
		mediaMap?.[`${media.id}-${isMovieInList(media) ? "movie" : "tv"}`]

	const genreLabel = genres ? getGenreNames(media.genre_ids, genres, 1) : null

	const displayTitle = isMovieInList(media) ? media?.title : media?.name
	const displayDate = isMovieInList(media)
		? media.release_date?.slice(0, 4)
		: media.first_air_date?.slice(0, 4)
	const navUrl = isMovieInList(media)
		? `/movie/${media.id}`
		: `/series/${media.id}`

	return (
		<Link
			href={navUrl}
			className={cn(
				"block group relative overflow-hidden border border-border rounded-xl shadow-lg bg-black/10 transition-all duration-300 hover:shadow-xl cursor-pointer aspect-[2/3]",
				{ "w-full": inCatalog },
				{ "w-50 lg:w-60 mx-1 md:mx-2": !inCatalog }
			)}
		>
			<Image
				fallback="/fallback-poster.jpg"
				src={`${TMDB_IMAGE_BASE}original${media.poster_path}`}
				alt={displayTitle}
				className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-70"
				sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
			/>

			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
				<div className="space-y-1 text-white text-xs leading-tight">
					<p className="text-sm font-semibold line-clamp-2">{displayTitle}</p>

					<div className="flex items-center justify-between">
						<div className="flex gap-1">
							{genreLabel &&
								genreLabel.map((genre) => (
									<span
										key={genre}
										className="bg-white/10 px-2 py-0.5 rounded text-[10px]"
									>
										{genre}
									</span>
								))}
						</div>
						<span className="text-white/70">{displayDate}</span>
					</div>

					<div className="absolute top-2 left-2 z-10">
						<div
							className={` flex items-center justify-center h-7 rounded-sm w-10 text-center ${getRatingColorBg(
								media.vote_average
							)}`}
						>
							{media.vote_average?.toFixed(1)}
						</div>
					</div>
				</div>
			</div>
			{category && (
				<div className="absolute top-2 right-2 z-10">
					<span className="text-sm px-2 py-1 rounded bg-primary text-white capitalize">
						{t(getCategoryLabel(category))}
					</span>
				</div>
			)}
		</Link>
	)
}
