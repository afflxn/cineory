"use client"

import { BackgroundImage } from "@/src/components/custom/BackgroundImage"
import { Image } from "@/src/components/custom/Image"
import { Button } from "@/src/components/ui/button"
import { Link, useRouter } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { getGenreNames } from "@/src/shared/lib/getGenreNames"
import { getRatingColorBg } from "@/src/shared/lib/getRatingColor"
import { useCatalogFilter } from "@/src/shared/store/useCatalogFilter"
import { MovieInList } from "@/src/shared/types/movie"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useTranslations } from "next-intl"

import { useRef } from "react"
import { useGenres } from "../hooks/useGenres"

type Props = {
	movies: MovieInList[]
}

export const HeroSlider = ({ movies }: Props) => {
	const t = useTranslations("HomePage")
	const { genres } = useGenres("movie")

	const router = useRouter()
	const { setSelectedGenres, setYearFrom, setYearTo } = useCatalogFilter()

	const autoplay = useRef(
		Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
	)
	const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current])

	return (
		<section className="relative z-0 w-full h-auto md:h-[75vh] flex items-center bg-background text-foreground overflow-hidden mb-16 md:mb-30">
			<div className="embla w-full" ref={emblaRef}>
				<div className="embla__container flex">
					{movies?.map((slide) => (
						<div
							key={slide.id}
							className="embla__slide relative overflow-hidden h-auto md:h-[75vh] flex items-end md:p-8"
						>
							<BackgroundImage
								className="scale-105"
								backdropPath={slide.backdrop_path}
							/>
							<div className="container z-10 px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center md:items-end gap-6 py-5 lg:py-10 md:py-0">
								<div className="relative border border-border overflow-hidden w-2/3 sm:w-1/2 md:w-64 rounded-lg shadow-lg aspect-[2/3] shrink-0">
									<Image
										rel="preload"
										priority
										fallback="/fallback-poster.jpg"
										fill
										className="object-cover"
										sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
										src={`${TMDB_IMAGE_BASE}w1280${slide.poster_path}`}
										alt={slide.title}
									/>
								</div>

								<div className=" text-center md:text-left max-w-2xl space-y-4">
									<h1 className="text-xl sm:text-2xl md:text-4xl font-bold font-logo">
										{slide.title}
									</h1>

									<div className="flex justify-center md:justify-start items-center gap-2 text-xs sm:text-sm leading-none">
										<span
											className={`text-white border border-border p-2 rounded-lg ${getRatingColorBg(
												slide.vote_average
											)}`}
										>
											{slide.vote_average.toFixed(1)}
										</span>
										<Button
											onClick={() => {
												setYearFrom(slide.release_date.slice(0, 4))
												setYearTo(slide.release_date.slice(0, 4))
												router.replace(PAGES.CATALOG_MOVIE)
											}}
											className="bg-secondDark border border-border transition-colors hover:bg-background/75 text-white duration-500 p-2 rounded-lg cursor-pointer"
										>
											{slide.release_date.slice(0, 4)}
										</Button>
										<div className="flex justify-center md:justify-start gap-4">
											<Link href={PAGES.MOVIE(slide.id)}>
												<Button
													variant="default"
													className=" border border-border"
												>
													{t("mainButton")}
												</Button>
											</Link>
										</div>
									</div>
									<ul className="flex justify-center md:justify-start items-center gap-2">
										{genres != undefined
											? getGenreNames(slide.genre_ids, genres, 3)?.map(
													(name, index) => (
														<li
															onClick={() => {
																setSelectedGenres([
																	genres.find((genre) => genre.name === name)!
																		.id,
																])
																router.replace(PAGES.CATALOG_MOVIE)
															}}
															key={index}
														>
															<Button
																variant={"outline"}
																className="border border-border transition-colors duration-500 text-white rounded-lg p-2 cursor-pointer"
															>
																{name}
															</Button>
														</li>
													)
											  )
											: null}
									</ul>
									<p className="text-foreground text-sm sm:text-base line-clamp-3 sm:line-clamp-5 h-16 sm:h-36 overflow-hidden">
										{slide.overview}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
