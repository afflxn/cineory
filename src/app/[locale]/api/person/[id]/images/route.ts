import { tmdbFetch } from "@/src/shared/lib/tmdbFetch"
import { SinglePersonImageDto } from "@/src/shared/types/person"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) => {
	const { id } = await params
	try {
		const res = await tmdbFetch<SinglePersonImageDto>(`person/${id}/images`, {
			signal: request.signal,
		})

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
