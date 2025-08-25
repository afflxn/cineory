import { fetchMedia } from "@/src/shared/lib/fetchMedia"
import { MediaType } from "@/src/shared/types/media"
import { getLocale } from "next-intl/server"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
	request: NextRequest,
	{ params }: { params: Promise<{ mediaType: MediaType }> }
) => {
	const { mediaType } = await params
	try {
		const locale = await getLocale()
		const language = locale === "en" ? "en-US" : "ru-RU"

		const res = (
			await fetchMedia(
				`/trending/${mediaType === "movie" ? "movie" : "tv"}/week`,
				request.signal,
				language
			)
		).filter((movie) => movie.vote_average > 3)

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
