import { Providers } from "@/src/components/custom/providers/Providers"
import { routing } from "@/src/i18n/routing"
import type { Metadata } from "next"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { Inter, Oswald } from "next/font/google"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import "../globals.css"

const oswald = Oswald({
	variable: "--font-oswald",
	subsets: ["latin"],
})

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin", "cyrillic"],
})

export const metadata: Metadata = {
	title: "Cineory",
}

export default async function Layout({
	children,
	params,
}: Readonly<{
	children: ReactNode
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	return (
		<html lang={locale}>
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className={`${oswald.variable} ${inter.variable} antialiased`}>
				<NextIntlClientProvider>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
