// hooks/useSetMediaRating.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase.config"
import { useAuthUser } from "./auth/useAuthUser"

export const useSetMediaRating = (
	mediaId: number,
	mediaType: "movie" | "tv"
) => {
	const { data: user } = useAuthUser()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (rating: number) => {
			if (!user?.uid) return

			const ref = doc(
				db,
				"users",
				user.uid,
				"mediaList",
				`${mediaId}-${mediaType}`
			)
			const snapshot = await getDoc(ref)
			if (snapshot.exists()) {
				await updateDoc(ref, { rating })
				return
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["mediaIds", user?.uid] })
			queryClient.invalidateQueries({ queryKey: ["mediaCategory"] })
		},
	})
}
