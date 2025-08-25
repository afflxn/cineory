"use client"

import { Season } from "@/src/shared/types/series"
import { useTranslations } from "next-intl"

type Props = {
	seasons: Season[]
}

export const Seasons = ({ seasons }: Props) => {
	const t = useTranslations("MediaPage.series")

	return (
		<section className="max-w-6xl mx-auto px-4 py-8">
			<h2 className="text-lg lg:text-xl font-semibold mb-4">{t("seasons")}</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{seasons.map((season) => (
					<div
						key={season.id}
						className="bg-white/5 rounded-lg border border-border p-3"
					>
						<p className="font-medium text-sm">{season.name}</p>
						<p className="text-xs text-white/60">
							{season.episode_count} {t("episodes")}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
