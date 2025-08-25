"use client"

import { Image } from "@/src/components/custom/Image"
import { MediaRatingControl } from "@/src/components/custom/MediaRatingControl"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { cn } from "@/src/shared/lib/utils"
import { MediaType } from "@/src/shared/types/media"
import { useState } from "react"

type Props = {
	poster: string
	mediaId?: number
	mediaType?: MediaType
	isPerson?: boolean
}

export const MediaPoster = ({
	mediaId,
	poster,
	mediaType,
	isPerson,
}: Props) => {
	const [loaded, setLoaded] = useState(false)

	const lowRes = `${TMDB_IMAGE_BASE}w300${poster}`
	const highRes = `${TMDB_IMAGE_BASE}original${poster}`

	return (
		<div className="relative aspect-[2/3] w-2/3 sm:w-1/2 md:w-full mx-auto rounded-lg border border-border shadow-xl overflow-hidden">
			<Image
				fallback="/fallback-poster.jpg"
				src={lowRes}
				alt="poster-low-res"
				className="blur-xs"
				priority
			/>
			<Image
				onLoad={() => setLoaded(true)}
				priority
				fallback="/fallback-poster.jpg"
				src={highRes}
				alt="poster-high-res"
				className={cn(
					"transition-opacity duration-700",
					loaded ? "opacity-100" : "opacity-0"
				)}
			/>
			{!isPerson && mediaId && (
				<MediaRatingControl
					mediaId={mediaId}
					type={mediaType === "movie" ? "movie" : "tv"}
				/>
			)}
		</div>
	)
}
