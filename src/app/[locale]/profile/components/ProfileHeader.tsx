import { Image } from "@/src/components/custom/Image"
import { Button } from "@/src/components/ui/button"
import { Link } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { useProfileStore } from "@/src/shared/store/useProfileStore"
import { UserData } from "@/src/shared/types/user"
import { useTranslations } from "next-intl"

type Props = {
	user: UserData | undefined
}

export const ProfileHeader = ({ user }: Props) => {
	const { isOwner } = useProfileStore()
	const t = useTranslations("")
	return (
		<div className="flex flex-col md:flex-row gap-5 justify-between p-5 items-center  border border-border rounded-xl mt-5 bg-background shadow-sm">
			<div className="flex flex-col md:flex-row items-center md:items-start gap-5 w-full">
				<div className="relative overflow-hidden rounded border border-border aspect-square w-24 h-24 md:w-25 md:h-25 shrink-0">
					<Image
						className="object-cover object-top"
						fallback="/fallback-avatar.jpg"
						width={160}
						height={160}
						fill={false}
						src={user?.avatarUrl}
						alt="avatar"
					/>
				</div>

				<div className="text-center md:text-left space-y-1 break-words max-w-full">
					<div className="text-xl font-semibold">{user?.displayName}</div>

					{user?.about && (
						<div className="text-sm text-muted-foreground break-words">
							{user.about}
						</div>
					)}

					{user?.gender && (
						<div className="text-sm text-muted-foreground">
							<span>{t(`Settings.info.sex`)}: </span>
							{t(`Settings.info.${user.gender}`)}
						</div>
					)}
				</div>
			</div>

			{isOwner && (
				<Link
					href={PAGES.PROFILE_SETTINGS}
					className="w-full flex justify-center md:w-auto"
				>
					<Button variant="outline" className="w-2/3 md:w-auto h-10 rounded-xl">
						{t("Profile.settings")}
					</Button>
				</Link>
			)}
		</div>
	)
}
