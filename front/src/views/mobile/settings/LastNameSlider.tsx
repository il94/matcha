import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import InputTextField from "@/components/FormFields/InputTextField"

const formSchema = z.object({
	lastName: z
		.string()
		.min(1, "Your last name completes your story—share it with us!")
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
	onClose,
	className,
	initialValue,
}: LastNameSliderProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			lastName: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateLastName } = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			// TODO: Implement your last name update API call here
			console.log("Update last name:", values)
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

	const error = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) => updateLastName(values))}
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
							<FormMessage className="h-5 px-1">{error}</FormMessage>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							!form.formState.isValid ||
							form.getValues().lastName === initialValue
						}
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
