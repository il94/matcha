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
	initialValue?: Date
}

export default function DatePickerField<T extends FieldValues>({
	control,
	name,
	label,
	description,
	initialValue,
	...props
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
								className={cn(
									props.className,
									fieldState.invalid && "bg-destructive/50",
								)}
								initialValue={initialValue}
								defaultMonth={props.defaultMonth}
								toDate={props.toDate}
							/>
						</FormControl>
						{description && <FormDescription>{description}</FormDescription>}
					</FormItem>
				)
			}}
		/>
	)
}
