import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signOut } from "firebase/auth"

import { useRouter } from "@/src/i18n/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { auth } from "../../config/firebase.config"
import { PAGES } from "../../config/pages.config"

export const useLogout = () => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const t = useTranslations("Toast")

	const { mutate: logout, isPending } = useMutation({
		mutationFn: () => signOut(auth),
		onSuccess: () => {
			toast.success(t("successLogout"))
			router.replace(PAGES.HOME)
		},
		onError: () => {
			toast.error(t("errorLogout"))
		},
		onSettled: () => {
			queryClient.removeQueries()
		},
	})

	return { logout, isPending }
}
