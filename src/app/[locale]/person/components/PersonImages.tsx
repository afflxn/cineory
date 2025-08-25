"use client"

import { Skeleton } from "@/src/components/ui/skeleton"

import { Image } from "@/src/components/custom/Image"
import { TMDB_IMAGE_BASE } from "@/src/shared/constants/variables"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { usePersonImages } from "../hooks/usePersonImages"

export const PersonImages = ({ id }: { id: number }) => {
	const [showAll, setShowAll] = useState(false)
	const { images, isPending, error } = usePersonImages(id)
	const t = useTranslations("PersonPage")

	if (isPending || !images || images.length <= 1)
		return <Skeleton className="h-1/2 w-1/6" />

	if (error) {
		return <Skeleton className="h-1/2 w-1/6" />
	}

	const filteredImages = images.slice(1)
	const displayedImages = showAll ? filteredImages : filteredImages.slice(0, 5)

	return (
		<div className="space-y-4 p-2.5">
			<h2 className="text-center lg:text-start text-xl font-bold">
				{t("photo")}
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{displayedImages.map((img) => (
					<div
						key={img.file_path}
						className="relative overflow-hidden rounded-2xl border border-border shadow-md aspect-[2/3]"
					>
						<Image
							fallback="/fallback-avatar.jpg"
							src={`${TMDB_IMAGE_BASE}w500${img.file_path}`}
							alt="Person"
							className="object-cover"
							sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
						/>
					</div>
				))}
			</div>
			{filteredImages.length > 5 && (
				<button
					onClick={() => setShowAll((prev) => !prev)}
					className="mt-2 text-sm text-primary cursor-pointer hover:underline"
				>
					{showAll ? t("hide") : t("showAll")}
				</button>
			)}
		</div>
	)
}
