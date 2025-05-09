import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import InputTextField from "@/components/FormFields/InputTextField"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { cn } from "@/lib/utils"

const formSchema = z
	.object({
		currentPassword: z.string().min(1, "Please enter your current password"),
		newPassword: z
			.string()
			.min(
				1,
				"A password can be crucial for maintaining some... privacy in your love life.",
			)
			.refine((password) => /[a-z]/.test(password), {
				message:
					"Without a lowercase letter, your password feels a bit incomplete, doesn't it?",
			})
			.refine((password) => /[A-Z]/.test(password), {
				message:
					"A touch of uppercase makes your password look more serious and secure.",
			})
			.refine((password) => /[0-9]/.test(password), {
				message: "Adding a number shows you're ready to do the math of love.",
			})
			.refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
				message: "Special characters are the spice your password needs.",
			})
			.refine((password) => password.length >= 8, {
				message:
					"A strong bond requires time, and a strong password requires 8 characters.",
			}),
		retypePassword: z.string().min(1, "Please retype your new password"),
	})
	.refine((data) => data.newPassword === data.retypePassword, {
		message: "Looks like your passwords don't match. Let's try that again!",
		path: ["retypePassword"],
	})

type PasswordSliderProps = {
	onClose: () => void
	className?: string
}

export default function PasswordSlider({
	onClose,
	className,
}: PasswordSliderProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			retypePassword: "",
		},
		mode: "onTouched",
	})

	const { mutate: updatePassword } = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			// TODO: Implement your password update API call here
			console.log("Update password:", values)
		},
		onSuccess: () => {
			onClose()
		},
		onError: (error: AxiosError<{ message: string }>) => {
			if (
				error.response?.status === 403 &&
				error.response.data.message === "INVALID_PASSWORD"
			) {
				form.setError("currentPassword", {
					message:
						"Hmm, that's not quite right. Please check your current password.",
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
					onSubmit={form.handleSubmit((values) => updatePassword(values))}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Change Password</h2>
							<p className="text-sm text-muted-foreground">
								Update your password to keep your account secure
							</p>
						</div>

						<div className="flex flex-col gap-6">
							<InputTextField
								control={form.control}
								type="password"
								name="currentPassword"
								placeholder="Current password"
								variant="outline"
								className="h-12"
							/>
							<InputTextField
								control={form.control}
								type="password"
								name="newPassword"
								placeholder="New password"
								variant="outline"
								className="h-12"
							/>
							<InputTextField
								control={form.control}
								type="password"
								name="retypePassword"
								placeholder="Retype new password"
								variant="outline"
								className="h-12"
							/>
							<FormMessage className="h-5 px-1">{error}</FormMessage>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={!form.formState.isValid}
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
