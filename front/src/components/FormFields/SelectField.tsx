import { Control, FieldValues, Path } from "react-hook-form"
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "../ui/form"
import { SelectHTMLAttributes } from "react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select"
import { MultiSelect } from "@/components/ui/multi-select"

type FieldProps<T extends FieldValues> =
	SelectHTMLAttributes<HTMLSelectElement> & {
		control: Control<T>
		name: Path<T>
		items: { label: string; value: string }[]
		isMulti?: boolean
		label?: string
		description?: string
		placeholder?: string
	}

export default function SelectField<T extends FieldValues>({
	control,
	name,
	items,
	isMulti,
	label,
	description,
	...props
}: FieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				return (
					<FormItem>
						{label && <FormLabel>{label}</FormLabel>}
						<FormControl>
							{isMulti ? (
								<MultiSelect
									onValueChange={field.onChange}
									options={items}
									placeholder={props.placeholder}
								/>
							) : (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue {...props} />
									</SelectTrigger>
									<SelectContent>
										{items.map((item) => {
											return (
												<SelectItem
													key={`select_item_${item.label}_${item.value}`}
													value={item.value}
												>
													{item.label}
												</SelectItem>
											)
										})}
									</SelectContent>
								</Select>
							)}
						</FormControl>

						{description && <FormDescription>{description}</FormDescription>}
					</FormItem>
				)
			}}
		/>
	)
}
