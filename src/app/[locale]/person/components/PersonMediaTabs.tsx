"use client"

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/src/components/ui/tabs"

import { useMemo, useState } from "react"

import { ROLE_MAP } from "@/src/shared/constants/roleMap"
import { useMobile } from "@/src/shared/hooks/useMobile"
import { PersonMediaCredits } from "@/src/shared/types/credits"
import { useTranslations } from "next-intl"
import { getCountLabel } from "../helpers/getCountLabel"
import { getFilteredByRole } from "../helpers/getFilteredByRole"
import { PersonMediaTabsListItem } from "./PersonMediaTabsListItem"
import { RatingChart } from "./RatingChart"

export const PersonMediaTabs = ({ cast, crew }: PersonMediaCredits) => {
	const [activeRole, setActiveRole] = useState("cast")
	const isMobile = useMobile()
	const t = useTranslations("PersonPage")

	const tabFiltered = useMemo(
		() => getFilteredByRole(activeRole, cast, crew),
		[activeRole, cast, crew]
	)

	return (
		<div className="p-10">
			{!isMobile && (
				<div className="mt-6 bg-background rounded-xl border border-border p-4 shadow">
					<h3 className="text-xl font-semibold mb-2">{t("rating")}</h3>
					<RatingChart media={getFilteredByRole(activeRole, cast, crew)} />
				</div>
			)}

			<Tabs
				value={activeRole}
				onValueChange={setActiveRole}
				className="w-full mt-10"
			>
				<TabsList className="bg-background h-fit p-2 flex flex-wrap gap-2">
					{ROLE_MAP.map(({ key }) => (
						<TabsTrigger
							key={key}
							value={key}
							className="text-xl w-1/2 h-10 px-6 data-[state=active]:bg-primary cursor-pointer"
						>
							{t(key)} {getCountLabel(key, cast, crew)}
						</TabsTrigger>
					))}
				</TabsList>

				{ROLE_MAP.map(({ key }) => {
					return (
						<TabsContent key={key} value={key}>
							{tabFiltered.length === 0 ? (
								<div className="text-center rounded-xl p-9.5 bg-background shadow-sm ">
									{t("noData")}
								</div>
							) : (
								<ul>
									{tabFiltered.map((item, index) => (
										<PersonMediaTabsListItem
											key={`${item.id}-${key}-${index}`}
											item={item}
										/>
									))}
								</ul>
							)}
						</TabsContent>
					)
				})}
			</Tabs>
		</div>
	)
}
