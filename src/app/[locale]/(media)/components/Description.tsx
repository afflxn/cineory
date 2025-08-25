import { getTranslations } from "next-intl/server"

type Props = {
	overview: string
}

export const Description = async ({ overview }: Props) => {
	const t = await getTranslations("MediaPage.description")
	return (
		<div className=" bg-black/33 p-6 rounded-lg border border-border backdrop-blur-sm">
			<h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2">
				{t("descr")}
			</h3>
			<p className="text-gray-200 text-sm sm:text-base leading-relaxed">
				{overview || t("none")}
			</p>
		</div>
	)
}
