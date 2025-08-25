import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useUpdatePasswordSchema } from "@/src/shared/schemas/user.schema"
import { UpdatePasswordFormData } from "@/src/shared/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { useUpdatePassword } from "../hooks/useUpdatePassword"

export const UpdatePassword = () => {
	const updatePasswordSchema = useUpdatePasswordSchema()
	const form = useForm<UpdatePasswordFormData>({
		resolver: zodResolver(updatePasswordSchema),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form

	const { onSubmit, isPending } = useUpdatePassword({ form })

	const t = useTranslations("Settings.change")

	return (
		<Card>
			<CardContent>
				<h2 className="text-lg font-semibold mb-5 text-center">
					{t("password")}
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4 text-center"
				>
					<div className="space-y-2">
						<Label htmlFor="oldPassword">{t("oldPassword")}</Label>
						<Input
							id="oldPassword"
							type="password"
							autoComplete="password"
							{...register("oldPassword")}
						/>
						{errors.oldPassword && (
							<p className="text-red-500 text-sm">
								{errors.oldPassword.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="newPassword">{t("newPassword")}</Label>
						<Input
							id="newPassword"
							type="password"
							autoComplete="new-password"
							{...register("newPassword")}
						/>
						{errors.newPassword && (
							<p className="text-red-500 text-sm">
								{errors.newPassword.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
						<Input
							id="confirmPassword"
							type="password"
							autoComplete="new-password"
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm">
								{errors.confirmPassword.message}
							</p>
						)}
						{errors.root && (
							<p className="text-red-500 text-sm">{errors.root.message}</p>
						)}
					</div>
					<Button type="submit" className="w-[150px]" disabled={isPending}>
						{isPending ? t("updating") : t("update")}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
