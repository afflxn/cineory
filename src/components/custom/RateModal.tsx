import { getRatingColorBg } from "@/src/shared/lib/getRatingColor"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog"

type Props = {
	open: boolean
	onClose: () => void
	initialRating?: number
	onSubmit: (rating: number) => void
	onRemove: () => void
	isPending: boolean
}

export const RateModal = ({
	open,
	onClose,
	onSubmit,
	onRemove,
	initialRating,
	isPending,
}: Props) => {
	const [rating, setRating] = useState(initialRating)

	const t = useTranslations("MediaRating")

	useEffect(() => {
		setRating(initialRating)
	}, [initialRating, open])

	const handleSubmit = () => {
		if (rating) {
			onSubmit(rating)
			onClose()
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-sm w-150">
				<DialogHeader>
					<DialogTitle className="flex justify-between items-center">
						{t("title")}
						<DialogClose asChild></DialogClose>
					</DialogTitle>
				</DialogHeader>

				<div
					className={clsx(
						"w-full h-16 flex items-center justify-center rounded-md text-white text-2xl font-bold transition-colors",
						getRatingColorBg(rating)
					)}
				>
					{rating && rating >= 0 ? rating : null}
				</div>

				<div className="flex justify-center mt-4 gap-1">
					{[...Array(10)].map((_, index) => {
						const value = index + 1
						return (
							<button
								key={value}
								onClick={() => setRating(value)}
								className="text-3xl transition"
							>
								<span
									className={
										rating && value <= rating
											? "text-yellow-400"
											: "text-gray-500"
									}
								>
									★
								</span>
							</button>
						)
					})}
				</div>

				<div className="flex justify-between mt-6">
					<Button variant="secondary" onClick={onClose}>
						{t("back")}
					</Button>
					{initialRating === rating ? (
						<Button disabled={isPending} onClick={onRemove}>
							{t("delete")}
						</Button>
					) : (
						<Button onClick={handleSubmit} disabled={isPending}>
							{initialRating ? t("change") : t("rate")}
						</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
