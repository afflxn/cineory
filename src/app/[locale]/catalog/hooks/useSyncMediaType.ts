import { useCatalogFilter } from "@/src/shared/store/useCatalogFilter"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export const useSyncMediaType = () => {
	const pathname = usePathname()
	const { setMediaType } = useCatalogFilter()

	useEffect(() => {
		setMediaType(pathname.includes("/series") ? "series" : "movie")
	}, [pathname, setMediaType])
}
