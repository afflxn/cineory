export const formatRuntime = (minutes: number, locale: string) => {
	if (!minutes) return null
	const hours = Math.floor(minutes / 60)
	const mins = minutes % 60
	if (locale === "ru") {
		return `${hours}ч ${mins}мин`
	}
	return `${hours}h ${mins}min`
}
