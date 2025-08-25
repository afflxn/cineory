import { MediaCard } from "@/src/components/custom/MediaCard"
import { MovieInList } from "@/src/shared/types/movie"
import { Person } from "@/src/shared/types/person"
import { TVShowInList } from "@/src/shared/types/series"

import { getTranslations } from "next-intl/server"
import { HeroSection } from "./components/HeroSection"
import { MediaSection } from "./components/MediaSection"
import { PersonCard } from "./components/PersonCard"

export const revalidate = 3600

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "Metadata" })

	return {
		title: "Cineory",
		description: t("description"),
		openGraph: {
			title: "Cineory",
			description: t("description"),
			images: [
				{
					url: "/homePage.webp",
					width: 1200,
					heigh: 630,
					alt: "img",
				},
			],
		},
	}
}

const HomePage = async () => {
	const t = await getTranslations("HomePage")
	return (
		<section className="mb-10">
			<HeroSection />

			<MediaSection<MovieInList>
				title={t("upcomingMovies")}
				type="movie"
				endpoint="now"
				CardComponent={MediaCard}
			/>

			<MediaSection<Person>
				title={t("person")}
				type="person"
				endpoint="popular"
				CardComponent={PersonCard}
			/>

			<MediaSection<TVShowInList>
				title={t("popularSeries")}
				type="series"
				endpoint="week"
				CardComponent={MediaCard}
			/>

			<MediaSection<MovieInList>
				title={t("bestMovie")}
				type="movie"
				endpoint="top"
				CardComponent={MediaCard}
			/>

			<MediaSection<TVShowInList>
				title={t("bestSeries")}
				type="series"
				endpoint="top"
				CardComponent={MediaCard}
			/>
		</section>
	)
}

export default HomePage
