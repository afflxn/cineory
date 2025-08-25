import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
	title: "SignIn",
}

export default async function Layout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return children
}
