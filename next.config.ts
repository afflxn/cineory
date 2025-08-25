import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://image.tmdb.org/t/p/*/**")],
		deviceSizes: [320, 420, 768, 1024, 1200, 1600, 1920],
		imageSizes: [
			16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920,
			2048,
		],
	},
	experimental: {
		globalNotFound: true,
	},
}
const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
