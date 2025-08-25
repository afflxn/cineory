import { Image } from "@/src/components/custom/Image"
import { MediaRatingView } from "@/src/components/custom/MediaRatingView"
import { Link } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { getRatingColorBg } from "@/src/shared/lib/getRatingColor"
import { isMovie } from "@/src/shared/lib/isMovie"
import { SingleMedia } from "@/src/shared/types/media"
import { Timestamp } from "firebase/firestore"

type Props = {
	media: SingleMedia & { category: string; addedAt: Timestamp }
}

export const MediaCardById = ({ media }: Props) => {
	const displayTitle = isMovie(media) ? media.title : media.name
	const navUrl = isMovie(media) ? PAGES.MOVIE(media.id) : PAGES.SERIES(media.id)

	return (
		<Link
			href={navUrl}
			className="group relative overflow-hidden rounded-2xl shadow-lg bg-black/10 transition-all duration-300 hover:shadow-xl cursor-pointer aspect-[2/3]"
		>
			<Image
				fallback="/fallback-poster.jpg"
				src={`${TMDB_IMAGE_BASE}original${media.poster_path}`}
				alt={displayTitle}
				className="transition-transform duration-700 group-hover:scale-105 group-hover:opacity-70"
				sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
			/>
			<MediaRatingView
				mediaId={media.id}
				type="grid"
				mediaType={isMovie(media) ? "movie" : "tv"}
			/>
			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
				<div className="space-y-1 text-white text-xs leading-tight">
					<p className="text-sm font-semibold line-clamp-2">{displayTitle}</p>

					<div className="absolute top-2 left-2 z-10">
						<div
							className={`flex items-center justify-center h-7 w-10 rounded-sm ${getRatingColorBg(
								media.vote_average
							)}`}
						>
							{media.vote_average?.toFixed(1)}
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
