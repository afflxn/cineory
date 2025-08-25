import { tmdbFetch } from "@/src/shared/lib/tmdbFetch"
import { Genre } from "@/src/shared/types/genre"
import { MediaType } from "@/src/shared/types/media"
import { getLocale } from "next-intl/server"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
	request: NextRequest,
	{ params }: { params: Promise<{ mediaType: MediaType }> }
) => {
	const { mediaType } = await params
	try {
		if (!["series", "movie"].includes(mediaType)) {
			return NextResponse.json(
				{ error: 'Invalid mediaType. Must be "series" or "movie"' },
				{ status: 400 }
			)
		}

		const locale = await getLocale()
		const language = locale === "en" ? "en-US" : "ru-RU"

		const res = await tmdbFetch<{ genres: Genre[] }>(
			`/genre/${mediaType === "movie" ? "movie" : "tv"}/list`,
			{
				signal: request.signal,
				params: {
					language: language,
				},
			}
		).then((res) => res.genres)

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
