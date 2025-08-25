"use client"

import ImageNext, { ImageProps } from "next/image"
import { useEffect, useState } from "react"

type ImageWithFallbackProps = Partial<ImageProps> & {
	fallback: string
	alt: string
}

export const Image = ({
	fallback,
	src,
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
			onError={() => {
				if (imgSrc !== fallback) setImgSrc(fallback)
			}}
		/>
	)
}
