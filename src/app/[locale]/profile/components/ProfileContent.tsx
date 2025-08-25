import { Skeleton } from "@/src/components/ui/skeleton"
import { useProfileStore } from "@/src/shared/store/useProfileStore"
import { useTranslations } from "next-intl"
import { useShallow } from "zustand/react/shallow"
import { useInfiniteScroll } from "../../catalog/hooks/useInfiniteScroll"
import { useUserMediaDetails } from "../hooks/useUserMediaDetails"
import { MediaCardById } from "./MediaCardById"
import { MediaListItem } from "./MediaListItem"
import { MediaListItemSkeleton } from "./MediaListItemSkeleton"

type Props = {
	uid: string | undefined
}

export const ProfileContent = ({ uid }: Props) => {
	const [view, hasHydrated] = useProfileStore(
		useShallow((state) => [state.view, state.hasHydrated])
	)

	const {
		data,
		isPending,
		isPlaceholderData,
		fetchNextPage,
		isFetchingNextPage,
		isError,
		hasNextPage,
	} = useUserMediaDetails(uid)

	const mediaDetails = data?.pages.flatMap((page) => page.mediaList) ?? []

	const { ref } = useInfiniteScroll(
		fetchNextPage,
		isFetchingNextPage,
		isError,
		hasNextPage
	)
	const t = useTranslations("Profile")

	if (!hasHydrated) {
		return <div className="min-h-full flex-1" />
	}

	return (
		<main
			className={
				"flex-1 bg-background p-5 rounded-2xl border border-border" +
				(isPlaceholderData ? " opacity-50" : "")
			}
		>
			{!isPending && mediaDetails?.length === 0 ? (
				<div className="text-center text-xl md:text-4xl grid place-items-center h-full text-muted-foreground">
					<div>{t("noMedia")}</div>
				</div>
			) : view === "grid" ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
					{isPending
						? Array.from({ length: 5 }).map((_, i) => (
								<Skeleton
									key={i}
									className="rounded-2xl shadow-lg aspect-[2/3]"
								/>
						  ))
						: mediaDetails &&
						  mediaDetails.map((item, index) =>
								item ? (
									<MediaCardById key={item.id} media={item} />
								) : (
									<Skeleton
										className="rounded-2xl shadow-lg aspect-[2/3]"
										key={index}
									/>
								)
						  )}
					{isFetchingNextPage &&
						Array.from({ length: 5 }).map((_, index) => (
							<Skeleton
								key={index}
								className="rounded-2xl shadow-lg aspect-[2/3]"
							/>
						))}
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{isPending
						? Array.from({ length: 3 }).map((_, i) => (
								<MediaListItemSkeleton key={i} />
						  ))
						: mediaDetails &&
						  mediaDetails.map((item, index) =>
								item ? (
									<MediaListItem key={item.id} media={item} />
								) : (
									<MediaListItemSkeleton key={index} />
								)
						  )}
					{isFetchingNextPage &&
						Array.from({ length: 10 }).map((_, index) => (
							<MediaListItemSkeleton key={index} />
						))}
				</div>
			)}
			{hasNextPage && (
				<div className="h-1 absolute bottom-0 left-0 right-0" ref={ref} />
			)}
		</main>
	)
}
