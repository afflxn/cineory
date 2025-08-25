"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "../components/ui/button"

import Link from "next/link"
import { PAGES } from "../shared/config/pages.config"
import "./globals.css"

const GlobalNotFound = () => {
	const params = usePathname()
	const locale = params.split("/")[1]

	const messages =
		locale === "en"
			? { mainText: "Oops! Page not found", link: "Return to Home" }
			: { mainText: "Упс! Страница не найдена", link: "Вернуться на главную" }

	return (
		<html lang={locale}>
			<body>
				<div className="min-h-screen flex items-center justify-center bg-background">
					<div className="text-center">
						<h1 className="text-4xl font-bold mb-4">404</h1>
						<p className="text-xl text-gray-600 mb-4">{messages.mainText}</p>
						<Button className="p-5 m-10">
							<Link href={PAGES.HOME}>{messages.link}</Link>
						</Button>

						<Image
							width={1280}
							height={720}
							src="/fallback-backdrop.gif"
							alt="not-found"
						/>
					</div>
				</div>
			</body>
		</html>
	)
}

export default GlobalNotFound
