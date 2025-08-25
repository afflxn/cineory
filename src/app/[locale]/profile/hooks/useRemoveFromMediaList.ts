import { db } from "@/src/shared/config/firebase.config"
import { useAuthUser } from "@/src/shared/hooks/auth/useAuthUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteDoc, doc } from "firebase/firestore"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export const useRemoveFromMediaList = () => {
	const { data: user } = useAuthUser()
	const queryClient = useQueryClient()

	const t = useTranslations("Alert")

	return useMutation({
		mutationFn: async ({
			mediaId,
			type,
		}: {
			mediaId: number
			type: "movie" | "tv"
		}) => {
			if (!user?.uid) return

			const ref = doc(db, "users", user.uid, "mediaList", `${mediaId}-${type}`)
			await deleteDoc(ref)
		},
		onSuccess: () => toast.success(t("successDelete")),
		onError: () => toast.error(t("errorDelete")),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["mediaCategory"] })
			queryClient.invalidateQueries({ queryKey: ["mediaMap"] })
			queryClient.invalidateQueries({ queryKey: ["mediaIds"] })
		},
	})
}
