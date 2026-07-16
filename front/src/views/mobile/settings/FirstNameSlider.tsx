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
	firstName: z
		.string()
		.min(1, "Your first name is the spark of your charm, let it shine !")
		.max(64, "Keep your first name under 64 characters ; simple is stylish."),
})

type FirstNameSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function FirstNameSlider({
	initialValue,
	onClose,
	className,
}: FirstNameSliderProps) {
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateUserMutation, isPending } = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			toast.success("First name successfully updated !")
			queryClient.invalidateQueries({ queryKey: ["verify"] })
			onClose()
		},
		onError: () => {
			form.setError("root", {
				message:
					"Looks like something went wrong. Don't worry, we're on it, try again shortly.",
			})
		},
	})

	const message = Object.values(form.formState.errors ?? [])[0]?.message ?? " "

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) =>
						updateUserMutation({ firstName: values.firstName }),
					)}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">First Name</h2>
							<p className="text-sm text-muted-foreground">
								Update your first name, it's how your matches will know you.
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
							<FormMessage className="h-5 px-1">{message}</FormMessage>
						</div>
					</div>

					<Button
						variant="dark"
						disabled={
							isPending ||
							!form.formState.isValid ||
							form.getValues().firstName === initialValue
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
