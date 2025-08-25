import { Film, Home, Tv } from "lucide-react"
import { PAGES } from "../config/pages.config"

export const rawNavLinks = [
	{
		name: "home",
		path: PAGES.HOME,
		icon: <Home className="w-4 h-4 mr-2" />,
	},
	{
		name: "movie",
		path: PAGES.CATALOG_MOVIE,
		icon: <Film className="w-4 h-4 mr-2" />,
	},
	{
		name: "series",
		path: PAGES.CATALOG_SERIES,
		icon: <Tv className="w-4 h-4 mr-2" />,
	},
]
