import { db } from "@/src/shared/config/firebase.config"
import { UserData } from "@/src/shared/types/user"
import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"
import { toast } from "sonner"
import { useTranslations } from "use-intl"

export const usePublicUserProfile = (userId: string | undefined) => {
	const t = useTranslations("Alert")
	return useQuery({
		queryKey: ["publicUser", userId],
		queryFn: async () => {
			if (!userId) return
			const docRef = doc(db, "users", userId)
			const docSnap = await getDoc(docRef)
			if (!docSnap.exists()) toast.info(t("noUser"))
			return docSnap.data() as UserData
		},
		enabled: !!userId,
	})
}
