import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Skeleton } from "@/src/components/ui/skeleton"
import { useCatalogFilter } from "@/src/shared/store/useCatalogFilter"

import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useGenres } from "../../(home)/hooks/useGenres"

export const FilterPanel = () => {
	const {
		mediaType,
		setGenres,
		selectedGenres,
		excludedGenres,
		includeAdult,
		setExcludedGenres,
		setIncludeAdult,
		setSelectedGenres,
		setYearFrom,
		setYearTo,
		setRatingFrom,
		setRatingTo,
		ratingFrom,
		ratingTo,
		yearFrom,
		yearTo,
		resetFilters,
		toggleApplyFilter,
	} = useCatalogFilter()

	const { genres, isGenresPending } = useGenres(mediaType)
	const t = useTranslations("Catalog.filter")

	useEffect(() => {
		if (!genres) return
		setGenres(genres)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [genres])

	const toggleGenre = (id: number) => {
		if (selectedGenres.includes(id)) {
			setSelectedGenres(selectedGenres.filter((g) => g !== id))
		} else {
			setSelectedGenres([...selectedGenres, id])
		}
	}

	const toggleExcludedGenre = (id: number) => {
		if (excludedGenres.includes(id)) {
			setExcludedGenres(excludedGenres.filter((g) => g !== id))
		} else {
			setExcludedGenres([...excludedGenres, id])
		}
	}

	if (!genres || isGenresPending) {
		return <Skeleton className="w-full md:w-64 h-[300px] md:h-[600px]" />
	}

	return (
		<div className="mt-2 lg:mt-7 lg:bg-background p-5 pl-1 rounded-lg lg:border border-border">
			<div
				className="  lg:max-h-[80vh] overflow-y-auto scrollbar-custom"
				style={{ direction: "rtl" }}
			>
				<div
					className="pl-3 space-y-6 text-center lg:text-start"
					style={{ direction: "ltr" }}
				>
					<div>
						<Label className="block mb-2 text-sm font-medium">
							{t("includeGenres")}
						</Label>
						<div className="flex flex-col items-center lg:items-start overflow-y-hidden lg:pr-2">
							<div className="gap-1  mt-1 flex flex-col">
								{genres.map((genre) => (
									<div key={genre.id} className="flex items-center space-x-2">
										<Checkbox
											id={`genre-${genre.id}`}
											checked={selectedGenres.includes(genre.id)}
											onCheckedChange={() => toggleGenre(genre.id)}
											className="size-7 lg:size-5"
										/>
										<Label
											className="text-lg lg:text-base"
											htmlFor={`genre-${genre.id}`}
										>
											{genre.name}
										</Label>
									</div>
								))}
							</div>
						</div>
					</div>

					<div>
						<Label className="block mb-2 text-sm font-medium">
							{t("excludeGenres")}
						</Label>
						<div className="flex flex-col items-center lg:items-start overflow-y-hidden lg:pr-2">
							<div className="gap-1 mt-1 flex flex-col">
								{genres.map((genre) => (
									<div key={genre.id} className="flex items-center space-x-2">
										<Checkbox
											id={`excluded-${genre.id}`}
											checked={excludedGenres.includes(genre.id)}
											onCheckedChange={() => toggleExcludedGenre(genre.id)}
											className="size-7 lg:size-5"
										/>
										<Label
											className="text-lg lg:text-base"
											htmlFor={`excluded-${genre.id}`}
										>
											{genre.name}
										</Label>
									</div>
								))}
								<div className="flex mt-5 items-center space-x-2">
									<Checkbox
										id="adult"
										checked={includeAdult}
										onCheckedChange={(val) => {
											setIncludeAdult(Boolean(val))
										}}
										className="size-7 lg:size-5"
									/>
									<Label className="text-lg lg:text-base" htmlFor="adult">
										{t("includeAdult")}
									</Label>
								</div>
							</div>
						</div>
					</div>

					<div>
						<Label className="block mb-2 text-sm font-medium">
							{t("year")}
						</Label>
						<div className="flex gap-2 justify-center lg:justify-start">
							<Input
								type="number"
								className="appearance-none  w-28 lg:w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
								placeholder="От"
								value={yearFrom}
								onChange={(e) => {
									setYearFrom(e.target.value)
								}}
							/>
							<Input
								className="appearance-none  w-28 lg:w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
								type="number"
								placeholder="До"
								value={yearTo}
								onChange={(e) => {
									setYearTo(e.target.value)
								}}
							/>
						</div>
					</div>

					<div>
						<Label className="block mb-2 text-sm font-medium">
							{t("rating")}
						</Label>
						<div className="flex gap-2 justify-center lg:justify-start">
							<Input
								type="number"
								step="0.1"
								min="0"
								max="10"
								placeholder="От"
								className="appearance-none w-28 lg:w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
								value={ratingFrom ?? ""}
								onChange={(e) => {
									const val = e.target.value ? e.target.value : ""
									setRatingFrom(val)
								}}
							/>
							<Input
								type="number"
								step="0.1"
								min="0"
								max="10"
								className="appearance-none w-28 lg:w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
								placeholder="До"
								value={ratingTo ?? ""}
								onChange={(e) => {
									const val = e.target.value ? e.target.value : ""
									setRatingTo(val)
								}}
							/>
						</div>
					</div>
					<div className="flex gap-5 justify-center lg:justify-between">
						<Button
							className="lg:w-25"
							variant="outline"
							onClick={resetFilters}
						>
							{t("reset")}
						</Button>
						<Button className="lg:w-25" onClick={() => toggleApplyFilter(true)}>
							{t("apply")}
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
