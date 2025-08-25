"use client"

import { Link } from "@/src/i18n/navigation"
import { rawNavLinks } from "@/src/shared/constants/navLinks"
import { cn } from "@/src/shared/lib/utils"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export const NavLinks = () => {
	const pathname = usePathname()
	const t = useTranslations("Header.NavLink")

	const navLinks = rawNavLinks.map((link) => ({
		...link,
		name: t(`${link.name}`),
	}))

	return (
		<div className="p-1">
			{navLinks.map(({ path, name, icon }) => (
				<Link
					key={name}
					href={path}
					className={cn(
						"text-xl py-2 px-2 hover:bg-accent rounded-md flex items-center gap-3 text-foreground",
						{
							"text-primary": path === pathname,
						}
					)}
				>
					{icon}
					{name}
				</Link>
			))}
		</div>
	)
}
