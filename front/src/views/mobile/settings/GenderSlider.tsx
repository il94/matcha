import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import SelectField from "@/components/FormFields/SelectField"
import Gender from "@/data/Gender"

const formSchema = z.object({
	gender: z.string().min(1, "Please select your gender"),
})

type GenderSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function GenderSlider({
	onClose,
	className,
	initialValue,
}: GenderSliderProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			gender: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateGender } = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			// TODO: Implement your gender update API call here
			console.log("Update gender:", values)
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

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) => updateGender(values))}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Gender</h2>
							<p className="text-sm text-muted-foreground">
								Select your gender to help us match you with compatible partners
							</p>
						</div>

						<div className="flex flex-col gap-6">
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
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							!form.formState.isValid ||
							form.getValues().gender === initialValue
						}
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
