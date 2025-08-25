import { PersonMediaCredits } from "@/src/shared/types/credits"
import { getFilteredByRole } from "./getFilteredByRole"

export const getCountLabel = (
	role: string,
	cast: PersonMediaCredits["cast"],
	crew: PersonMediaCredits["crew"]
): string => {
	const filtered = getFilteredByRole(role, cast, crew)
	return `(${filtered.length})`
}
