import { tmdbFetch } from "@/src/shared/lib/tmdbFetch"
import { MediaType, SingleMedia } from "@/src/shared/types/media"
import { getLocale } from "next-intl/server"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
	request: NextRequest,
	{ params }: { params: Promise<{ mediaType: MediaType; id: string }> }
) => {
	const { mediaType, id } = await params

	try {
		const locale = await getLocale()
		const language = locale === "en" ? "en-US" : "ru-RU"
		const res = await tmdbFetch<SingleMedia>(
			mediaType === "movie" ? `/movie/${id}` : `tv/${id}`,
			{
				signal: request.signal,
				params: {
					language,
				},
			}
		)

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
