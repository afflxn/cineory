"use client"

import { Image } from "@/src/components/custom/Image"
import { Card, CardContent } from "@/src/components/ui/card"
import { Link } from "@/src/i18n/navigation"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { useMobile } from "@/src/shared/hooks/useMobile"
import { getGenreNames } from "@/src/shared/lib/getGenreNames"
import { getRatingColorBg } from "@/src/shared/lib/getRatingColor"
import { CombinedPersonMediaCredits } from "@/src/shared/types/credits"
import { MediaType } from "@/src/shared/types/media"
import { useState } from "react"
import { useGenres } from "../../(home)/hooks/useGenres"

type Props = {
	mediaItems: CombinedPersonMediaCredits[]
	mediaType: MediaType
}

export const BestMediaList = ({ mediaItems, mediaType }: Props) => {
	const [hoveredMedia, setHoveredMedia] =
		useState<CombinedPersonMediaCredits | null>(null)
	const [isHoveringCard, setIsHoveringCard] = useState(false)
	const { genres, isGenresPending } = useGenres(mediaType)

	const isMobile = useMobile()

	return (
		<div className="relative flex flex-col gap-2 ">
			<ul className="flex flex-col">
				{mediaItems.map((media) => (
					<Link
						key={media.id}
						href={
							media.media_type === "movie"
								? `/movie/${media.id}`
								: `/series/${media.id}`
						}
						onMouseEnter={() => setHoveredMedia(media)}
						onMouseLeave={() => {
							if (!isHoveringCard) setHoveredMedia(null)
						}}
						className="cursor-pointer pb-0.5 rounded-md hover:text-primary transition-colors"
					>
						{media.media_type === "movie" ? media.title : media.name}
					</Link>
				))}
			</ul>

			{!isMobile && hoveredMedia && (
				<div
					className="absolute top-0 left-full ml-9 lg:left-auto lg:right-full lg:mr-9 w-80"
					onMouseEnter={() => setIsHoveringCard(true)}
					onMouseLeave={() => {
						setIsHoveringCard(false)
						setHoveredMedia(null)
					}}
				>
					<Card className="shadow-lg animate-fade-in z-10 bg-background overflow-hidden">
						<CardContent className="flex flex-col gap-2 ">
							<div className="rounded-md aspect-[2/3] relative overflow-hidden">
								<Image
									fallback="/fallback-poster.jpg"
									src={`${TMDB_IMAGE_BASE}w500${hoveredMedia.poster_path}`}
									sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
									alt={
										hoveredMedia.media_type === "movie"
											? hoveredMedia.title
											: hoveredMedia.name
									}
									className="object-cover"
								/>
							</div>

							<div className="absolute top-8 left-8">
								<div
									className={`inline-flex items-center justify-center text-sm font-bold w-10 h-4 rounded-sm p-4 ${getRatingColorBg(
										hoveredMedia.vote_average
									)}`}
								>
									{hoveredMedia.vote_average.toFixed(1)}
								</div>
							</div>
							<h3 className="text-lg font-semibold">
								{hoveredMedia.media_type === "movie"
									? hoveredMedia.title
									: hoveredMedia.name}
							</h3>
							<p className="text-sm text-muted-foreground">
								{hoveredMedia.media_type === "movie"
									? hoveredMedia.release_date.slice(0, 4)
									: hoveredMedia.first_air_date.slice(0, 4)}
							</p>
							<ul className="flex gap-2 ">
								{genres != undefined &&
									!isGenresPending &&
									getGenreNames(hoveredMedia.genre_ids, genres)?.map(
										(name, index) => (
											<li
												className="cursor-pointer hover:text-primary"
												key={index}
											>
												{name}
												{index < 2 ? ", " : ""}
											</li>
										)
									)}
							</ul>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	)
}
