import { auth } from "@/src/shared/config/firebase.config"
import { useMutation } from "@tanstack/react-query"
import { updateEmail } from "firebase/auth"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export type SecurityPayload = {
	email: string
}

export const useUpdateEmail = () => {
	const t = useTranslations("Toast")

	return useMutation({
		mutationFn: async ({ email }: SecurityPayload) => {
			if (!auth.currentUser || !auth.currentUser.email) {
				toast.error(t("userNotFound"))
				return
			}
			await updateEmail(auth.currentUser, email)
		},
		onSuccess: () => toast.success(t("dataUpdated")),
	})
}
