import { getBaseURL } from "@/src/shared/lib/getBaseURL"
import { MediaType } from "@/src/shared/types/media"
import { getLocale } from "next-intl/server"
import { MediaSlider } from "../../../../components/custom/MediaSlider"
import { MediaSliderSkeleton } from "./MediaSliderSkeleton"

type Props<T> = {
	title: string
	type: MediaType | "person"
	endpoint: string
	CardComponent: React.ComponentType<{ media: T }>
}

export const MediaSection = async <T extends { id: number }>({
	title,
	type,
	endpoint,
	CardComponent,
}: Props<T>) => {
	const locale = await getLocale()
	const baseUrl = await getBaseURL()

	const res = await fetch(`${baseUrl}/${locale}/api/${type}/${endpoint}`, {
		next: { revalidate: 3600 },
	})

	if (!res.ok) return <MediaSliderSkeleton />

	const data: T[] = await res.json()

	return (
		<MediaSlider title={title}>
			{data.map((item) => (
				<div key={item.id}>
					<CardComponent media={item} />
				</div>
			))}
		</MediaSlider>
	)
}
