import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import TextAreaField from "@/components/FormFields/TextAreaField"

const formSchema = z.object({
	bio: z.string().max(256, "Keep it concise !"),
})

type BioSliderProps = {
	initialValue: string
	onClose: () => void
	className?: string
}

export default function BioSlider({
	onClose,
	className,
	initialValue = "",
}: BioSliderProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			bio: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateBio } = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			// TODO: Implement your bio update API call here
			console.log("Update bio:", values)
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

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) => updateBio(values))}
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
								maxLength={270}
								className="h-24 max-h-64 min-h-24"
							/>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							!form.formState.isValid || form.getValues().bio === initialValue
						}
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
