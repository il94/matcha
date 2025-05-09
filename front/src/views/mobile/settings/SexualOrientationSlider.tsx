import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import SelectField from "@/components/FormFields/SelectField"
import SexualOrientation from "@/data/SexualOrientation"

const formSchema = z.object({
	sexualOrientation: z.string().min(1, "Please select your sexual orientation"),
})

type SexualOrientationSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function SexualOrientationSlider({
	initialValue,
	onClose,
	className,
}: SexualOrientationSliderProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			sexualOrientation: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateSexualOrientation } = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			// TODO: Implement your sexual orientation update API call here
			console.log("Update sexual orientation:", values)
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
					onSubmit={form.handleSubmit((values) =>
						updateSexualOrientation(values),
					)}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Sexual Orientation</h2>
							<p className="text-sm text-muted-foreground">
								Select your sexual orientation to help us match you with
								compatible partners
							</p>
						</div>

						<div className="flex flex-col gap-6">
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
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							!form.formState.isValid ||
							form.getValues().sexualOrientation === initialValue
						}
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
