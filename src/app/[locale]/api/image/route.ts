import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const url = req.nextUrl.searchParams.get("url")
	if (!url) {
		return NextResponse.json({ error: "No URL provided" }, { status: 400 })
	}

	try {
		const res = await fetch(url)
		if (!res.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch image" },
				{ status: res.status }
			)
		}

		const arrayBuffer = await res.arrayBuffer()
		const contentType = res.headers.get("content-type") || "image/jpeg"
		const cacheControl =
			"public, max-age=31536000, immutable, s-maxage=86400, stale-while-revalidate=59"

		return new NextResponse(arrayBuffer, {
			headers: {
				"Content-Type": contentType,
				"Cache-Control": cacheControl,
			},
		})
	} catch (err) {
		console.error(`Error fetching image:`, err)

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
