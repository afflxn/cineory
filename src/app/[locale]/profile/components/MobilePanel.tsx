import { Button } from "@/src/components/ui/button"
import { categories } from "@/src/shared/constants/profileCategories"
import { cn } from "@/src/shared/lib/utils"
import { useProfileStore } from "@/src/shared/store/useProfileStore"
import { useTranslations } from "next-intl"
import { MobileFilterBlock } from "./MobileFilterBlock"

type Props = {
	className?: string
}

export const MobilePanel = ({}: Props) => {
	const { category, setCategory } = useProfileStore()

	const t = useTranslations()
	return (
		<div className="lg:hidden sticky top-14 md:top-23 z-20 bg-background/90 backdrop-blur-md  mb-5">
			<div className="flex justify-between items-center py-3 overflow-x-auto scrollbar-none">
				<MobileFilterBlock />

				<Button
					onClick={() => setCategory("all")}
					variant={"ghost"}
					className={cn(
						"flex-shrink-0 text-sm px-4 py-2",
						category === "all" && "bg-muted"
					)}
				>
					{t("Profile.all")}
				</Button>
				{categories.map((cat) => (
					<Button
						key={cat.key}
						onClick={() => setCategory(cat.key)}
						variant={"ghost"}
						className={cn(
							"flex-shrink-0 text-sm px-4 py-2",
							category === cat.key && "bg-muted"
						)}
					>
						{t(`MediaCategories.${cat.key}`)}
					</Button>
				))}
			</div>
		</div>
	)
}
