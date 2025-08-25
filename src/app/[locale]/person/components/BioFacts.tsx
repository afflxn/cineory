import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import { SinglePerson } from "@/src/shared/types/person"
import { getTranslations } from "next-intl/server"
import { calculateAge } from "../helpers/calcAge"

type BioFactsProps = {
	person: SinglePerson
}

export const BioFacts = async ({ person }: BioFactsProps) => {
	const t = await getTranslations("PersonPage.personDetails")

	let gender: string = ""
	switch (person.gender) {
		case 0:
			gender = t("trap")
			break
		case 1:
			gender = t("female")
			break
		case 2:
			gender = t("male")
			break
		default:
			break
	}

	return (
		<Card className="bg-black/33 backdrop-blur-sm border-none">
			<CardHeader>
				<CardTitle className="text-lg">{t("about")}</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-[1fr_3fr] text-sm space-y-2 text-zinc-300">
				<span className="text-zinc-400">{t("career")} </span>
				<p>{person.known_for_department}</p>

				<span className="text-zinc-400">{t("birthday")}</span>
				<div className="flex gap-2">
					{person.birthday}
					{!person.deathday && (
						<span className="text-zinc-400 italic mr-10">
							{calculateAge(person.birthday)}
						</span>
					)}
				</div>

				<span className="text-zinc-400">{t("place")}</span>
				<p>{person.place_of_birth}</p>

				<span className="text-zinc-400">{t("sex")}</span>
				<p>{gender}</p>

				<span className="text-zinc-400">{t("popular")}</span>
				<p>{person.popularity.toFixed(0)}</p>

				{person.deathday && (
					<>
						<span className="text-zinc-400">{t("deathday")}</span>
						<div className="flex gap-2">
							<p>{person?.deathday}</p>
							<span className="text-zinc-400 italic mr-10">
								{calculateAge(person.birthday, person.deathday)}
							</span>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	)
}
