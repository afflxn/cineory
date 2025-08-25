import { ReactNode } from "react"

export const DetailRow = ({
	label,
	children,
}: {
	label: string
	children: ReactNode
}) => (
	<>
		<div className="text-zinc-400">{label}</div>
		<div>{children}</div>
	</>
)
