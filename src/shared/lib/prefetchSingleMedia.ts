import { MediaType } from "../types/media"
import { fetchSafe } from "./fetchSafe"
import { getBaseURL } from "./getBaseURL"

export const prefetchSingleMedia = async <T>(
	mediaType: MediaType,
	id: number,
	endpoint: string,
	locale: "en" | "ru"
) => {
	try {
		const baseURL = await getBaseURL()
		return fetchSafe<T>(
			`${baseURL}/${locale}/api/${mediaType}/${id}/${endpoint}`
		)
	} catch {
		return null
	}
}
