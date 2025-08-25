"use client"

import { useAuthUser } from "@/src/shared/hooks/auth/useAuthUser"

import { MediaType } from "@/src/shared/types/media"
import { AddToListSelect } from "./AddToListSelect"

type Props = {
	id: number
	mediaType: MediaType
	title: string
}

export const ClientAddToListSelect = ({ id, mediaType, title }: Props) => {
	const { data: auth } = useAuthUser()

	if (auth)
		return (
			<AddToListSelect
				id={id}
				type={mediaType === "movie" ? "movie" : "tv"}
				title={title}
			/>
		)
}
