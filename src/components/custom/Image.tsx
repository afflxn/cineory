"use client"

import { cn } from "@/src/shared/lib/utils"
import ImageNext, { ImageProps } from "next/image"
import { useEffect, useState } from "react"

type ImageWithFallbackProps = Partial<ImageProps> & {
	fallback: string
	alt: string
	className: string
}

export const Image = ({
	fallback,
	src,
	className,
	fill = true,
	...rest
}: ImageWithFallbackProps) => {
	const [imgSrc, setImgSrc] = useState(() =>
		src ? `/en/api/image?url=${src}` : fallback
	)

	useEffect(() => {
		if (src) setImgSrc(`/en/api/image?url=${src}`)
	}, [src])

	return (
		<ImageNext
			{...rest}
			src={imgSrc}
			fill={fill}
			className={cn("transform-gpu will-change-transform", className)}
			onError={() => {
				if (imgSrc !== fallback) setImgSrc(fallback)
			}}
		/>
	)
}
