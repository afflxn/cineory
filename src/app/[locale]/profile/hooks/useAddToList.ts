import { db } from "@/src/shared/config/firebase.config"
import { MediaCategory } from "@/src/shared/store/useProfileStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getAuth } from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export const useAddToList = (
	mediaId: number,
	type: "movie" | "tv",
	title: string
) => {
	const t = useTranslations("MediaCategories")
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (category: MediaCategory) => {
			const auth = getAuth()
			const user = auth.currentUser

			if (!user) return

			const docRef = doc(
				db,
				"users",
				user.uid,
				"mediaList",
				`${mediaId}-${type}`
			)

			await setDoc(docRef, {
				id: mediaId,
				type,
				category,
				title,
				addedAt: serverTimestamp(),
			})
		},
		onSuccess: () => toast.success(t("add")),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["mediaCategory"] })
			queryClient.invalidateQueries({ queryKey: ["mediaMap"] })
			queryClient.invalidateQueries({ queryKey: ["mediaIds"] })
		},
	})
}
