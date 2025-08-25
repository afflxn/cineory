import { FormattedMediaData } from "@/src/shared/types/media"
import { Rating } from "./Rating"

type Props = {
	mediaDetails: FormattedMediaData
}

export const MediaHeader = ({ mediaDetails }: Props) => {
	const { vote, voteCount, originalTitle, title } = mediaDetails

	return (
		<div className="col-start-2 col-end-5 row-end-2">
			<div className="flex flex-row justify-between gap-4 relative">
				<div>
					<h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
						{title}
					</h1>
					<h2 className="text-lg sm:text-2xl text-gray-200 italic">
						{originalTitle}
					</h2>
				</div>
				<Rating rating={vote} voteCount={voteCount} />
			</div>
		</div>
	)
}
