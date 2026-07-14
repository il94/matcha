import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import SelectField from "@/components/FormFields/SelectField"
import getTags from "@/services/getTags"
import updateUser from "@/services/updateUser"
import { toast } from "sonner"
import { Loader2Icon } from "lucide-react"

const formSchema = z.object({
	tags: z.array(z.number()),
})

type TagsSliderProps = {
	initialValue: Tag[]
	onClose: () => void
	className?: string
}

export default function TagsSlider({
	onClose,
	className,
	initialValue = [],
}: TagsSliderProps) {
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			tags: initialValue.map((item) => item.id),
		},
		mode: "onTouched",
	})

	const {
		data: tags,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["tags"],
		queryFn: getTags,
	})

	const { mutate: updateUserMutation, isPending: isUpdating } = useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			toast.success("Tags successfully updated !")
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

	if (isPending)
		return (
			<div className="flex h-full items-center justify-center">
				<Loader2Icon className="size-8 animate-spin" />
			</div>
		)

	if (isError) throw error

	return (
		<div className={cn(className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) =>
						updateUserMutation({ tags: values.tags }),
					)}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">Tags</h2>
							<p className="text-sm text-muted-foreground">
								Select tags that best describe your interests
							</p>
						</div>

						<div className="flex flex-col gap-6">
							<SelectField
								control={form.control}
								defaultValues={
									initialValue.map((item) => item.id) as unknown as string[]
								}
								name="tags"
								placeholder="Select tags"
								items={tags.map((item) => ({
									label: item.name,
									value: item.id as unknown as string,
								}))}
								isMulti
								className="h-12"
							/>
						</div>
					</div>

					<Button
						variant="dark"
						type="submit"
						disabled={
							isUpdating ||
							!form.formState.isValid ||
							JSON.stringify(form.getValues().tags) ===
								JSON.stringify(initialValue)
						}
					>
						{isUpdating && <Loader2Icon className="animate-spin" />}
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
