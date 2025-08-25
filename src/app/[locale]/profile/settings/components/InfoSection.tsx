import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/components/ui/select"
import { Skeleton } from "@/src/components/ui/skeleton"
import { Textarea } from "@/src/components/ui/textarea"
import { useUserData } from "@/src/shared/hooks/auth/useUserData"
import { useUpdateUserInfoSchema } from "@/src/shared/schemas/user.schema"
import { UpdateUserInfoFormData } from "@/src/shared/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useUpdateUserInfo } from "../hooks/useUpdateUserInfo"

export const InfoSection = () => {
	const updateUserInfoSchema = useUpdateUserInfoSchema()
	const { data: userData, isPending: isUserPending } = useUserData()
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(updateUserInfoSchema),
	})

	const { mutate, isPending } = useUpdateUserInfo()

	const t = useTranslations("Settings.info")

	useEffect(() => {
		if (userData) {
			reset({
				displayName: userData.displayName || "",
				gender: userData.gender || "other",
				about: userData.about || "",
			})
		}
	}, [userData, reset])

	if (!userData || isUserPending) return <Skeleton />
	const uid = userData.uid

	const onSubmit = (data: UpdateUserInfoFormData) => {
		mutate({
			uid,
			...data,
		})
		reset(data)
	}

	return (
		<Card>
			<CardContent>
				<h2 className="text-lg font-semibold mb-5 text-center">{t("info")}</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="displayName">{t("username")}</Label>
						<Input
							{...register("displayName")}
							id="displayName"
							autoComplete="username"
						/>
						{errors.displayName && (
							<p className="text-red-500 text-sm">
								{errors.displayName.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="gender">{t("sex")}</Label>
						<Select
							{...register("gender")}
							defaultValue={userData?.gender || "other"}
							onValueChange={(value: "other" | "male" | "female") =>
								setValue("gender", value)
							}
						>
							<SelectTrigger id="gender">
								<SelectValue placeholder={t("genderPlaceholder")} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="other">{t("other")}</SelectItem>
								<SelectItem value="male">{t("male")}</SelectItem>
								<SelectItem value="female">{t("female")}</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="about">{t("about")}</Label>
						<Textarea
							{...register("about")}
							id="about"
							className="min-h-35"
							placeholder={t("aboutPlaceholder")}
							maxLength={100}
						/>
						{errors.about && (
							<p className="text-red-500 text-sm">{errors.about.message}</p>
						)}
					</div>
					<Button disabled={isPending}>{t("update")}</Button>
				</form>
			</CardContent>
		</Card>
	)
}
