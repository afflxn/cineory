import { Image } from "@/src/components/custom/Image"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Skeleton } from "@/src/components/ui/skeleton"
import { useUserData } from "@/src/shared/hooks/auth/useUserData"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"
import { useAvatarUrl } from "../hooks/useAvatarUrl"

export const AvatarUrlEditor = () => {
	const { data: userData, isPending: isUserPending } = useUserData()
	const { mutate, isPending } = useAvatarUrl()
	const [url, setUrl] = useState(userData?.avatarUrl || "")

	const t = useTranslations("Settings.avatar")

	if (!userData || isUserPending) return <Skeleton />
	const uid = userData.uid

	const isValidImageUrl = (url: string) =>
		/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(url)

	const handleSave = () => {
		if (!isValidImageUrl(url)) {
			toast.error(t("avatarErr"))
			return
		}
		mutate({ url, uid })
	}

	return (
		<Card>
			<CardContent>
				<h2 className="text-lg font-semibold mb-5 text-center">
					{t("avatarChange")}
				</h2>
				<div className="flex gap-2 items-center space-y-2 flex-col">
					<div className="relative rounded border border-border overflow-hidden w-40 h-40">
						<Image
							alt="profile_picture"
							className="object-cover object-top"
							src={userData?.avatarUrl}
							width={160}
							height={160}
							fill={false}
							fallback="/fallback-avatar.jpg"
						/>
					</div>
					<Input
						type="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						placeholder={t("avatarPlaceholder")}
					/>
					<Button
						className="w-[150px]"
						onClick={handleSave}
						disabled={isPending || !url || !uid}
					>
						{isPending ? t("avatarSaving") : t("avatarSave")}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
