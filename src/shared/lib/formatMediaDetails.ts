import { statusMap } from "../constants/seriesStatusMap"
import { FormattedMediaData, SingleMedia } from "../types/media"
import { formatRuntime } from "./formatRuntime"
import { isMovie } from "./isMovie"

export const formatMediaData = (
	data: SingleMedia,
	locale: string
): FormattedMediaData => {
	const releaseDate = isMovie(data) ? data.release_date : data.first_air_date

	const year = releaseDate ? new Date(releaseDate).getFullYear() : null

	const lastAirYear = !isMovie(data)
		? new Date(data.last_air_date).getFullYear()
		: null

	const runtimeWithOutFormat = isMovie(data)
		? data.runtime
		: data.episode_run_time?.[0]

	const runtime = formatRuntime(runtimeWithOutFormat, locale)

	const status = !isMovie(data)
		? locale === "en"
			? data.status
			: statusMap[data.status]
		: null

	const homepage = data.homepage

	const revenue =
		isMovie(data) && data.revenue ? data.revenue.toLocaleString() : null

	const budget =
		isMovie(data) && data.budget > 0 ? data.budget.toLocaleString() : null

	const slogan = data.tagline

	const countries = data.production_countries || []

	const genres = data.genres || []

	const title = isMovie(data) ? data.title : data.name
	const originalTitle = isMovie(data) ? data.original_title : data.original_name
	const vote = data.vote_average
	const voteCount = data.vote_count

	return {
		year,
		lastAirYear,
		runtime,
		status,
		homepage,
		revenue,
		budget,
		slogan,
		countries,
		genres,
		title,
		originalTitle,
		vote,
		voteCount,
	}
}
