import { Link } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { Image } from "./Image"

export const PersonWithTooltip = ({
	person,
}: {
	person: { id: number; name: string; profile_path?: string; job?: string }
}) => {
	return (
		<div className="group relative inline-block mr-2">
			<Link
				href={PAGES.PERSON(person.id)}
				className="block cursor-pointer border-primary/40 hover:text-primary transition-colors text-sm sm:text-base lg:text-lg"
			>
				{person.name}
			</Link>
			<div
				className="hidden md:block pointer-events-none absolute top-full z-50 mt-3 min-w-72 max-w-xs lg:-translate-x-1/2
						opacity-0 rounded-2xl border border-white/10 bg-background shadow-xl
						ring-1 ring-white/5 transition-[opacity,transform] duration-1000
						md:group-hover:pointer-events-auto md:group-hover:opacity-100"
			>
				<div className="flex gap-4 p-5">
					<div className="relative aspect-[2/3] w-30 flex-shrink-0 rounded-xl object-cover overflow-hidden">
						{person.profile_path ? (
							<Image
								fallback="/fallback-avatar.jpg"
								src={`${TMDB_IMAGE_BASE}w185${person.profile_path}`}
								alt={person.name}
								className="object-cover"
								sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
							/>
						) : (
							<div className="w-full h-full  grid place-content-center">
								<span className="text-2xl font-semibold bg-gray-700 p-10 rounded-full w-30 h-30 grid place-content-center text-gray-300">
									{person.name.charAt(0)}
								</span>
							</div>
						)}
					</div>

					<div className="self-center">
						<h3 className="text-lg font-semibold text-white whitespace-normal break-words">
							{person.name}
						</h3>
						{person.job && (
							<p className="mt-1 text-sm text-gray-400">{person.job}</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
