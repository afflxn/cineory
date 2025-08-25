import { useRouter } from "@/src/i18n/navigation"
import { auth } from "@/src/shared/config/firebase.config"
import { createUserDocument } from "@/src/shared/lib/createUserDocument"
import { useFirebaseErrorNotifier } from "@/src/shared/lib/errors"
import { RegisterFirebaseData, RegisterFormData } from "@/src/shared/types/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useTranslations } from "next-intl"

import { SubmitHandler, UseFormReturn } from "react-hook-form"

import { toast } from "sonner"

type UseRegisterUserProps = {
	form: UseFormReturn<RegisterFormData>
}

export const useRegisterUser = ({ form }: UseRegisterUserProps) => {
	const { setError } = form

	const router = useRouter()
	const queryClient = useQueryClient()

	const t = useTranslations("Toast")
	const { notifyFirebaseError } = useFirebaseErrorNotifier()

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: RegisterFirebaseData) => {
			const credential = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			)
			await updateProfile(credential.user, { displayName: data.displayName })
			await createUserDocument(credential.user)
			return credential
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth-user"] }).then(() => {
				router.replace("/login")
				toast.success(t("successRegister"))
			})
		},
		onError: (error) => {
			notifyFirebaseError(error, false, { setError })
		},
		retry: false,
	})

	const onSubmit: SubmitHandler<RegisterFormData> = (data) => mutate(data)
	return { onSubmit, isPending }
}
