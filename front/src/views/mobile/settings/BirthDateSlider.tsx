import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import DatePickerField from "@/components/FormFields/DatePickerField"
import dayjs from "@/lib/dayjs"
import { toast } from "sonner"
import updateUser from "@/services/updateUser"

const formSchema = z.object({
	birthDate: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: "Every story has a timeline, choose a date that makes sense.",
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
	initialValue,
	onClose,
	className,
}: BirthDateSliderProps) {
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			birthDate: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateUserMutation, isPending } = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			toast.success("Birth date successfully updated !")
			queryClient.invalidateQueries({ queryKey: ["verify"] })
			onClose()
		},
		onError: () => {
			form.setError("root", {
				message:
					"Looks like something went wrong. Don't worry, we're on it try again shortly.",
			})
		},
	})

	const message = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) =>
						updateUserMutation({ birthDate: values.birthDate }),
					)}
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
								toDate={dayjs().subtract(18, "years").toDate()}
								className="h-12"
							/>
							<FormMessage className="h-5 px-1">{message}</FormMessage>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							isPending ||
							!form.formState.isValid ||
							form.getValues().birthDate.toString() === initialValue?.toString()
						}
					>
						{isPending && <Loader2Icon className="animate-spin" />}
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
