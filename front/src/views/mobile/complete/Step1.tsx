import DatePickerField from "@/components/FormFields/DatePickerField"
import SelectField from "@/components/FormFields/SelectField"
import Gender from "@/data/Gender"
import SexualOrientation from "@/data/SexualOrientation"
import getTags from "@/services/getTags"
import { useQuery } from "@tanstack/react-query"
import dayjs from "@/lib/dayjs"
import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { Loader2Icon } from "lucide-react"
import { ErrorState } from "@/components/ui/error-state"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"

export default function Step1() {
	const form = useFormContext()
	const { setValue, watch } = form

	const gender = watch("gender")
	const isGenderUndefined = gender === Gender.UNDEFINED

	useEffect(() => {
		if (isGenderUndefined)
			setValue("sexualOrientation", SexualOrientation.BI, {
				shouldValidate: true,
			})
	}, [isGenderUndefined, setValue])

	const {
		data: tags,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["tags"],
		queryFn: DEBUG_ERRORS.completeTags ? forcedError : getTags,
	})

	if (isPending)
		return (
			<div className="flex h-full items-center justify-center">
				<Loader2Icon className="size-8 animate-spin" />
			</div>
		)
	if (isError)
		return (
			<div className="flex h-full items-center justify-center">
				<ErrorState />
			</div>
		)

	return (
		<div className="flex flex-col gap-16">
			<h1 className="text-4xl">Who Are You ?</h1>
			<div className="flex w-full flex-col gap-6">
				<p>Complete your profile to help us find the best matches for you !</p>
				<DatePickerField
					control={form.control}
					placeholder="Select your birth date"
					name="birthDate"
					defaultMonth={dayjs().subtract(18, "years").set("month", 0).toDate()}
					toDate={dayjs().subtract(18, "years").toDate()}
				/>
				<SelectField
					control={form.control}
					name="gender"
					placeholder="Select your gender"
					items={Object.values(Gender).map((item) => ({
						label: item,
						value: item,
					}))}
					className="h-12"
				/>
				<SelectField
					control={form.control}
					name="sexualOrientation"
					placeholder="Select your sexual orientation"
					items={Object.values(SexualOrientation).map((item) => ({
						label: item,
						value: item,
					}))}
					disabled={isGenderUndefined}
					className="h-12"
				/>
				<SelectField
					control={form.control}
					name="tags"
					placeholder="Select tags"
					items={tags.map((item) => ({
						label: item.name,
						value: item.id as unknown as string,
					}))}
					isMulti
					className="h-12"
				/>
			</div>
		</div>
	)
}
