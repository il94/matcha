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
	gender: z.nativeEnum(Gender, {
		message: "Gender is part of your identity, pick what feels right.",
		required_error: "Everyone has a story, let's start with your gender.",
	}),
})

type GenderSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function GenderSlider({
	initialValue,
	onClose,
	className,
}: GenderSliderProps) {
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			gender: initialValue as Gender,
		},
		mode: "onTouched",
	})

	const { mutate: updateUserMutation, isPending } = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			toast.success("Gender successfully updated !")
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
						updateUserMutation(
							values.gender === Gender.UNDEFINED
								? {
										gender: values.gender,
										sexualOrientation: SexualOrientation.BI,
									}
								: { gender: values.gender },
						),
					)}
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
							<FormMessage className="h-5 px-1">{message}</FormMessage>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							isPending ||
							!form.formState.isValid ||
							form.getValues().gender === initialValue
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
