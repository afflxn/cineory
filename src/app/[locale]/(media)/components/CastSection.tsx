import { PersonWithTooltip } from "@/src/components/custom/PersonWithTooltip"
import { Link } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { MediaCredits } from "@/src/shared/types/credits"
import { useTranslations } from "next-intl"

type Props = {
	credits: MediaCredits | null
	id: number
}

export const CastSection = ({ credits, id }: Props) => {
	const t = useTranslations("MediaPage.mainCast")

	if (!credits) return null
	const cast = credits.cast.slice(0, 10)

	return (
		<div className="bg-black/33 p-6 rounded-lg border border-border backdrop-blur-sm">
			<h3 className="text-base sm:text-lg lg:text-2xl font-bold text-white mb-2">
				{t("label")}
			</h3>

			<ul className="space-y-1">
				{cast.map((person) => (
					<li key={person.id}>
						<PersonWithTooltip person={person} />
					</li>
				))}
			</ul>

			<Link
				href={`${id}/${PAGES.CAST}`}
				className="mt-3 inline-block text-primary cursor-pointer"
			>
				{credits?.cast.length} {t("actors")}
			</Link>
		</div>
	)
}
