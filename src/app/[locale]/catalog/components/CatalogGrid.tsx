export const CatalogGrid = ({
	children,
	isPlaceholder,
}: {
	children: React.ReactNode
	isPlaceholder?: boolean
}) => (
	<div
		className={
			"bg-background p-4 rounded-xl border border-border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 lg:gap-4" +
			(isPlaceholder ? " opacity-50" : "")
		}
	>
		{children}
	</div>
)
