"use client"

import { useAuthUser } from "@/src/shared/hooks/auth/useAuthUser"
import { useProfileStore } from "@/src/shared/store/useProfileStore"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { ProfileContent } from "../components/ProfileContent"
import { ProfileHeader } from "../components/ProfileHeader"
import { ProfileSidePanel } from "../components/ProfileSidePanel"
import { usePublicUserProfile } from "../hooks/usePublicUserProfile"
import { MobilePanel } from "./MobilePanel"

const ProfilePage = () => {
	const { uid } = useParams()

	const { data: currentUser } = useAuthUser()
	const { data: user, isPending } = usePublicUserProfile(`${uid}`)
	const { setIsOwner } = useProfileStore()

	const t = useTranslations("Profile")

	useEffect(() => {
		setIsOwner(currentUser?.uid === uid)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid, currentUser?.uid])

	if (!user && !isPending)
		return <div className="text-center text-4xl p-50">{t("notFound")}</div>

	return (
		<div className="container min-h-screen mb-5 p-2">
			<ProfileHeader user={user} />
			<div className="mt-5 relative lg:flex gap-5 lg:justify-between">
				<ProfileSidePanel />
				<MobilePanel />
				<ProfileContent uid={`${uid}`} />
			</div>
		</div>
	)
}
export default ProfilePage
