import { categories } from "../constants/profileCategories"
import { MediaCategory } from "../store/useProfileStore"

export const getCategoryLabel = (key: MediaCategory): string => {
	const found = categories.find((category) => category.key === key)
	return found?.key ?? "unknown"
}
