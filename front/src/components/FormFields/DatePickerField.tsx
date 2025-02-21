import { Control, FieldValues, Path } from "react-hook-form"
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "../ui/form"
import { cn } from "@/lib/utils"
import { CalendarProps } from "../ui/calendar"
import dayjs from "@/lib/dayjs"
import { DatePicker } from "../ui/date-picker"

type FieldProps<T extends FieldValues> = CalendarProps & {
	control: Control<T>
	name: Path<T>
	label?: string
	description?: string
	placeholder?: string
}

export default function DatePickerField<T extends FieldValues>({
	control,
	name,
	label,
	description,
}: FieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				return (
					<FormItem>
						{label && <FormLabel>{label}</FormLabel>}
						<FormControl>
							<DatePicker
								onSelect={(date?: Date) => {
									if (date) field.onChange(dayjs(date).format("YYYY-MM-DD"))
								}}
								placeholder="Select your birth date"
								className={cn(fieldState.invalid && "bg-destructive/50")}
							/>
						</FormControl>
						{description && <FormDescription>{description}</FormDescription>}
					</FormItem>
				)
			}}
		/>
	)
}
