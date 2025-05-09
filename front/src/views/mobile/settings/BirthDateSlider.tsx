import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import DatePickerField from "@/components/FormFields/DatePickerField"
import dayjs from "@/lib/dayjs"

const formSchema = z.object({
	birthDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: "Every story has a timeline—choose a date that makes sense.",
		})
		.refine((value) => dayjs().diff(value, "year") >= 18, {
			message: "You must be at least 18 years old to use this app.",
		}),
})

type BirthDateSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function BirthDateSlider({
	onClose,
	className,
	initialValue,
}: BirthDateSliderProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			birthDate: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateBirthDate } = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			// TODO: Implement your birth date update API call here
			console.log("Update birth date:", values)
		},
		onSuccess: () => {
			onClose()
		},
		onError: () => {
			form.setError("root", {
				message:
					"Looks like something went wrong. Don't worry, we're on it try again shortly.",
			})
		},
	})

	const error = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	console.log({ initialValue, error })

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) => updateBirthDate(values))}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Birth Date</h2>
							<p className="text-sm text-muted-foreground">
								Update your birth date to help us match you with people in your
								age group
							</p>
						</div>

						<div className="flex flex-col gap-6">
							<DatePickerField
								control={form.control}
								initialValue={dayjs(initialValue).toDate()}
								placeholder="Select your birth date"
								name="birthDate"
								className="h-12"
							/>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							!form.formState.isValid ||
							form.getValues().birthDate.toString() === initialValue?.toString()
						}
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
