import { db } from "@/src/shared/config/firebase.config"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { doc, updateDoc } from "firebase/firestore"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export type UpdateUserInfoPayload = {
	uid: string
	displayName?: string
	gender?: "male" | "female" | "other"
	about?: string
}

export const useUpdateUserInfo = () => {
	const queryClient = useQueryClient()

	const t = useTranslations("Toast")

	return useMutation({
		mutationFn: async ({
			uid,
			displayName,
			about,
			gender,
		}: UpdateUserInfoPayload) => {
			const updateData: Partial<UpdateUserInfoPayload> = {}

			if (displayName) updateData.displayName = displayName
			if (gender) updateData.gender = gender
			updateData.about = about

			if (Object.keys(updateData).length > 0) {
				await updateDoc(doc(db, "users", uid), updateData)
			}
		},
		onSuccess: () => {
			toast.success(t("infoUpdated"))
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["user-data"] })
		},
	})
}
