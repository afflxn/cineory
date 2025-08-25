import { Timestamp } from "firebase/firestore"
import { MediaCategory } from "../store/useProfileStore"
import { SingleMedia } from "../types/media"
import { MediaListItem } from "../types/user"
import { fetchSafe } from "./fetchSafe"

export const fetchMediaDetails = async (
	data: MediaListItem[],
	locale: string
): Promise<
	((SingleMedia & { category: MediaCategory; addedAt: Timestamp }) | null)[]
> => {
	const results = await Promise.all(
		data.map(async (item) => {
			try {
				const data = await fetchSafe<SingleMedia>(
					`/${locale}/api/${item.type}/${item.id}/data`
				)

				if (!data) return null

				return {
					...data,
					category: item.category,
					addedAt: item.addedAt,
				}
			} catch {
				return null
			}
		})
	)
	return results.filter(Boolean)
}
