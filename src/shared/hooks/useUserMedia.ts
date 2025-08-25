import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"

import { db } from "../config/firebase.config"
import { MediaListItem } from "../types/user"
import { useAuthUser } from "./auth/useAuthUser"

export const useUserMedia = (id: number, type: "movie" | "tv") => {
	const { data: user } = useAuthUser()
	const docId = `${id}-${type}`

	return useQuery<MediaListItem | null>({
		queryKey: ["mediaCategory", user?.uid, docId],
		queryFn: async () => {
			if (!user?.uid) return null

			const ref = doc(db, "users", user.uid, "mediaList", docId)
			const snapshot = await getDoc(ref)

			if (!snapshot.exists()) return null

			const data = snapshot.data() as MediaListItem
			return data
		},
	})
}
