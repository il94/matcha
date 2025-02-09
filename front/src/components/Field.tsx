import { Control, FieldValues, Path } from "react-hook-form"
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { InputHTMLAttributes } from "react"

type FieldProps<T extends FieldValues> =
	InputHTMLAttributes<HTMLInputElement> & {
		control: Control<T>
		name: Path<T>
		label?: string
		description?: string
	}

export default function Field<T extends FieldValues>({
	control,
	name,
	label,
	description,
	...props
}: FieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Input {...field} {...props} />
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
