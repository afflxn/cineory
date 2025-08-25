import { CombinedPersonMediaCredits } from "@/src/shared/types/credits"
import { useTranslations } from "next-intl"
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"

type RatingChartProps = {
	media: CombinedPersonMediaCredits[]
}

export const RatingChart = ({ media }: RatingChartProps) => {
	const t = useTranslations("PersonPage")

	const data = media
		.map((item) => {
			const date =
				item.media_type === "movie" ? item.release_date : item.first_air_date
			const year = date.slice(0, 4) ?? "???"
			const title = item.media_type === "movie" ? item.title : item.name
			return {
				year,
				title,
				rating: item.vote_average,
				votes: item.vote_count,
			}
		})
		.sort((a, b) => a.year.localeCompare(b.year))

	if (data.length === 0)
		return (
			<div className="text-muted-foreground text-sm text-center h-[300px] flex items-center justify-center"></div>
		)

	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data}>
				<XAxis dataKey="year" stroke="#9ca3af" />
				<YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} stroke="#9ca3af" />
				<Tooltip
					contentStyle={{
						backgroundColor: "hsl(240, 3%, 8%)",
						borderRadius: "0.5rem",
						padding: "0.5rem 0.75rem",

						border: "none",
						color: "#f9fafb",
					}}
					formatter={(value: number, name: string) => {
						if (name === "rating")
							return [`★ ${value.toFixed(1)}`, t("formatRating")]
						if (name === "votes") return [`${value}`, t("formatVotes")]
						return value
					}}
					labelFormatter={(label, payload) => {
						const item = payload?.[0]?.payload
						return item?.title
							? `${t("year")}: ${label} | ${item.title}`
							: `${t("year")}: ${label}`
					}}
				/>
				<Bar
					dataKey="rating"
					fill={"hsl(32, 96%, 45%)"}
					radius={[6, 6, 0, 0]}
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}
