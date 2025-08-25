"use client"

import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { ReactNode, useRef } from "react"

type Props = {
	title: string
	children: ReactNode
}

export const MediaSlider = ({ title, children }: Props) => {
	const autoplay = useRef(
		Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
	)
	const [emblaRef] = useEmblaCarousel(
		{
			loop: true,
			dragFree: true,
			align: "start",
		},
		[autoplay.current]
	)

	return (
		<section className="py-5">
			<div className="container">
				<h2 className="text-center md:text-start text-xl font-bold font-logo mb-4">
					{title}
				</h2>

				<div ref={emblaRef} className="overflow-hidden relative">
					<div className="flex">{children}</div>
				</div>
			</div>
		</section>
	)
}
