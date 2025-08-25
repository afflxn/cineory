import { Button } from "@/src/components/ui/button"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/components/ui/tabs"
import { Link } from "@/src/i18n/navigation"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { getCastTabsData } from "@/src/shared/lib/getCastTabsData"
import { isMovie } from "@/src/shared/lib/isMovie"
import { prefetchSingleMedia } from "@/src/shared/lib/prefetchSingleMedia"
import { MediaCredits } from "@/src/shared/types/credits"
import { MediaType, SingleMedia } from "@/src/shared/types/media"
import { ArrowUp } from "lucide-react"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { MediaAllCastListItem } from "../../../components/MediaAllCastListItem"

export const revalidate = 86400

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
		title: `${isMovie(data) ? data.title : data.name} | Cast`,
		description: data?.overview || "",
		openGraph: {
			title: `${isMovie(data) ? data.title : data.name} | Cast`,
			description: data.overview || "",
			images: data.poster_path
				? [`${TMDB_IMAGE_BASE}w500${data.poster_path}`]
				: [],
		},
	}
}

const MediaCastPage = async ({ params }: { params: PageParams }) => {
	const { id, mediaType, locale } = await params
	const numId = +id
	const t = await getTranslations("MediaPage")

	const credits = await prefetchSingleMedia<MediaCredits>(
		mediaType,
		numId,
		"credits",
		locale
	)

	if (!credits) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-3xl font-bold">
					{mediaType === "movie" ? t("error.movie") : t("error.series")}{" "}
					{t("error.general")}
				</h1>
			</div>
		)
	}

	const tabsData = getCastTabsData(credits)

	return (
		<div className="container">
			<Link href={`/${mediaType}/${id}`} className="flex justify-end mt-5">
				<Button variant={"link"} className="mx-auto lg:mx-0">
					{t("mediaAllCast.back")} <ArrowUp />
				</Button>
			</Link>
			<Tabs defaultValue="actors" className="mt-6 w-full ">
				<TabsList className="flex flex-wrap gap-2 h-12 bg-background rounded-lg shadow-inner mx-auto">
					{tabsData.map(({ value }) => (
						<TabsTrigger
							key={value}
							value={value}
							className="data-[state=active]:bg-primary data-[state=active]:text-white p-5 rounded-md text-sm font-medium transition-colors hover:bg-primary/80 cursor-pointer"
						>
							{t(`mediaAllCast.${value}`)}
						</TabsTrigger>
					))}
				</TabsList>
				{tabsData.map(({ value, filter }) => {
					const items = filter()
					return (
						<TabsContent
							key={value}
							value={value}
							className="space-y-3 my-4 mt-12 md:mt-0"
						>
							{items.length > 0 ? (
								items.map((person, index) => (
									<MediaAllCastListItem
										key={person.credit_id || person.id || index}
										type={value === "actor" ? "cast" : "crew"}
										person={person}
									/>
								))
							) : (
								<div className="text-center mt-20 text-2xl">
									{t("mediaAllCast.noData")}
								</div>
							)}
						</TabsContent>
					)
				})}
			</Tabs>
		</div>
	)
}

export default MediaCastPage
