import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import SelectField from "@/components/FormFields/SelectField"
import SexualOrientation from "@/data/SexualOrientation"
import updateUser from "@/services/updateUser"
import { toast } from "sonner"

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
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			sexualOrientation: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateUserMutation } = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			toast.success("Sexual orientation successfully updated !")
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
						updateUserMutation({ sexualOrientation: values.sexualOrientation }),
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
							<FormMessage className="h-5 px-1">{message}</FormMessage>
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
