import { tmdbFetch } from "@/src/shared/lib/tmdbFetch"
import { PersonResponse } from "@/src/shared/types/person"
import { getLocale } from "next-intl/server"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
	try {
		const locale = await getLocale()
		const language = locale === "en" ? "en-US" : "ru-RU"

		const res = await tmdbFetch<PersonResponse>(`/person/popular`, {
			signal: request.signal,
			params: {
				language,
			},
		}).then((res) => res.results)

		return NextResponse.json(res)
	} catch (err) {
		console.error(`Error fetching person:`, err)

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
