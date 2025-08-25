import { MediaCard } from "@/src/components/custom/MediaCard"
import { MediaInList } from "@/src/shared/types/media"
import { getTranslations } from "next-intl/server"
import { MediaSlider } from "../../../../components/custom/MediaSlider"

type Props = {
	recommendations: MediaInList[] | null
}

export const Recommendation = async ({ recommendations }: Props) => {
	const t = await getTranslations("MediaPage")

	if (!recommendations || recommendations.length === 0) return null

	return (
		<section className="max-w-6xl mx-auto px-4 py-8">
			<MediaSlider title={t("recommended")}>
				{recommendations.map((item) => (
					<div key={item.id}>
						<MediaCard media={item} />
					</div>
				))}
			</MediaSlider>
		</section>
	)
}
