import { Timestamp } from "firebase/firestore"
import { z } from "zod"
import {
	useLoginSchema,
	useRegisterFirebaseSchema,
	useRegisterSchema,
	useUpdateEmailSchema,
	useUpdatePasswordSchema,
	useUpdateUserInfoSchema,
} from "../schemas/user.schema"
import { MediaCategory } from "../store/useProfileStore"

export type LoginFormData = z.infer<ReturnType<typeof useLoginSchema>>
export type RegisterFormData = z.infer<ReturnType<typeof useRegisterSchema>>
export type RegisterFirebaseData = z.infer<
	ReturnType<typeof useRegisterFirebaseSchema>
>
export type UpdatePasswordFormData = z.infer<
	ReturnType<typeof useUpdatePasswordSchema>
>
export type UpdateEmailFormData = z.infer<
	ReturnType<typeof useUpdateEmailSchema>
>
export type UpdateUserInfoFormData = z.infer<
	ReturnType<typeof useUpdateUserInfoSchema>
>

export type UserData = {
	uid: string
	email: string
	displayName: string
	createdAt: string
	avatarUrl?: string
	gender?: "male" | "female" | "other"
	about?: string
}

export type MediaListItem = {
	id: number
	type: "movie" | "tv"
	category: MediaCategory
	addedAt: Timestamp
	rating?: number
}
