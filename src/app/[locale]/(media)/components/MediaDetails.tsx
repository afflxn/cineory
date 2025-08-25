import { PersonWithTooltip } from "@/src/components/custom/PersonWithTooltip"
import { extractMainDomain } from "@/src/shared/lib/extractMainDomain"
import { formatCrew } from "@/src/shared/lib/formatCrew"

import { MediaCredits } from "@/src/shared/types/credits"
import {
	FormattedMediaData,
	MediaType,
	ProductionCountry,
} from "@/src/shared/types/media"
import { getTranslations } from "next-intl/server"
import { Fragment } from "react"
import { DetailRow } from "./DetailRow"
import { MediaDetailsGenres } from "./MediaDetailsGenres"

type Props = {
	mediaDetails: FormattedMediaData
	credits: MediaCredits | null
	mediaType: MediaType
}

export const MediaDetails = async ({
	mediaDetails,
	credits,
	mediaType,
}: Props) => {
	const t = await getTranslations("MediaPage.details")

	const {
		lastAirYear,
		runtime,
		status,
		year,
		budget,
		homepage,
		revenue,
		slogan,
		countries,
		genres,
	} = mediaDetails

	const { director, writers } = formatCrew(credits)

	return (
		<div className="bg-black/33 p-6 rounded-lg border border-border backdrop-blur-sm relative z-20 text-sm sm:text-base lg:text-lg">
			<div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-2 text-gray-200">
				{year && (
					<DetailRow label={t("year")}>
						{year} {lastAirYear && <>- {lastAirYear}</>}
					</DetailRow>
				)}

				{status && <DetailRow label={t("status")}>{status}</DetailRow>}

				{countries.length > 0 && (
					<DetailRow label={t("country")}>
						{countries.map((country: ProductionCountry, index: number) => (
							<Fragment key={country.iso_3166_1}>
								{country.name}
								{index < countries.length - 1 ? ", " : ""}
							</Fragment>
						))}
					</DetailRow>
				)}

				{genres.length > 0 && (
					<MediaDetailsGenres
						genres={genres}
						mediaType={mediaType}
						title={t("genres")}
					/>
				)}

				{slogan && <DetailRow label={t("slogan")}>{slogan}</DetailRow>}

				{director && (
					<DetailRow label={t("director")}>
						<PersonWithTooltip person={director} />
					</DetailRow>
				)}

				{writers && writers.length > 0 && (
					<DetailRow label={t("writer")}>
						{writers.map((writer) => (
							<Fragment key={`${writer.id}-${writer.job}`}>
								<PersonWithTooltip person={writer} />
							</Fragment>
						))}
					</DetailRow>
				)}

				{budget && <DetailRow label={t("budget")}>{budget} $</DetailRow>}

				{revenue && <DetailRow label={t("fees")}>{revenue} $</DetailRow>}

				{runtime && <DetailRow label={t("duration")}>{runtime}</DetailRow>}

				{homepage && (
					<DetailRow label={t("website")}>
						<a href={homepage} target="_blank" rel="noopener noreferrer">
							{extractMainDomain(homepage)}
						</a>
					</DetailRow>
				)}
			</div>
		</div>
	)
}
