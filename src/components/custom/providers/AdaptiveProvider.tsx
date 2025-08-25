"use client"

import { useMobile } from "@/src/shared/hooks/useMobile"
import { ReactNode } from "react"
import { Footer } from "../layout/Footer"
import { Header } from "../layout/Header"
import { MobileHeader } from "../layout/MobileHeader"
import { MobileSearch } from "../layout/MobileSearch"

type Props = {
	children: ReactNode
}

export const AdaptiveProvider = ({ children }: Props) => {
	const isMobile = useMobile()

	return (
		<>
			<div className="min-h-screen flex flex-col">
				{isMobile ? <MobileSearch /> : <Header />}
				<main className="min-h-screen">{children}</main>
				<Footer />
			</div>
			{isMobile && <MobileHeader />}
		</>
	)
}
