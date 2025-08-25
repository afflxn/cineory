import { Button } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import { categories } from "@/src/shared/constants/profileCategories"
import { cn } from "@/src/shared/lib/utils"
import { useProfileStore } from "@/src/shared/store/useProfileStore"
import { useTranslations } from "next-intl"

export const ProfileSidePanel = () => {
	const {
		category,
		sortBy,
		sortType,
		view,
		setCategory,
		setSortBy,
		setSortType,
		setView,
		hasHydrated,
	} = useProfileStore()

	const t = useTranslations()

	if (!hasHydrated) {
		return <div className="w-70 h-215" />
	}

	return (
		<aside className="hidden lg:block w-70 max-h-215 flex-shrink-0 sticky top-25 border px-2 py-6 space-y-2 bg-background rounded-2xl">
			<div className="space-y-3">
				<h2 className="text-lg text-muted-foreground font-light px-5">
					{t("Profile.lists")}
				</h2>
				<ul className="space-y-1">
					<li>
						<Button
							onClick={() => setCategory("all")}
							variant={"ghost"}
							className={`w-full h-10 flex justify-between text-lg font-light hover:bg-muted mb-1 ${
								"all" === category && "bg-muted"
							}`}
						>
							{t("Profile.all")}
						</Button>
					</li>
					{categories.map((cat) => (
						<li key={cat.key}>
							<Button
								onClick={() => setCategory(cat.key)}
								variant={"ghost"}
								className={`w-full h-10 flex justify-between text-lg font-light hover:bg-muted mb-1 ${
									cat.key === category && "bg-muted"
								}`}
							>
								{t(`MediaCategories.${cat.key}`)}
							</Button>
						</li>
					))}
				</ul>

				<Separator />

				<h2 className="text-lg text-muted-foreground font-light px-5">
					{t("Profile.view")}
				</h2>
				<div className="space-y-1 flex flex-col">
					<Button
						onClick={() => setView("grid")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							view === "grid" && "bg-muted"
						)}
					>
						{t("Profile.tile")}
					</Button>
					<Button
						onClick={() => setView("list")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							view === "list" && "bg-muted"
						)}
					>
						{t("Profile.list")}
					</Button>
				</div>

				<Separator />

				<h2 className="text-lg text-muted-foreground font-light px-5">
					{t("Profile.sort")}
				</h2>
				<div className="flex flex-col">
					<Button
						onClick={() => setSortBy("title")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							sortBy === "title" && "bg-muted"
						)}
					>
						{t("Profile.byName")}
					</Button>
					<Button
						onClick={() => setSortBy("addedAt")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							sortBy === "addedAt" && "bg-muted"
						)}
					>
						{t("Profile.byDate")}
					</Button>
				</div>

				<Separator />
				<div className="flex flex-col">
					<Button
						onClick={() => setSortType("asc")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							sortType === "asc" && "bg-muted"
						)}
					>
						{t("Profile.asc")}
					</Button>
					<Button
						onClick={() => setSortType("desc")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							sortType === "desc" && "bg-muted"
						)}
					>
						{t("Profile.desc")}
					</Button>
				</div>
			</div>
		</aside>
	)
}
