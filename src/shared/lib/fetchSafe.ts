export const fetchSafe = async <T>(
	url: string,
	options?: RequestInit
): Promise<T | null> => {
	const res = await fetch(url, options)

	if (!res.ok) {
		return null
	}

	return res.json() as Promise<T>
}
