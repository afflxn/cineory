import { FirebaseError } from "firebase/app"
import { useTranslations } from "next-intl"
import { FieldValues, UseFormSetError } from "react-hook-form"
import { toast } from "sonner"

const firebaseErrorKeys: Record<string, string> = {
	"auth/email-already-in-use": "auth.emailAlreadyInUse",
	"auth/invalid-email": "auth.invalidEmail",
	"auth/user-not-found": "auth.userNotFound",
	"auth/missing-password": "auth.missingPassword",
	"auth/operation-not-allowed": "auth.operationNotAllowed",
	"auth/invalid-credential": "auth.invalidCredential",
	"auth/invalid-verification-code": "auth.invalidVerificationCode",
	"auth/invalid-verification-id": "auth.invalidVerificationId",
	"auth/missing-verification-id": "auth.missingVerificationId",
	"auth/invalid-user-token": "auth.invalidUserToken",
}

type MaybeSetError<TFieldValues extends FieldValues> =
	| UseFormSetError<TFieldValues>
	| null
	| undefined

export const useFirebaseErrorNotifier = () => {
	const t = useTranslations("Errors")

	const notifyFirebaseError = <TFieldValues extends FieldValues>(
		error: unknown,
		shouldToast = true,
		options?: { setError?: MaybeSetError<TFieldValues> }
	): string => {
		let message = t("unknown")

		if (
			typeof error === "object" &&
			error !== null &&
			"code" in error &&
			"name" in error &&
			(error as FirebaseError).name === "FirebaseError"
		) {
			const firebaseError = error as FirebaseError
			const firebaseCode = firebaseError.code
			const key = firebaseErrorKeys[firebaseCode]

			if (key) {
				message = t(key)
			}

			const setError = options?.setError
			if (setError) {
				setError("root", { type: "manual", message })
			}
		} else if (error instanceof Error) {
			message = error.message
		}

		if (shouldToast) {
			toast.error(message)
		}

		return message
	}

	return { notifyFirebaseError }
}
