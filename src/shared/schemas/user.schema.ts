import { useTranslations } from "next-intl"
import { z } from "zod"

export const useLoginSchema = () => {
	const t = useTranslations("Validation")
	return z.object({
		email: z.email(t("invalidEmail")),
		password: z.string().min(1, t("required")),
	})
}

export const useRegisterSchema = () => {
	const t = useTranslations("Validation")

	return z
		.object({
			email: z.email(t("invalidEmail")),
			displayName: z.string().min(3, t("minName", { count: 3 })),
			password: z.string().min(8, t("minPassword", { count: 8 })),
			confirmPassword: z.string().min(8, t("minPassword", { count: 8 })),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: t("passwordMismatch"),
			path: ["confirmPassword"],
		})
}

export const useRegisterFirebaseSchema = () => {
	const t = useTranslations("Validation")

	return z.object({
		email: z.email(t("invalidEmail")),
		password: z.string().min(8, t("minPassword", { count: 8 })),
		displayName: z.string().min(3, t("minName", { count: 3 })),
	})
}

export const useUpdatePasswordSchema = () => {
	const t = useTranslations("Validation")

	return z
		.object({
			oldPassword: z.string().min(1, t("required")),
			newPassword: z.string().min(8, t("minPassword", { count: 8 })),
			confirmPassword: z.string().min(8, t("minPassword", { count: 8 })),
		})
		.refine((data) => data.newPassword === data.confirmPassword, {
			message: t("passwordMismatch"),
			path: ["confirmPassword"],
		})
}
export const useUpdateEmailSchema = () => {
	const t = useTranslations("Validation")

	return z.object({
		email: z.email(t("invalidEmail")),
	})
}

export const useUpdateUserInfoSchema = () => {
	const t = useTranslations("Validation")

	return z.object({
		displayName: z
			.string()
			.min(3, t("minName", { count: 3 }))
			.optional(),
		gender: z.enum(["male", "female", "other"]).optional(),
		about: z.string().optional(),
	})
}
