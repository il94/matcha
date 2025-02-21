import DatePickerField from "@/components/FormFields/DatePickerField"
import SelectField from "@/components/FormFields/SelectField"
import Gender from "@/data/Gender"
import SexualOrientation from "@/data/SexualOrientation"
import getTags from "@/services/getTags"
import { useQuery } from "@tanstack/react-query"
import { useFormContext } from "react-hook-form"

export default function Step1() {
	const form = useFormContext()

	const {
		data: tags,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["tags"],
		queryFn: getTags,
	})

	if (isPending) return <p>Loading...</p>
	if (isError) throw error

	return (
		<div className="flex flex-col gap-16">
			<h1 className="text-4xl">Who are you ?</h1>
			<div className="flex w-full flex-col gap-6">
				<p>Complete your profile to help us find the best matches for you !</p>
				<DatePickerField
					control={form.control}
					placeholder="Select your birth date"
					name="birthDate"
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
