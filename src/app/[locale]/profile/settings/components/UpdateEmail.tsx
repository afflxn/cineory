import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useUpdateEmailSchema } from "@/src/shared/schemas/user.schema"
import { UpdateEmailFormData } from "@/src/shared/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { useUpdateEmail } from "../hooks/useUpdateEmail"

export const UpdateEmail = () => {
	const updateEmailSchema = useUpdateEmailSchema()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpdateEmailFormData>({ resolver: zodResolver(updateEmailSchema) })

	const { mutate, isPending } = useUpdateEmail()
	const t = useTranslations("Settings.change")

	const onSubmit = (data: UpdateEmailFormData) => {
		mutate({
			email: data.email,
		})
		reset()
	}

	return (
		<Card>
			<CardContent>
				<h2 className="text-lg font-semibold mb-5 text-center">{t("email")}</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4 text-center"
				>
					<div className="space-y-2">
						<Label htmlFor="email">{t("emailInput")}</Label>
						<Input
							id="email"
							type="email"
							autoComplete="email"
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email.message}</p>
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
