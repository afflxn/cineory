import { useRouter } from "@/src/i18n/navigation"
import { auth } from "@/src/shared/config/firebase.config"
import { PAGES } from "@/src/shared/config/pages.config"
import { useFirebaseErrorNotifier } from "@/src/shared/lib/errors"
import { LoginFormData } from "@/src/shared/types/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useTranslations } from "next-intl"

import { SubmitHandler, UseFormReturn } from "react-hook-form"

import { toast } from "sonner"

type UseLoginUserProps = {
	form: UseFormReturn<LoginFormData>
}

export const useLoginUser = ({ form }: UseLoginUserProps) => {
	const { setError } = form

	const router = useRouter()
	const queryClient = useQueryClient()

	const t = useTranslations("Toast")
	const { notifyFirebaseError } = useFirebaseErrorNotifier()

	const { mutate, isPending } = useMutation({
		mutationFn: (data: LoginFormData) =>
			signInWithEmailAndPassword(auth, data.email, data.password),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth-user"] }).then(() => {
				router.replace(PAGES.HOME)
			})
			toast.success(t("successLogin"))
		},
		onError: (error) => {
			notifyFirebaseError(error, false, { setError })
		},
		retry: false,
	})

	const onSubmit: SubmitHandler<LoginFormData> = (data) => mutate(data)
	return { onSubmit, isPending }
}
