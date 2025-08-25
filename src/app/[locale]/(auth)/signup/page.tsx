"use client"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Link } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { useRegisterSchema } from "@/src/shared/schemas/user.schema"
import { RegisterFormData } from "@/src/shared/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { useRegisterUser } from "../hooks/useRegisterUser"

const RegisterPage = () => {
	const registerSchema = useRegisterSchema()

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		mode: "onChange",
	})
	const { onSubmit, isPending } = useRegisterUser({ form })
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form

	const t = useTranslations("Auth")

	return (
		<div className="flex pb-50 items-center justify-center h-screen ">
			<div className="bg-background/95 backdrop-blur-lg p-8  rounded-2xl shadow-xl w-full max-w-md">
				<h2 className="text-2xl font-bold text-white mb-6 text-center">
					{t("signup")}
				</h2>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<Input
						{...register("email")}
						type="email"
						placeholder="Email"
						autoComplete="email"
					/>
					{errors.email && (
						<p className="text-red-500 text-sm">{errors.email.message}</p>
					)}
					<Input
						{...register("displayName")}
						type="text"
						placeholder={t("username")}
						autoComplete="username"
					/>
					{errors.displayName && (
						<p className="text-red-500 text-sm">{errors.displayName.message}</p>
					)}
					<Input
						{...register("password")}
						type="password"
						placeholder={t("password")}
						autoComplete="new-password"
					/>
					{errors.password && (
						<p className="text-red-500 text-sm">{errors.password.message}</p>
					)}
					<Input
						{...register("confirmPassword")}
						type="password"
						placeholder={t("repeatPassword")}
						autoComplete="new-password"
					/>
					{errors.confirmPassword && (
						<p className="text-red-500 text-sm">
							{errors.confirmPassword.message}
						</p>
					)}
					<Button disabled={isPending} type="submit" className="w-full">
						{t("btnUp")}
					</Button>
					{errors.root && (
						<p className="text-red-500 text-sm text-center">
							{errors.root.message}
						</p>
					)}
					<div className="text-center">
						<p className="text-sm text-gray-400">
							{t("descrUp")}{" "}
							<Link
								href={PAGES.LOGIN}
								className="text-primary hover:underline cursor-pointer"
							>
								{t("descrUpLink")}
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegisterPage
