"use client"

import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { useMobile } from "@/src/shared/hooks/useMobile"
import cn from "clsx"
import Image from "next/image"
import { useState } from "react"

type Props = {
	backdropPath: string | undefined
	className?: string
}

export const BackgroundImage = ({ backdropPath, className }: Props) => {
	const [loaded, setLoaded] = useState(false)
	const isMobile = useMobile()

	const lowRes = `/en/api/image?url=${TMDB_IMAGE_BASE}w300${backdropPath}`
	const highRes = `/en/api/image?url=${TMDB_IMAGE_BASE}original${backdropPath}`

	if (isMobile) return null

	return (
		<div className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
			<Image
				src={lowRes}
				alt="bg-image-low-res"
				fill
				className="absolute inset-0 object-cover object-top blur-lg"
				priority
			/>

			<Image
				src={highRes}
				alt="bg-image-high-res"
				fill
				className={cn(
					"absolute inset-0 object-cover object-top transition-opacity duration-700",
					loaded ? "opacity-100" : "opacity-0"
				)}
				onLoadingComplete={() => setLoaded(true)}
				priority
			/>

			<div className="absolute inset-0 z-10 bg-gradient-to-t from-secondDark via-secondDark/50 to-secondDark/20" />
		</div>
	)
}
