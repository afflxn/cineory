import { auth } from "@/src/shared/config/firebase.config"
import { useFirebaseErrorNotifier } from "@/src/shared/lib/errors"
import { UpdatePasswordFormData } from "@/src/shared/types/user"
import { useMutation } from "@tanstack/react-query"
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
} from "firebase/auth"
import { SubmitHandler, UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { useTranslations } from "use-intl"

type SecurityPayload = {
	oldPassword: string
	newPassword: string
}

type UseUpdatePasswordProps = {
	form: UseFormReturn<UpdatePasswordFormData>
}

export const useUpdatePassword = ({ form }: UseUpdatePasswordProps) => {
	const { setError, reset } = form

	const t = useTranslations("Toast")
	const { notifyFirebaseError } = useFirebaseErrorNotifier()

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ oldPassword, newPassword }: SecurityPayload) => {
			if (!auth.currentUser || !auth.currentUser.email) {
				toast.error(t("userNotFound"))
				return
			}
			const credential = EmailAuthProvider.credential(
				auth.currentUser.email,
				oldPassword
			)
			await reauthenticateWithCredential(auth.currentUser, credential)
			await updatePassword(auth.currentUser, newPassword)
		},
		onSuccess: () => toast.success(t("dataUpdated")),
		onError: (error) => notifyFirebaseError(error, false, { setError }),
	})
	const onSubmit: SubmitHandler<UpdatePasswordFormData> = (data) => {
		mutate({
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		})
		reset()
	}

	return { onSubmit, isPending }
}
