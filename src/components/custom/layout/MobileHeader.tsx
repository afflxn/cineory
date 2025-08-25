import { Button } from "@/src/components/ui/button"

import { ArrowRight, LogOut, Menu, Settings } from "lucide-react"

import { Link } from "@/src/i18n/navigation"
import { PAGES } from "@/src/shared/config/pages.config"
import { useAuthUser } from "@/src/shared/hooks/auth/useAuthUser"
import { useLogout } from "@/src/shared/hooks/auth/useLogout"
import { useUserData } from "@/src/shared/hooks/auth/useUserData"
import { useTranslations } from "next-intl"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../../ui/sheet"
import { Skeleton } from "../../ui/skeleton"
import { Image } from "../Image"
import { LangSwitcher } from "../LangSwitcher"
import { NavLinks } from "./NavLinks"

export const MobileHeader = () => {
	const { data: authUser, isFetched: isAuthFetched } = useAuthUser()
	const { data: user } = useUserData()
	const { logout, isPending } = useLogout()
	const t = useTranslations("Header")

	return (
		<div className="fixed bg-background bottom-0 left-0 right-0 z-100 border-t border-border">
			<div className="container py-3">
				<div className="flex items-center justify-center">
					<div className="text-xl font-bold text-primary">Cineory</div>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="mt-0.5">
								<Menu />
							</Button>
						</SheetTrigger>

						<SheetContent
							side="right"
							className="flex flex-col  justify-between z-1000"
						>
							<div className="flex flex-col flex-1 justify-center gap-5 items-center">
								<SheetHeader className="sr-only">
									<SheetTitle className="sr-only">{t("menu")}</SheetTitle>
								</SheetHeader>
								<NavLinks />
								{!isAuthFetched || !authUser ? null : !user ? (
									<Skeleton className="w-20 h-20 border border-border" />
								) : (
									<Link
										className="block relative aspect-square rounded border border-border"
										href={PAGES.PROFILE(user.uid)}
									>
										<Image
											className="object-cover object-top aspect-square"
											fallback="/fallback-avatar.jpg"
											width={80}
											height={80}
											fill={false}
											src={user.avatarUrl}
											alt="avatar"
										/>
									</Link>
								)}
								{!isAuthFetched ? null : !authUser ? (
									<div className="flex flex-col gap-3 mt-4">
										<Link href={PAGES.LOGIN}>
											<Button className="w-full" size="lg">
												{t("login")}
											</Button>
										</Link>
										<Link href={PAGES.REGISTER}>
											<Button className="w-full" size="lg">
												{t("register")}
											</Button>
										</Link>
									</div>
								) : !user ? null : (
									<div className="flex flex-col items-start gap-3 mt-4">
										<Link href={PAGES.PROFILE(user.uid)}>
											<Button variant="ghost" className="w-full" size="lg">
												<div className=" flex flex-col ">
													<span className="text-xs font-extralight">
														{t("profile")}
														<ArrowRight className="inline mb-0.5 size-3" />
													</span>
													{user.displayName}
												</div>
											</Button>
										</Link>

										<Link href={PAGES.PROFILE_SETTINGS}>
											<Button variant="ghost" className="w-full" size="lg">
												<Settings /> {t("settings")}
											</Button>
										</Link>

										<Button
											onClick={() => logout()}
											disabled={isPending}
											variant="ghost"
											className="w-full text-rose-500 "
										>
											<LogOut className="text-rose-500" /> {t("logout")}
										</Button>
									</div>
								)}
							</div>
							<div className=" flex justify-center">
								<LangSwitcher />
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	)
}
