import { Image } from "@/src/components/custom/Image"
import { Link } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { MediaCreditsCast, MediaCreditsCrew } from "@/src/shared/types/credits"

type Props = {
	person: MediaCreditsCast | MediaCreditsCrew
	type: "cast" | "crew"
}

export const MediaAllCastListItem = ({ person, type }: Props) => {
	const role =
		type === "cast"
			? (person as MediaCreditsCast).character
			: (person as MediaCreditsCrew).job

	const image = person.profile_path
		? `${TMDB_IMAGE_BASE}h632${person.profile_path}`
		: "/fallback-avatar.jpg"

	return (
		<Link
			href={PAGES.PERSON(person.id)}
			className="flex p-4 border rounded-xl shadow-sm bg-card hover:bg-muted transition-colors gap-4 items-center group"
		>
			<div className="relative aspect-[2/3] shadow transition-transform duration-500 rounded-md  group-hover:scale-105 overflow-hidden w-30">
				<Image
					fallback="/fallback-avatar.jpg"
					sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
					src={image}
					alt={person.name}
				/>
			</div>
			<div className="flex flex-col">
				<span className="font-semibold text-lg leading-tight">
					{person.name}
				</span>
				<span className="text-sm text-muted-foreground">{role}</span>
			</div>
		</Link>
	)
}
