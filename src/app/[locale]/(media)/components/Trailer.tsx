"use client"

import { Image } from "@/src/components/custom/Image"
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog"
import { Videos } from "@/src/shared/types/media"
import { Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

type TrailerProps = {
	videos: Videos | null
}

export const Trailer = ({ videos }: TrailerProps) => {
	const [open, setOpen] = useState(false)
	const t = useTranslations("MediaPage")

	const trailer = videos?.results.filter(
		(v) => v.type === "Trailer" && v.site === "YouTube"
	)?.[0]

	if (!trailer) {
		return (
			<div className="flex-grow hidden lg:block">
				<p className="text-center">{t("trailer")}</p>
			</div>
		)
	}

	return (
		<div className="flex-grow w-full mx-auto hidden lg:block">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<button
						className={`group cursor-pointer relative w-full overflow-hidden rounded-lg border border-border aspect-[16/9] `}
					>
						<Image
							fallback="/fallback-backdrop.gif"
							src={`https://i.ytimg.com/vi/${trailer.key}/hqdefault.jpg`}
							alt="Trailer thumbnail"
							className="object-cover"
							sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
						/>

						<div className="absolute inset-0 flex items-center justify-center bg-black/33 backdrop-blur-sm lg:opacity-0 group-hover:opacity-100 transition-opacity">
							<Play size={48} className="text-primary drop-shadow-lg" />
						</div>
					</button>
				</DialogTrigger>

				<DialogContent className="overflow-hidden border-none bg-transparent p-0">
					<DialogTitle className="sr-only">trailer</DialogTitle>

					<iframe
						src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
						title="Trailer"
						className="aspect-video shadow-2xl bg-background h-full w-full rounded-2xl"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}
