"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import NextTopLoader from "nextjs-toploader"
import { ReactNode } from "react"
import { Toaster } from "sonner"
import { AdaptiveProvider } from "./AdaptiveProvider"
import { getQueryClient } from "./getQueryClient"

type Props = {
	children: ReactNode
}

export const Providers = ({ children }: Props) => {
	const queryClient = getQueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<AdaptiveProvider>{children}</AdaptiveProvider>
			<NextTopLoader height={3} color="hsl(32, 96%, 48%)" />
			<Toaster />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
