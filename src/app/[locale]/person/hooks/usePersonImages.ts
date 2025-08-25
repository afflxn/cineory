import { fetchSafe } from "@/src/shared/lib/fetchSafe"
import {
	SinglePersonImage,
	SinglePersonImageDto,
} from "@/src/shared/types/person"
import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"

export const usePersonImages = (id: number) => {
	const locale = useLocale()
	const {
		data: images,
		isPending,
		error,
	} = useQuery<SinglePersonImage[] | undefined>({
		queryKey: ["person", "images", id],
		queryFn: async ({ signal }) => {
			const res = await fetchSafe<SinglePersonImageDto>(
				`/${locale}/api/person/${id}/images`,
				{
					signal,
				}
			)
			return res?.profiles
		},
	})

	return { images, isPending, error }
}
