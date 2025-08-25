import { headers } from "next/headers"

export const getBaseURL = async () => {
	if (typeof window !== "undefined") {
		return ""
	}

	const head = await headers()
	const host = head.get("host")
	const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
	return `${protocol}://${host}`
}
