import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import { useTranslations } from "next-intl"

import { useRouter } from "@/src/i18n/navigation"
import { toast } from "sonner"
import { auth } from "../../config/firebase.config"
import { PAGES } from "../../config/pages.config"
import { deleteUserWithCollections } from "../../lib/deleteFirestoreCollection"

type DeleteAccountPayload = {
	password: string
}

export const useDeleteAccount = () => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const t = useTranslations("Toast")

	return useMutation({
		mutationFn: async ({ password }: DeleteAccountPayload) => {
			const user = auth.currentUser
			if (!user || !user.email) {
				return
			}

			const credential = EmailAuthProvider.credential(user.email, password)
			await reauthenticateWithCredential(user, credential)
			await deleteUserWithCollections(user.uid)
		},
		onSuccess: () => {
			router.replace(PAGES.HOME)
			toast.success(t("accountDelete"))
		},
		onSettled: () => {
			queryClient.removeQueries()
		},
	})
}
