import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import InputTextField from "@/components/FormFields/InputTextField"
import updateUser from "@/services/updateUser"
import toast from "@/lib/toast"

const formSchema = z.object({
	lastName: z
		.string()
		.min(1, "Your last name completes your story, share it with us!")
		.max(
			64,
			"Please limit your last name to 64 characters; elegance in simplicity!",
		),
})

type LastNameSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function LastNameSlider({
	initialValue,
	onClose,
	className,
}: LastNameSliderProps) {
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			lastName: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateUserMutation, isPending } = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			toast.success("Last name successfully updated !")
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
						updateUserMutation({ lastName: values.lastName }),
					)}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Last Name</h2>
							<p className="text-sm text-muted-foreground">
								Update your last name
							</p>
						</div>

						<div className="flex flex-col gap-6">
							<InputTextField
								control={form.control}
								name="lastName"
								placeholder="Last name"
								className="h-12"
								variant="outline"
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
							form.getValues().lastName === initialValue
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
