import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useQuery } from "@tanstack/react-query"
import { ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import SelectField from "@/components/FormFields/SelectField"
import getTags from "@/services/getTags"

// Slider bounds shared by the form and the "is this filter active?" logic.
// A slider left at its full range is treated as inactive (param not sent).
export const AGE_BOUNDS = { min: 18, max: 99 } as const
export const ELO_BOUNDS = { min: 0, max: 1000 } as const
export const DISTANCE_BOUNDS = { min: 0, max: 500 } as const // km

const formSchema = z.object({
	age: z.array(z.number()),
	elo: z.array(z.number()),
	distance: z.array(z.number()),
	tags: z.array(z.number()),
	sortBy: z.enum(["none", "age", "distance", "elo", "tags"]),
	order: z.enum(["asc", "desc"]),
})

type FormValues = z.infer<typeof formSchema>

const filtersToForm = (filters: GetUsersFilters): FormValues => ({
	age: [filters.minAge ?? AGE_BOUNDS.min, filters.maxAge ?? AGE_BOUNDS.max],
	elo: [filters.minElo ?? ELO_BOUNDS.min, filters.maxElo ?? ELO_BOUNDS.max],
	distance: [filters.maxDistance ?? DISTANCE_BOUNDS.max],
	tags: filters.tags ?? [],
	sortBy: filters.sortBy ?? "none",
	order: filters.order ?? "asc",
})

// Only keep constraints that actually narrow the result: a slider left at its
// full range is treated as inactive so its param is never sent.
const formToFilters = (values: FormValues): GetUsersFilters => {
	const filters: GetUsersFilters = {}

	if (values.age[0] > AGE_BOUNDS.min) filters.minAge = values.age[0]
	if (values.age[1] < AGE_BOUNDS.max) filters.maxAge = values.age[1]
	if (values.elo[0] > ELO_BOUNDS.min) filters.minElo = values.elo[0]
	if (values.elo[1] < ELO_BOUNDS.max) filters.maxElo = values.elo[1]
	if (values.distance[0] < DISTANCE_BOUNDS.max)
		filters.maxDistance = values.distance[0]
	if (values.tags.length) filters.tags = values.tags
	if (values.sortBy !== "none") {
		filters.sortBy = values.sortBy
		filters.order = values.order
	}

	return filters
}

const SORT_OPTIONS = [
	{ label: "Default", value: "none" },
	{ label: "Age", value: "age" },
	{ label: "Distance", value: "distance" },
	{ label: "Popularity", value: "elo" },
	{ label: "Common tags", value: "tags" },
]

type FilterFormProps = {
	initialFilters: GetUsersFilters
	onApply: (filters: GetUsersFilters) => void
	onReset: () => void
}

function FilterForm({ initialFilters, onApply, onReset }: FilterFormProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: filtersToForm(initialFilters),
	})

	const {
		data: tags,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["tags"],
		queryFn: getTags,
	})

	if (isError) throw error

	const age = form.watch("age")
	const elo = form.watch("elo")
	const distance = form.watch("distance")
	const sortBy = form.watch("sortBy")
	const order = form.watch("order")

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((values) => onApply(formToFilters(values)))}
				className="flex h-full flex-col gap-6"
			>
				{/* grow + min-h-0 so the scroll area fills the panel: the last field
				    is never flush against the bottom edge, so its focus ring isn't
				    clipped, and content only scrolls when it truly overflows. */}
				<div className="flex min-h-0 grow flex-col gap-6 overflow-y-auto">
					{/* Age */}
					<FormField
						control={form.control}
						name="age"
						render={({ field }) => (
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label>Age</Label>
									<span className="text-sm text-muted-foreground">
										{age[0]} - {age[1]}
									</span>
								</div>
								<Slider
									min={AGE_BOUNDS.min}
									max={AGE_BOUNDS.max}
									step={1}
									value={field.value}
									onValueChange={field.onChange}
								/>
							</div>
						)}
					/>

					{/* Distance */}
					<FormField
						control={form.control}
						name="distance"
						render={({ field }) => (
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label>Max distance</Label>
									<span className="text-sm text-muted-foreground">
										{distance[0] >= DISTANCE_BOUNDS.max
											? "∞"
											: `${distance[0]} km`}
									</span>
								</div>
								<Slider
									min={DISTANCE_BOUNDS.min}
									max={DISTANCE_BOUNDS.max}
									step={5}
									value={field.value}
									onValueChange={field.onChange}
								/>
							</div>
						)}
					/>

					{/* Popularity (elo) */}
					<FormField
						control={form.control}
						name="elo"
						render={({ field }) => (
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label>Popularity</Label>
									<span className="text-sm text-muted-foreground">
										{elo[0]} - {elo[1]}
									</span>
								</div>
								<Slider
									min={ELO_BOUNDS.min}
									max={ELO_BOUNDS.max}
									step={10}
									value={field.value}
									onValueChange={field.onChange}
								/>
							</div>
						)}
					/>

					{/* Tags */}
					<div className="space-y-3">
						<Label>Tags</Label>
						{isPending ? (
							<p className="text-sm text-muted-foreground">Loading tags...</p>
						) : (
							<SelectField
								control={form.control}
								name="tags"
								placeholder="Any tag"
								defaultValues={
									initialFilters.tags as unknown as string[] | undefined
								}
								items={tags.map((tag) => ({
									label: tag.name,
									value: tag.id as unknown as string,
								}))}
								isMulti
							/>
						)}
					</div>

					{/* Sort */}
					<div className="space-y-3">
						<Label>Sort by</Label>
						<div className="flex items-center gap-2">
							<div className="grow">
								<SelectField
									control={form.control}
									name="sortBy"
									items={SORT_OPTIONS}
								/>
							</div>
							<Button
								type="button"
								variant="outline"
								size="icon"
								disabled={sortBy === "none"}
								onClick={() =>
									form.setValue("order", order === "asc" ? "desc" : "asc")
								}
							>
								{order === "asc" ? (
									<ArrowUpIcon className="size-4" />
								) : (
									<ArrowDownIcon className="size-4" />
								)}
							</Button>
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					<Button
						type="button"
						variant="outline"
						className="grow"
						onClick={onReset}
					>
						Reset
					</Button>
					<Button variant="dark" type="submit" className="grow">
						Apply
					</Button>
				</div>
			</form>
		</Form>
	)
}

type SearchSettingsPanelProps = {
	isOpen: boolean
	initialFilters: GetUsersFilters
	onApply: (filters: GetUsersFilters) => void
	onReset: () => void
	onClose: () => void
}

export default function SearchSettingsPanel({
	isOpen,
	initialFilters,
	onApply,
	onReset,
	onClose,
}: SearchSettingsPanelProps) {
	const [renderKey, setRenderKey] = useState(0)
	useEffect(() => {
		if (isOpen) setRenderKey((key) => key + 1)
	}, [isOpen])

	return (
		<div
			className={cn(
				"fixed top-12 z-20 flex h-[calc(100%-56px-48px)] w-full flex-col overflow-hidden bg-background p-2 transition-transform",
				isOpen ? "translate-x-0" : "translate-x-full",
			)}
		>
			<ChevronLeftIcon onClick={onClose} className="size-8 shrink-0" />

			<div className="grow overflow-hidden p-4">
				<FilterForm
					key={renderKey}
					initialFilters={initialFilters}
					onApply={onApply}
					onReset={onReset}
				/>
			</div>
		</div>
	)
}
