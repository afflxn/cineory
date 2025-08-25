import { MediaCredits } from "../types/credits"

export const getCastTabsData = (credits: MediaCredits) => {
	return [
		{ value: "actors", filter: () => credits.cast },
		{
			value: "directors",
			filter: () => credits.crew.filter((c) => c.department === "Directing"),
		},
		{
			value: "writers",
			filter: () => credits.crew.filter((c) => c.department === "Writing"),
		},
		{
			value: "producers",
			filter: () => credits.crew.filter((c) => c.department === "Production"),
		},
		{
			value: "editing",
			filter: () => credits.crew.filter((c) => c.department === "Editing"),
		},
		{
			value: "camera",
			filter: () => credits.crew.filter((c) => c.department === "Camera"),
		},
		{
			value: "other",
			filter: () =>
				credits.crew.filter(
					(c) =>
						![
							"Directing",
							"Writing",
							"Production",
							"Editing",
							"Camera",
						].includes(c.department)
				),
		},
	]
}
