"use client"

import { Link } from "@/src/i18n/navigation"
import { useHeaderStore } from "@/src/shared/store/useHeaderStore"
import {
	ArrowRight,
	LogOut,
	Menu,
	Search,
	Settings,
	User,
	X,
} from "lucide-react"

import { PAGES } from "@/src/shared/config/pages.config"
import { useAuthUser } from "@/src/shared/hooks/auth/useAuthUser"
import { useLogout } from "@/src/shared/hooks/auth/useLogout"
import { useUserData } from "@/src/shared/hooks/auth/useUserData"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { Button } from "../../ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { Input } from "../../ui/input"
import { Skeleton } from "../../ui/skeleton"
import { Image } from "../Image"
import { LangSwitcher } from "../LangSwitcher"
import { SearchResults } from "../SearchResult"
import { NavLinks } from "./NavLinks"

export const Header = () => {
	const {
		isMenuOpen,
		isSearchOpen,
		searchQuery,
		toggleMenu,
		toggleSearch,
		debouncedQuery,
		setSearchQuery,
		setIsSearchOpen,
		setDebouncedQuery,
	} = useHeaderStore()

	const { data: authUser, isFetched: isAuthFetched } = useAuthUser()
	const { data: user } = useUserData()
	const { logout, isPending } = useLogout()

	const t = useTranslations("Header")

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(searchQuery)
		}, 300)
		return () => clearTimeout(handler)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery])

	return (
		<header className="bg-background h-24 sticky top-0 left-0 right-0 z-500 border-b border-border">
			<div className="container py-6">
				<div className="flex items-center  justify-center sm:justify-between">
					<div className="relative">
						<div onMouseEnter={toggleMenu} className="flex items-center">
							<Link
								href={PAGES.HOME}
								className="flex items-center text-primary text-3xl font-bold font-logo"
							>
								Cineory
							</Link>
						</div>

						{isMenuOpen && (
							<nav
								onMouseLeave={toggleMenu}
								className="absolute top-0 rounded-b-lg bg-background w-50 flex flex-col"
							>
								<div className="flex items-center">
									<Link
										href={PAGES.HOME}
										className="flex items-center text-primary text-3xl font-bold font-logo"
									>
										Cineory
									</Link>
								</div>
								<NavLinks />
							</nav>
						)}
					</div>

					<div className="flex items-center gap-2">
						{!isSearchOpen && (
							<Button variant="ghost" size="icon" onClick={toggleSearch}>
								<Search className="w-5 h-5" />
							</Button>
						)}

						{isSearchOpen && (
							<div className="relative w-100">
								<div className="flex items-center gap-2">
									<Input
										placeholder={`${t("Search.movie")}, ${t("Search.tv")}, ${t(
											"Search.person"
										)}...`}
										className="h-10 bg-secondDark"
										autoFocus
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										onBlur={() => setTimeout(() => setIsSearchOpen(false), 100)}
									/>
									<Button variant="ghost" size="icon" onClick={toggleSearch}>
										<X />
									</Button>
								</div>
								<SearchResults query={debouncedQuery} />
							</div>
						)}

						<div className="h-10 border-y opacity-0"></div>
						<LangSwitcher />

						{!isAuthFetched ? null : !authUser ? (
							<div className="mr-16 flex gap-2">
								<Link href={PAGES.LOGIN}>
									<Button variant="ghost" size="lg">
										{t("login")}
									</Button>
								</Link>
								<Link className="hidden lg:block" href={PAGES.REGISTER}>
									<Button size="lg">{t("register")}</Button>
								</Link>
							</div>
						) : !user ? (
							<Skeleton className="w-10 h-10 border border-border" />
						) : (
							<div className="flex gap-2 items-center">
								<Link
									className="block relative rounded border border-border aspect-square "
									href={PAGES.PROFILE(user.uid)}
								>
									<Image
										className="object-cover object-top aspect-square"
										fallback="/fallback-avatar.jpg"
										src={user.avatarUrl}
										width={40}
										height={40}
										fill={false}
										alt="avatar"
									/>
								</Link>

								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon">
											<Menu />
										</Button>
									</DropdownMenuTrigger>

									<DropdownMenuContent
										className="w-60 mt-5 rounded-t-none border-t-0 z-1000 "
										align="end"
									>
										<Link href={PAGES.PROFILE(user.uid)}>
											<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
												<User />

												<div className=" flex flex-col ">
													<span className="text-xs font-extralight">
														{t("profile")}
														<ArrowRight className="inline mb-0.5 size-3" />
													</span>
													{user.displayName}
												</div>
											</DropdownMenuItem>
										</Link>

										<DropdownMenuSeparator />

										<Link href={PAGES.PROFILE_SETTINGS}>
											<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
												<Settings /> {t("settings")}
											</DropdownMenuItem>
										</Link>

										<DropdownMenuItem
											disabled={isPending}
											onSelect={(e) => {
												e.preventDefault()
												logout()
											}}
											className="text-rose-500"
										>
											<LogOut className="text-rose-500" /> {t("logout")}
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}
