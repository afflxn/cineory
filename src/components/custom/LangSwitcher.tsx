"use client"

import { Link } from "@/src/i18n/navigation"
import { useLocale } from "next-intl"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

export const LangSwitcher = () => {
	const locale = useLocale()
	const pathname = usePathname()

	return (
		<Link
			href={pathname.replace(locale, "")}
			locale={locale === "en" ? "ru" : "en"}
		>
			<Button size={"icon"} variant={"ghost"} className="">
				<div className="flex h-full justify-center items-center">
					{locale === "en" ? "RU" : "EN"}
				</div>
			</Button>
		</Link>
	)
}
