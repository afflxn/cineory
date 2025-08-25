"use client"
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"
import { toast } from "sonner"

type Props = {
	children: ReactNode
}

export const QueryProvider = ({ children }: Props) => {
	const t = useTranslations("Toast")

	const [queryClient] = useState(
		() =>
			new QueryClient({
				queryCache: new QueryCache({
					onError: (error: unknown) => {
						if (!navigator.onLine) {
							toast.error(t("error"))
						} else {
							console.error(error)
						}
					},
				}),
				mutationCache: new MutationCache({
					onError: (error: unknown) => {
						if (!navigator.onLine) {
							toast.error(t("error"))
						} else {
							console.error(error)
						}
					},
				}),
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: 1,
						staleTime: 3600,
					},
					mutations: {
						retry: 1,
					},
				},
			})
	)

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
