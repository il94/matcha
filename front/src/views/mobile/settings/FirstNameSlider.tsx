import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import InputTextField from "@/components/FormFields/InputTextField"

const formSchema = z.object({
	firstName: z
		.string()
		.min(1, "Your first name is the spark of your charm—let it shine!")
		.max(64, "Keep your first name under 64 characters; simple is stylish."),
})

type FirstNameSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function FirstNameSlider({
	onClose,
	className,
	initialValue,
}: FirstNameSliderProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateFirstName } = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			// TODO: Implement your first name update API call here
			console.log("Update first name:", values)
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
					onSubmit={form.handleSubmit((values) => updateFirstName(values))}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">First Name</h2>
							<p className="text-sm text-muted-foreground">
								Update your first name
							</p>
						</div>

						<div className="flex flex-col gap-6">
							<InputTextField
								control={form.control}
								name="firstName"
								placeholder="First name"
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
							form.getValues().firstName === initialValue
						}
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
