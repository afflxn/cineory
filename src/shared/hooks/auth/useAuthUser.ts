import { useQuery } from "@tanstack/react-query"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "../../config/firebase.config"

export const useAuthUser = () =>
	useQuery<User | null>({
		queryKey: ["auth-user"],
		staleTime: Infinity,
		queryFn: () =>
			new Promise<User | null>((resolve) => {
				const unsubscribe = onAuthStateChanged(auth, (user) => {
					resolve(user)
					unsubscribe()
				})
			}),
	})
