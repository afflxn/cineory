"use client"

import { categories } from "@/src/shared/constants/profileCategories"
import { useUserMedia } from "@/src/shared/hooks/useUserMedia"
import { MediaCategory } from "@/src/shared/store/useProfileStore"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { useAddToList } from "../../app/[locale]/profile/hooks/useAddToList"
import { useRemoveFromMediaList } from "../../app/[locale]/profile/hooks/useRemoveFromMediaList"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"

type Props = {
	id: number
	type: "movie" | "tv"
	title: string
}

export const AddToListSelect = ({ id, type, title }: Props) => {
	const { data, isPending: isDataPending } = useUserMedia(id, type)
	const { mutate: addToFolder, isPending: isAddPending } = useAddToList(
		id,
		type,
		title
	)
	const { mutate: removeMedia, isPending: isRemovePending } =
		useRemoveFromMediaList()

	const t = useTranslations("MediaCategories")

	const [localCategory, setLocalCategory] = useState<
		MediaCategory | undefined | null
	>(data?.category)

	useEffect(() => {
		if (!isDataPending) {
			setLocalCategory(data?.category)
		}
	}, [data?.category, isDataPending])

	const isPending = isDataPending || isRemovePending || isAddPending

	const handleValueChange = (value: MediaCategory | "remove") => {
		if (value === "remove") {
			removeMedia({ mediaId: id, type })
		} else {
			addToFolder(value)
		}
	}

	const selectedLabel = localCategory
		? t(categories.find((cat) => cat.key === data?.category)?.key ?? "add")
		: t("add")

	return (
		<Select
			defaultValue={localCategory || undefined}
			disabled={isPending}
			onValueChange={handleValueChange}
		>
			<SelectTrigger className="w-full bg-background">
				{selectedLabel}
			</SelectTrigger>
			<SelectContent>
				{categories.map((cat) => (
					<SelectItem key={cat.key} value={cat.key}>
						{t(cat.key)}
					</SelectItem>
				))}
				<div className="border-t my-1"></div>
				<SelectItem value="remove" className="text-rose-500">
					{t("delete")}
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
