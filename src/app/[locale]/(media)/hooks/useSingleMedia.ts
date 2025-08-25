import { fetchSafe } from "@/src/shared/lib/fetchSafe"
import { MediaType } from "@/src/shared/types/media"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"

export const useSingleMedia = <T>(
	id: number,
	mediaType: MediaType,
	endpoint: string
) => {
	const locale = useLocale()
	return useSuspenseQuery<T | null>({
		queryKey: [mediaType, id, endpoint, locale],
		queryFn: () =>
			fetchSafe<T>(`/${locale}/api/${mediaType}/${id}/${endpoint}`),
	})
}
