import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteField, doc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase.config"
import { useAuthUser } from "./auth/useAuthUser"

type Props = {
	mediaId: number
	type: "movie" | "tv"
}

export const useRemoveUserRating = () => {
	const { data: user } = useAuthUser()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ mediaId, type }: Props) => {
			if (!user?.uid) return

			const ref = doc(db, "users", user.uid, "mediaList", `${mediaId}-${type}`)
			await updateDoc(ref, {
				rating: deleteField(),
			})
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["mediaIds", user?.uid] })
			queryClient.invalidateQueries({ queryKey: ["mediaCategory"] })
		},
	})
}
