import { getBaseURL } from "@/src/shared/lib/getBaseURL"
import { MovieInList } from "@/src/shared/types/movie"
import { getLocale } from "next-intl/server"
import { HeroSlider } from "./HeroSlider"
import { HeroSliderSkeleton } from "./HeroSliderSkeleton"

export const HeroSection = async () => {
	const locale = await getLocale()
	const baseUrl = await getBaseURL()

	const res = await fetch(`${baseUrl}/${locale}/api/movie/week`, {
		next: { revalidate: 3600 },
	})

	if (!res.ok) return <HeroSliderSkeleton />

	const data: MovieInList[] = await res.json()

	return <HeroSlider movies={data} />
}
