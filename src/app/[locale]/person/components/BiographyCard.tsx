"use client"

import { Button } from "@/src/components/ui/button"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/src/components/ui/dialog"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { useTranslations } from "next-intl"
import { useState } from "react"

export const BiographyCard = ({ biography }: { biography?: string }) => {
	const [open, setOpen] = useState(false)
	const t = useTranslations("PersonPage")

	if (!biography || biography.trim() === "") {
		return (
			<Card className="bg-black/33 backdrop-blur-sm border-none">
				<CardContent>
					<p>{t("noData")}</p>
				</CardContent>
			</Card>
		)
	}

	const paragraphs = biography.split("\n").filter((p) => p.trim() !== "")
	const shortBio =
		paragraphs.length >= 2
			? `${paragraphs[0]} ${paragraphs[1]}`
			: paragraphs.slice(0, 200)

	return (
		<Card className="bg-black/33 backdrop-blur-sm border-none">
			<CardHeader>
				<CardTitle className="text-lg">{t("biography")}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="line-clamp-5 leading-relaxed text-zinc-200 whitespace-pre-line">
					{shortBio}
				</p>

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant="link" className="mt-3 p-0 h-auto font-normal">
							{t("showFull")}
						</Button>
					</DialogTrigger>

					<DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden rounded-2xl border-none backdrop-blur-2xl bg-black/33 shadow-2xl p-0">
						<DialogTitle className="sr-only">{t("biography")}</DialogTitle>
						<div className="p-6">
							<h3 className="text-xl font-bold mb-4">{t("biography")}</h3>
							<ScrollArea className="h-[60vh] pr-4">
								<p className="whitespace-pre-line text-zinc-200">{biography}</p>
							</ScrollArea>
						</div>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	)
}
