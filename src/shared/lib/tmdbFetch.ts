const BASE_URL = "https://api.themoviedb.org/"

export const tmdbFetch = async <T>(
	endpoint: string,
	options: RequestInit & {
		params?: Record<string, string | number | boolean | undefined>
	} = {}
): Promise<T> => {
	const url = new URL(`3/${endpoint}`, BASE_URL)

	if (options.params) {
		Object.entries(options.params).forEach(([key, value]) => {
			if (value !== undefined) {
				url.searchParams.append(key, String(value))
			}
		})
	}

	const res = await fetch(url.href, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
			"Content-Type": "application/json",
		},
		...options,
	})

	if (!res.ok) {
		throw new Error(`TMDB Fetch error: ${res.status} ${res.statusText}`)
	}

	return res.json() as Promise<T>
}
