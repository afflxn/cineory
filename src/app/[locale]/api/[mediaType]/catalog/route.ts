import { tmdbFetch } from "@/src/shared/lib/tmdbFetch"
import { MediaInListResponse } from "@/src/shared/types/media"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
	request: NextRequest,
	{ params }: { params: Promise<{ locale: "en" | "ru"; mediaType: string }> }
) => {
	const { mediaType, locale } = await params
	const { searchParams } = new URL(request.url)

	const query = searchParams.get("query")
	const page = searchParams.get("page") ?? "1"
	const sortBy = searchParams.get("sortBy") ?? "popularity.desc"
	const selectedGenres = searchParams.get("selectedGenres")
	const excludedGenres = searchParams.get("excludedGenres")
	const includeAdult = searchParams.get("includeAdult") ?? "false"
	const yearFrom = searchParams.get("yearFrom")
	const yearTo = searchParams.get("yearTo")
	const ratingFrom = searchParams.get("ratingFrom")
	const ratingTo = searchParams.get("ratingTo")
	const language = locale === "en" ? "en-US" : "ru-RU"

	const url = query
		? `/search/${mediaType === "movie" ? "movie" : "tv"}`
		: `/discover/${mediaType === "movie" ? "movie" : "tv"}`

	try {
		const res = await tmdbFetch<MediaInListResponse>(url, {
			params: {
				page,
				query: query || undefined,
				sort_by: sortBy,
				with_genres: selectedGenres || undefined,
				without_genres: excludedGenres || undefined,
				include_adult: includeAdult,
				[`${
					mediaType === "movie"
						? "primary_release_date.gte"
						: "first_air_date.gte"
				}`]: yearFrom ? `${yearFrom}-01-01` : undefined,
				[`${
					mediaType === "movie"
						? "primary_release_date.lte"
						: "first_air_date.lte"
				}`]: yearTo ? `${yearTo}-12-31` : undefined,
				"vote_average.gte": ratingFrom || undefined,
				"vote_average.lte": ratingTo || undefined,
				language,
			},
		})

		return NextResponse.json(res)
	} catch (err) {
		console.error(`Error fetching ${mediaType}:`, err)

		if (err instanceof Error) {
			const match = err.message.match(/(\d{3})/)
			const status = match ? parseInt(match[1]) : 500

			return NextResponse.json({ error: err.message }, { status })
		}

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		)
	}
}
