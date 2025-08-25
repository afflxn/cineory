export const PAGES = {
	HOME: "/",
	LOGIN: "/signin",
	REGISTER: "/signup",
	PROFILE: (uid: string) => `/profile/${uid}`,
	PROFILE_SETTINGS: `/profile/settings`,
	MOVIE: (id: number) => `/movie/${id}`,
	SERIES: (id: number) => `/series/${id}`,
	CAST: "cast",
	PERSON: (id: number) => `/person/${id}`,
	CATALOG_MOVIE: "/catalog/movie",
	CATALOG_SERIES: "/catalog/series",
	NOT_FOUND: "/not-found",
}
