"use client"

import { Image } from "@/src/components/custom/Image"
import { Link } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { Person } from "@/src/shared/types/person"
import { Star } from "lucide-react"
import { useTranslations } from "next-intl"

type Props = {
	media: Person
}

export const PersonCard = ({ media: person }: Props) => {
	const t = useTranslations("HomePage")

	const imageUrl = person.profile_path
		? `${TMDB_IMAGE_BASE}original${person.profile_path}`
		: "../../assets/fallback-avatar.jpg"

	return (
		<Link
			href={PAGES.PERSON(person.id)}
			className="block relative group overflow-hidden rounded-4xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer aspect-[3/4] w-35 lg:w-45 mx-1 md:mx-2"
		>
			<Image
				fallback="/fallback-avatar.jpg"
				src={imageUrl}
				sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 15vw"
				alt={person.name}
				className="aspect-[3/4] w-40 sm:w-48 md:w-56 lg:w-64 object-cover object-top group-hover:scale-105 group-hover:opacity-70 transition-transform duration-500 will-change-transform"
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<div className="absolute bottom-0 w-full p-3 text-white z-10">
					<h3 className="text-sm font-semibold truncate">{person.name}</h3>

					<div className="flex items-center justify-between text-xs text-gray-300 mt-2">
						<span>{t("popularity")}</span>
						<div className="flex items-center gap-1">
							<Star className="w-3 h-3 text-orange-500 fill-orange-500" />
							<span>{person.popularity.toFixed(1)}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
