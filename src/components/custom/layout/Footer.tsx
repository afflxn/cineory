"use client"

import { Link } from "@/src/i18n/navigation"
import { useTranslations } from "next-intl"

export const Footer = () => {
	const t = useTranslations("Footer")

	return (
		<footer className="pt-10 pb-20 lg:pb-10 border-t border-border bg-background">
			<div className="container">
				<Link
					href="/"
					className="text-primary text-2xl font-bold font-logo"
				></Link>
				<p className="text-md text-center sm:text-start text-muted-foreground mt-1">
					{t("description")}
				</p>

				<div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground ">
					<p className="font-logo text-md">
						&copy; {new Date().getFullYear()} Cineory
					</p>
					<p className="mt-2 text-sm">{t("license")}</p>
				</div>
			</div>
		</footer>
	)
}
