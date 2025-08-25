import { db } from "@/src/shared/config/firebase.config"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { doc, updateDoc } from "firebase/firestore"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

type Params = {
	url: string
	uid: string
}

export const useAvatarUrl = () => {
	const queryClient = useQueryClient()

	const t = useTranslations("Toast")
	return useMutation({
		mutationFn: ({ uid, url }: Params) =>
			updateDoc(doc(db, "users", uid), { avatarUrl: url }),
		onSuccess: () => {
			toast.success(t("avatarUpdated"))
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["user-data"] })
		},
	})
}
