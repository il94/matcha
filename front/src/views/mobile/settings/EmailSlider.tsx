import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import InputTextField from "@/components/FormFields/InputTextField"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { cn } from "@/lib/utils"

const formSchema = z.object({
	email: z
		.string()
		.min(1, "We need your email to send you those sweet updates !")
		.max(256, "Your email must be under 256 characters—brevity is charming !")
		.email("Hmm, that doesn't look like a valid email address. Try again ?"),
})

type EmailSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function EmailSlider({
	initialValue,
	onClose,
	className,
}: EmailSliderProps) {
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateEmail } = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			// TODO: Implement your email update API call here
			console.log("Update email:", values)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["verify"] })
			onClose()
		},
		onError: (error: AxiosError<{ message: string }>) => {
			if (
				error.response?.status === 403 &&
				error.response.data.message === "EMAIL_ALREADY_TAKEN"
			) {
				form.setError("email", {
					message:
						"This email is already spoken for—try a different one to stay unique !",
				})
			} else {
				form.setError("root", {
					message:
						"Looks like something went wrong. Don't worry, we're on it try again shortly.",
				})
			}
		},
	})

	const error = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) => updateEmail(values))}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Email Address</h2>
							<p className="text-sm text-muted-foreground">
								Change your email address. You'll need to verify your new email.
							</p>
						</div>

						<div className="flex flex-col gap-6">
							<InputTextField
								control={form.control}
								type="email"
								name="email"
								placeholder="Enter your new email"
								variant="outline"
								className="h-12"
							/>
							<FormMessage className="h-5 px-1">{error}</FormMessage>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							!form.formState.isValid || form.getValues().email === initialValue
						}
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
