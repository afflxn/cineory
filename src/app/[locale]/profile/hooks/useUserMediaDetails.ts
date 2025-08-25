import { db } from "@/src/shared/config/firebase.config"
import { fetchMediaDetails } from "@/src/shared/lib/fetchMediaDetails"
import {
	MediaCategory,
	SortOption,
	SortType,
	useProfileStore,
} from "@/src/shared/store/useProfileStore"
import { SingleMedia } from "@/src/shared/types/media"
import { MediaListItem } from "@/src/shared/types/user"
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"
import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot,
	startAfter,
	Timestamp,
	where,
} from "firebase/firestore"
import { useLocale } from "next-intl"

type PageParam = QueryDocumentSnapshot | undefined

type MediaIdsResponse = {
	mediaList: (
		| (SingleMedia & { category: MediaCategory; addedAt: Timestamp })
		| null
	)[]
	lastDoc: QueryDocumentSnapshot | undefined
}

export const useUserMediaDetails = (uid: string | undefined) => {
	const { category, sortBy, sortType } = useProfileStore()
	const locale = useLocale()

	const PAGE_SIZE = 10

	return useInfiniteQuery<
		MediaIdsResponse,
		Error,
		InfiniteData<MediaIdsResponse>,
		[string, string | undefined, MediaCategory | "all", SortOption, SortType],
		PageParam
	>({
		queryKey: ["mediaIds", uid, category, sortBy, sortType],
		queryFn: async ({ pageParam }) => {
			if (!uid) return { mediaList: [], lastDoc: undefined }

			const ref = collection(db, "users", uid, "mediaList")

			let q

			if (category === "all") {
				q = query(ref, orderBy(sortBy, sortType), limit(PAGE_SIZE))
			} else {
				q = query(
					ref,
					where("category", "==", category),
					orderBy(sortBy, sortType),
					limit(PAGE_SIZE)
				)
			}

			if (pageParam) {
				q = query(q, startAfter(pageParam))
			}

			const snapshot = await getDocs(q)
			const mediaListIds = snapshot.docs.map(
				(doc) => doc.data() as MediaListItem
			)
			const isFullPage = snapshot.docs.length === PAGE_SIZE
			const lastDoc = isFullPage
				? snapshot.docs[snapshot.docs.length - 1]
				: undefined
			const mediaList = await fetchMediaDetails(mediaListIds, locale)

			return {
				mediaList,
				lastDoc,
			}
		},
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => lastPage.lastDoc ?? undefined,
		enabled: !!uid,
	})
}
