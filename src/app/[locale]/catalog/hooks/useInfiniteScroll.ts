import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export const useInfiniteScroll = (
	onIntersect: () => void,
	isFetchingNextPage: boolean,
	isError: boolean,
	hasNextPage: boolean
) => {
	const { ref, entry } = useInView({
		threshold: 0.1,
		delay: 100,
		root: null,
		rootMargin: "200px 0px",
	})

	useEffect(() => {
		if (
			entry?.isIntersecting &&
			!isFetchingNextPage &&
			!isError &&
			hasNextPage
		) {
			onIntersect()
		}
	}, [
		entry?.isIntersecting,
		isFetchingNextPage,
		isError,
		onIntersect,
		hasNextPage,
	])

	return { ref }
}
