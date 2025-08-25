import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useDeleteAccount } from "@/src/shared/hooks/auth/useDeleteAccount"
import { useTranslations } from "next-intl"
import { useState } from "react"

export const DeleteAccount = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const [password, setPassword] = useState("")
	const { mutate: deleteAccount, isPending } = useDeleteAccount()
	const t = useTranslations("Settings.delete")

	const handleDelete = () => {
		if (!password) return
		deleteAccount({ password })
	}

	return (
		<div className="space-y-4 p-10 border border-border rounded-2xl bg-background">
			{showConfirmDelete ? (
				<div className="space-y-4 max-w-sm mx-auto">
					<p className="text-center">{t("deleteConfirm")}</p>
					<div className="space-y-2">
						<Label htmlFor="password">{t("deletePass")}</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="flex justify-center gap-2 mt-4">
						<Button
							variant="default"
							className="bg-red-500 hover:bg-rose-700 transition-colors"
							onClick={handleDelete}
							disabled={isPending}
						>
							{isPending ? t("deletingBtn") : t("deleteBtn")}
						</Button>
						<Button
							variant="outline"
							onClick={() => setShowConfirmDelete(false)}
							disabled={isPending}
						>
							{t("deleteCancel")}
						</Button>
					</div>
				</div>
			) : (
				<div className="space-y-2 text-center">
					<h3 className="mb-5">{t("deletingAccount")}</h3>
					<Button
						variant="default"
						className="bg-red-500 transition-colors hover:bg-rose-700"
						onClick={() => setShowConfirmDelete(true)}
					>
						{t("deleteAccount")}
					</Button>
				</div>
			)}
		</div>
	)
}
