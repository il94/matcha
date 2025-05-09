import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const genderOptions = ["Male", "Female", "Non-binary", "Other"] as const
const orientationOptions = [
	"Straight",
	"Gay",
	"Lesbian",
	"Bisexual",
	"Pansexual",
	"Other",
] as const

const formSchema = z.object({
	value: z.string().min(1, "Please select an option"),
})

type GenderOrientationSliderProps = {
	onClose: () => void
	className?: string
	type: "gender" | "sexual_orientation"
	initialValue?: string
}

export default function GenderOrientationSlider({
	onClose,
	className,
	type,
	initialValue = "",
}: GenderOrientationSliderProps) {
	const isGender = type === "gender"
	const title = isGender ? "Gender" : "Sexual Orientation"
	const options = isGender ? genderOptions : orientationOptions

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			value: initialValue,
		},
		mode: "onTouched",
	})

	const { mutate: updateValue } = useMutation({
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			// TODO: Implement your gender/orientation update API call here
			console.log(`Update ${type}:`, values)
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
					onSubmit={form.handleSubmit((values) => updateValue(values))}
					className="flex h-full flex-col justify-between"
				>
					<div className="flex h-full flex-col gap-6">
						<div>
							<h2 className="text-lg font-medium">{title}</h2>
							<p className="text-sm text-muted-foreground">
								Select your {title.toLowerCase()} to help us match you with the
								right people
							</p>
						</div>

						<div className="flex flex-col gap-6">
							<Select
								name="value"
								onValueChange={(value) => form.setValue("value", value)}
								defaultValue={form.getValues("value")}
							>
								<SelectTrigger className="h-12">
									<SelectValue
										placeholder={`Select your ${title.toLowerCase()}`}
									/>
								</SelectTrigger>
								<SelectContent>
									{options.map((option) => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
