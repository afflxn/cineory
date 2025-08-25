import { BackgroundImage } from "@/src/components/custom/BackgroundImage"
import { ClientAddToListSelect } from "@/src/components/custom/ClientAddToListSelect"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { formatMediaData } from "@/src/shared/lib/formatMediaDetails"
import { isMovie } from "@/src/shared/lib/isMovie"
import { prefetchSingleMedia } from "@/src/shared/lib/prefetchSingleMedia"
import { MediaCredits } from "@/src/shared/types/credits"
import {
	MediaInList,
	MediaType,
	SingleMedia,
	Videos,
} from "@/src/shared/types/media"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { MediaPoster } from "../../../../../components/custom/MediaPoster"
import { CastSection } from "../../components/CastSection"
import { Description } from "../../components/Description"
import { MediaDetails } from "../../components/MediaDetails"
import { MediaHeader } from "../../components/MediaHeader"
import { Recommendation } from "../../components/Recommendation"
import { Seasons } from "../../components/Seasons"
import { Trailer } from "../../components/Trailer"

export const revalidate = 43200

type PageParams = Promise<{
	id: string
	mediaType: MediaType
	locale: "en" | "ru"
}>

export async function generateMetadata({
	params,
}: {
	params: PageParams
}): Promise<Metadata> {
	const { id, mediaType, locale } = await params
	const numId = +id

	const data = await prefetchSingleMedia<SingleMedia>(
		mediaType,
		numId,
		"data",
		locale
	)

	if (!data) {
		return {
			title: "Error",
			description: "No data found",
		}
	}
	return {
		title: isMovie(data) ? data.title : data.name,
		description: data.overview || "",
		openGraph: {
			title: isMovie(data) ? data.title : data.name,
			description: data.overview || "",
			images: data.poster_path
				? [`${TMDB_IMAGE_BASE}w500${data.poster_path}`]
				: [],
		},
	}
}

const Page = async ({ params }: { params: PageParams }) => {
	const { id, mediaType, locale } = await params
	const numId = +id
	const t = await getTranslations("MediaPage")

	const data = await prefetchSingleMedia<SingleMedia>(
		mediaType,
		numId,
		"data",
		locale
	)
	const credits = await prefetchSingleMedia<MediaCredits>(
		mediaType,
		numId,
		"credits",
		locale
	)
	const recommendations = await prefetchSingleMedia<MediaInList[]>(
		mediaType,
		numId,
		"recommendations",
		locale
	)
	const videos = await prefetchSingleMedia<Videos>(
		mediaType,
		numId,
		"videos",
		locale
	)

	if (!data) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-3xl font-bold">
					{mediaType === "movie" ? t("error.movie") : t("error.series")}{" "}
					{t("error.general")}
				</h1>
			</div>
		)
	}

	const mediaDetails = formatMediaData(data, locale)

	return (
		<main className="w-full text-foreground">
			<section className="relative min-h-screen">
				<BackgroundImage backdropPath={data.backdrop_path} />
				<div className="relative z-10 container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-4 gap-5">
					<div className="row-start-1 row-end-4 md:row-end-3 lg:col-start-1 lg:row-end-6 relative w-full">
						<aside className="flex flex-col gap-5 mt-2">
							<MediaPoster
								mediaId={data.id}
								mediaType={mediaType}
								poster={data.poster_path}
							/>
							<ClientAddToListSelect
								title={mediaDetails.originalTitle}
								id={numId}
								mediaType={mediaType}
							/>
							<Trailer videos={videos} />
						</aside>
					</div>
					<div className="lg:col-start-2 md:row-start-1 lg:col-span-3">
						<MediaHeader mediaDetails={mediaDetails} />
					</div>

					<div className="lg:col-span-2 row-span-3 lg:row-span-2">
						<MediaDetails
							mediaDetails={mediaDetails}
							credits={credits}
							mediaType={mediaType}
						/>
					</div>

					<aside className="md:col-start-1 md:row-start-3 md:row-end-7 lg:col-start-4 lg:row-start-2 lg:row-span-3 z-30">
						<CastSection credits={credits} id={numId} />
					</aside>
					<div className="md:row-start-5 lg:col-start-2 lg:row-start-4 lg:col-span-2">
						<Description overview={data.overview} />
					</div>
				</div>
			</section>
			{"seasons" in data &&
				Array.isArray(data.seasons) &&
				data.seasons.length > 0 && <Seasons seasons={data.seasons} />}

			<Recommendation recommendations={recommendations} />
		</main>
	)
}

export default Page
