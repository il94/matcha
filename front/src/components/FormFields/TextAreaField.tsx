import { Control, FieldValues, Path } from "react-hook-form"
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form"
import { TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "../ui/textarea"

type FieldProps<T extends FieldValues> =
	TextareaHTMLAttributes<HTMLTextAreaElement> & {
		control: Control<T>
		name: Path<T>
		label?: string
		description?: string
	} & {
		autoSize?: boolean
		disableErrorMessage?: boolean
	}

export default function TextAreaField<T extends FieldValues>({
	control,
	name,
	label,
	description,
	disableErrorMessage = false,
	...props
}: FieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<div className="relative">
							<Textarea
								{...field}
								{...props}
								className={cn(
									props.className,
									fieldState.invalid && "bg-destructive/50",
								)}
							/>
						</div>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					{!disableErrorMessage && <FormMessage />}
				</FormItem>
			)}
		/>
	)
}
