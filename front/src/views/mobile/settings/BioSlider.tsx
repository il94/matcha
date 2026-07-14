import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import TextAreaField from "@/components/FormFields/TextAreaField"
import toast from "@/lib/toast"
import updateUser from "@/services/updateUser"

const formSchema = z.object({
	bio: z.string().max(256, "Keep it concise !"),
})

type BioSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function BioSlider({
	initialValue = "",
	className,
	onClose,
}: BioSliderProps) {
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			bio: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateUserMutation, isPending } = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			toast.success("Bio successfully updated !")
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

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) =>
						updateUserMutation({ bio: values.bio }),
					)}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Bio</h2>
							<p className="text-sm text-muted-foreground">
								Tell us about yourself ! Share your interests, hobbies, and what
								makes you unique.
							</p>
						</div>

						<div className="flex flex-col gap-6">
							<TextAreaField
								control={form.control}
								name="bio"
								placeholder="Bio"
								autoSize
								maxLength={256}
								className="h-24 max-h-64 min-h-24"
							/>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							isPending ||
							!form.formState.isValid ||
							form.getValues().bio === initialValue
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
