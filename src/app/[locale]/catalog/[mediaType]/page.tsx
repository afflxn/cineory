import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import CatalogPage from "../components/CatalogPage"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: "en" | "ru" }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations("Catalog")

	const title = t("title")
	const description = t("description")
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
			locale,
		},
	}
}

const Catalog = () => {
	return <CatalogPage />
}

export default Catalog
