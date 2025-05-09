import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import InputTextField from "@/components/FormFields/InputTextField"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { cn } from "@/lib/utils"

const formSchema = z.object({
	username: z
		.string()
		.min(1, "Your username is your stage name—make it memorable!")
		.max(
			32,
			"A short username is easier to remember—stick to 32 characters or less!",
		),
})

type UsernameSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function UsernameSlider({
	onClose,
	className,
	initialValue,
}: UsernameSliderProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateUsername } = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			// TODO: Implement your username update API call here
			console.log("Update username:", values)
		},
		onSuccess: () => {
			onClose()
		},
		onError: (error: AxiosError) => {
			if (
				error.response?.status === 403 &&
				error.response.data.message === "USERNAME_ALREADY_TAKEN"
			) {
				form.setError("username", {
					message:
						"Someone else snagged this username—it's popular! Try a new one.",
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
					onSubmit={form.handleSubmit((values) => updateUsername(values))}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Username</h2>
							<p className="text-sm text-muted-foreground">
								Choose a unique username that represents you
							</p>
						</div>

						<div className="flex flex-col gap-6">
							<InputTextField
								control={form.control}
								name="username"
								placeholder="Username"
								className="h-12"
								variant="outline"
							/>
							<FormMessage className="h-5 px-1">{error}</FormMessage>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							!form.formState.isValid ||
							form.getValues().username === initialValue
						}
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
