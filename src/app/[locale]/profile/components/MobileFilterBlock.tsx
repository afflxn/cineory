"use client"

import { Button } from "@/src/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog"
import { Separator } from "@/src/components/ui/separator"
import { useProfileStore } from "@/src/shared/store/useProfileStore"
import { AlignJustify } from "lucide-react"

import { useTranslations } from "next-intl"
import { useState } from "react"

export const MobileFilterBlock = ({}) => {
	const [open, setOpen] = useState(false)
	const { sortBy, sortType, view, setSortBy, setSortType, setView } =
		useProfileStore()
	const t = useTranslations("Profile")

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="size-10 mr-2">
					<AlignJustify />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-3xs">
				<DialogHeader>
					<DialogTitle>{t("sort")}</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					<div>
						<div className="flex flex-col gap-1">
							<Button
								variant={sortBy === "title" ? "default" : "ghost"}
								className="justify-start"
								onClick={() => setSortBy("title")}
							>
								{t("byName")}
							</Button>
							<Button
								variant={sortBy === "addedAt" ? "default" : "ghost"}
								className="justify-start"
								onClick={() => setSortBy("addedAt")}
							>
								{t("byDate")}
							</Button>
						</div>
					</div>

					<Separator />

					<div>
						<div className="flex flex-col gap-1">
							<Button
								size={"sm"}
								variant={sortType === "asc" ? "default" : "ghost"}
								className="justify-start"
								onClick={() => setSortType("asc")}
							>
								{t("asc")}
							</Button>
							<Button
								variant={sortType === "desc" ? "default" : "ghost"}
								className="justify-start"
								onClick={() => setSortType("desc")}
							>
								{t("desc")}
							</Button>
						</div>
					</div>
					<div>
						<p className="text-sm font-medium mb-2">{t("view")}</p>
						<div className="flex gap-2">
							<Button
								variant={view === "grid" ? "default" : "ghost"}
								onClick={() => setView("grid")}
							>
								{t("tile")}
							</Button>
							<Button
								variant={view === "list" ? "default" : "ghost"}
								onClick={() => setView("list")}
							>
								{t("list")}
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
