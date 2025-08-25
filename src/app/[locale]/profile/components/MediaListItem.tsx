import { AddToListSelect } from "@/src/components/custom/AddToListSelect"
import { Image } from "@/src/components/custom/Image"
import { MediaRatingView } from "@/src/components/custom/MediaRatingView"
import { Link } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { isMovie } from "@/src/shared/lib/isMovie"
import { useProfileStore } from "@/src/shared/store/useProfileStore"
import { SingleMedia } from "@/src/shared/types/media"
import { Timestamp } from "firebase/firestore"
import { useTranslations } from "next-intl"

type Props = {
	media: SingleMedia & { category: string; addedAt: Timestamp }
}

export const MediaListItem = ({ media }: Props) => {
	const { isOwner } = useProfileStore()
	const t = useTranslations("Profile")

	const title = isMovie(media) ? media.title : media.name
	const date = isMovie(media) ? media.release_date : media.first_air_date

	return (
		<div className="flex gap-2 md:gap-4 rounded-xl overflow-hidden bg-background border border-border shadow hover:shadow-md transition h-40 md:h-50">
			<Link
				className="p-1 md:p-2"
				href={isMovie(media) ? PAGES.MOVIE(media.id) : PAGES.SERIES(media.id)}
			>
				<div className="relative aspect-[2/3] h-full overflow-hidden rounded-lg">
					<Image
						fallback="/fallback-poster.jpg"
						src={`${TMDB_IMAGE_BASE}w300${media.poster_path}`}
						alt={title}
						sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, (max-width: 1024px) 120px, 150px"
					/>
					<MediaRatingView
						mediaId={media.id}
						type="list"
						mediaType={isMovie(media) ? "movie" : "tv"}
					/>
				</div>
			</Link>
			<div className="flex justify-between w-full items-center gap-2 md:gap-15 px-1 md:px-2">
				<div className="flex flex-col flex-grow gap-0.5 md:gap-1">
					<Link
						href={
							isMovie(media) ? PAGES.MOVIE(media.id) : PAGES.SERIES(media.id)
						}
						className="text-sm md:text-base lg:text-lg font-semibold inline-block line-clamp-2"
					>
						{title}
					</Link>
					<p className="text-xs md:text-sm text-gray-500">
						{date?.slice(0, 4)}
					</p>
					<p className="text-xs md:text-sm text-gray-500">
						{isMovie(media) ? t("movie") : t("tv")}
					</p>
				</div>
				<div className="hidden sm:block mr-2 md:mr-10 xl:mr-0">
					<div className="text-xs md:text-sm text-muted-foreground">
						{t("added")}
					</div>
					<div className="text-xs md:text-sm">
						{media.addedAt.toDate().toLocaleDateString("ru-RU")}
					</div>
				</div>
				<div className="w-20 md:w-32 lg:w-40 mr-2 md:mr-10 hidden xl:block">
					{isOwner && (
						<AddToListSelect
							title={
								isMovie(media) ? media.original_title : media.original_name
							}
							id={media.id}
							type={isMovie(media) ? "movie" : "tv"}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
