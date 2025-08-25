"use client"

import { useAuthUser } from "@/src/shared/hooks/auth/useAuthUser"
import { useRemoveUserRating } from "@/src/shared/hooks/useRemoveUserRating"
import { useSetMediaRating } from "@/src/shared/hooks/useSetMediaRating"
import { useUserMedia } from "@/src/shared/hooks/useUserMedia"
import { getRatingColorBg } from "@/src/shared/lib/getRatingColor"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { RateModal } from "./RateModal"

type Props = {
	mediaId: number
	type: "movie" | "tv"
}

export const MediaRatingControl = ({ mediaId, type }: Props) => {
	const [open, setOpen] = useState(false)
	const { mutate: setRating, isPending: isSetPending } = useSetMediaRating(
		mediaId,
		type
	)
	const { data, isFetched } = useUserMedia(mediaId, type)
	const { mutate: removeRating, isPending: isRemovePending } =
		useRemoveUserRating()
	const { data: user } = useAuthUser()

	const t = useTranslations("MediaRating")

	const ratingColor = getRatingColorBg(data?.rating)

	const handleOpen = () => {
		if (!data) {
			toast(t("add"))
			return
		}
		setOpen(true)
	}

	return (
		<>
			{!user ? null : !data?.rating && isFetched ? (
				<Button
					className="absolute z-100 top-3 right-2 py-6 bg-secondDark border border-border hover:bg-background"
					onClick={handleOpen}
					variant="ghost"
					size="sm"
				>
					{t("rate")}
				</Button>
			) : (
				data && (
					<Button
						onClick={handleOpen}
						variant={"ghost"}
						className={`absolute top-3 right-2 ${ratingColor} rounded-lg border border-border text-center px-4 text-2xl py-6`}
					>
						{data.rating}
					</Button>
				)
			)}

			<RateModal
				open={open}
				initialRating={data?.rating}
				isPending={isSetPending || isRemovePending}
				onClose={() => setOpen(false)}
				onSubmit={setRating}
				onRemove={() => {
					removeRating({ mediaId, type })
					setOpen(false)
				}}
			/>
		</>
	)
}
