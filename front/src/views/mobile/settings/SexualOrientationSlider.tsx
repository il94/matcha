import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import SelectField from "@/components/FormFields/SelectField"
import Gender from "@/data/Gender"
import SexualOrientation from "@/data/SexualOrientation"
import updateUser from "@/services/updateUser"
import { toast } from "sonner"
import { AxiosError } from "axios"

const formSchema = z.object({
	sexualOrientation: z.string().min(1, "Please select your sexual orientation"),
})

type SexualOrientationSliderProps = {
	initialValue: string
	gender: string
	onClose: () => void
	className?: string
}

export default function SexualOrientationSlider({
	initialValue,
	gender,
	onClose,
	className,
}: SexualOrientationSliderProps) {
	const queryClient = useQueryClient()

	const isGenderUndefined = gender === Gender.UNDEFINED

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			sexualOrientation: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateUserMutation, isPending } = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			toast.success("Sexual orientation successfully updated !")
			queryClient.invalidateQueries({ queryKey: ["verify"] })
			onClose()
		},
		onError: (error: AxiosError<{ message: string }>) => {
			if (
				error.response?.status === 400 &&
				error.response.data.message ===
					"ORIENTATION_LOCKED_FOR_UNDEFINED_GENDER"
			) {
				form.setError("root", {
					message: "Pick a gender first, then we can talk orientation!",
				})
			} else {
				form.setError("root", {
					message:
						"Looks like something went wrong. Don't worry, we're on it, try again shortly.",
				})
			}
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
								disabled={isGenderUndefined}
								className="h-12"
							/>
							{isGenderUndefined ? (
								<p className="px-1 text-sm text-muted-foreground">
									Orientation is locked to Bi while your gender is undefined.
								</p>
							) : (
								<FormMessage className="h-5 px-1">{message}</FormMessage>
							)}
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							isPending ||
							isGenderUndefined ||
							!form.formState.isValid ||
							form.getValues().sexualOrientation === initialValue
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
