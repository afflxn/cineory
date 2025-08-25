import { BackgroundImage } from "@/src/components/custom/BackgroundImage"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { fetchSafe } from "@/src/shared/lib/fetchSafe"
import { getBaseURL } from "@/src/shared/lib/getBaseURL"
import { PersonMediaCredits } from "@/src/shared/types/credits"
import { SinglePerson } from "@/src/shared/types/person"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { MediaPoster } from "../../../../components/custom/MediaPoster"
import { BestMediaList } from "../components/BestMediaList"
import { BioFacts } from "../components/BioFacts"
import { BiographyCard } from "../components/BiographyCard"
import { PersonImages } from "../components/PersonImages"
import { PersonMediaTabs } from "../components/PersonMediaTabs"
import { getBestMovies, getBestTVShows } from "../helpers/getPopularSortedMedia"

export const revalidate = 43200

type PageParams = Promise<{ id: string; locale: "en" | "ru" }>

export async function generateMetadata({
	params,
}: {
	params: PageParams
}): Promise<Metadata> {
	const { id, locale } = await params
	const baseURL = await getBaseURL()

	const data = await fetchSafe<SinglePerson>(
		`${baseURL}/${locale}/api/person/${id}`
	)

	if (!data) {
		return {
			title: "Error",
			description: "No data found",
		}
	}

	return {
		title: data.name,
		description: data.biography.slice(150),
		openGraph: {
			title: data.name,
			description: data.biography.slice(100),
			images: data.profile_path
				? [`${TMDB_IMAGE_BASE}w500${data.profile_path}`]
				: [],
		},
	}
}

const PersonPage = async ({ params }: { params: PageParams }) => {
	const { id, locale } = await params
	const baseURL = await getBaseURL()
	const t = await getTranslations("PersonPage")

	const person = await fetchSafe<SinglePerson>(
		`${baseURL}/${locale}/api/person/${id}`
	)

	const mediaCredits = await fetchSafe<PersonMediaCredits>(
		`${baseURL}/${locale}/api/person/${+id}/credits`
	)

	if (!person || !mediaCredits) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-3xl font-bold">{t("error")}</h1>
			</div>
		)
	}

	const isActor = person?.known_for_department === "Acting"
	const credits = isActor ? mediaCredits?.cast : mediaCredits?.crew

	let backdropPath: string | undefined
	if (credits?.length) {
		const randomIndex = Math.floor(Math.random() * credits.length)
		backdropPath = credits[randomIndex]?.backdrop_path
	}

	const bestMovies = getBestMovies(credits ?? [])
	const bestSeries = getBestTVShows(credits ?? [])

	return (
		<main className="relative min-h-screen text-zinc-100">
			<section className="relative">
				<BackgroundImage backdropPath={backdropPath} />
				<div className="relative z-10 container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-4 gap-5">
					<div className="row-start-1 row-end-4 lg:col-start-1 lg:row-end-6 relative w-full mt-2">
						<MediaPoster poster={person.profile_path} isPerson />
					</div>

					<div className="lg:col-start-2 md:row-start-1 lg:col-span-3">
						<h1 className="text-3xl md:text-4xl font-bold">{person?.name}</h1>
						<p className="text-zinc-300">
							{person?.also_known_as.slice(0, 3).join(" | ")}
						</p>
					</div>

					<div className="md:row-span-2 lg:row-start-2 lg:row-end-4 lg:col-span-2 row-span-3 ">
						<BioFacts person={person} />
					</div>

					<aside className="md:col-start-1 md:row-start-4 md:row-end-7 lg:col-start-4 lg:row-start-2 lg:row-span-4 z-30">
						<div className="relative flex flex-col">
							{bestMovies.length > 0 && (
								<div className="backdrop-blur-2xl p-4 rounded-2xl bg-black/33 z-10">
									<h2 className="text-xl font-bold mb-2">{t("movies")}</h2>
									<BestMediaList mediaItems={bestMovies} mediaType={"movie"} />
								</div>
							)}

							{bestSeries.length > 0 && (
								<div className="mt-5 backdrop-blur-2xl p-4 rounded-2xl bg-black/33 z-10">
									<h2 className="text-xl font-bold mb-2">{t("series")}</h2>
									<BestMediaList mediaItems={bestSeries} mediaType={"series"} />
								</div>
							)}
						</div>
					</aside>
					<div className="md:row-start-4 lg:col-start-2 lg:row-start-4 lg:col-span-2">
						<BiographyCard biography={person.biography} />
					</div>
				</div>
			</section>

			<section className="bg-gradient-to-b from-black to-background  lg:p-10 backdrop-blur-2xl">
				<div className="container">
					<PersonImages id={Number(id)} />
					<h2 className="mt-10 text-center text-3xl">{t("filmography")}</h2>
					{mediaCredits && <PersonMediaTabs {...mediaCredits} />}
				</div>
			</section>
		</main>
	)
}

export default PersonPage
