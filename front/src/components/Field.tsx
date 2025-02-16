import { Control, FieldValues, Path } from "react-hook-form"
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "./ui/form"
import { Input } from "./ui/input"
import { InputHTMLAttributes, useState } from "react"
import { cn } from "@/lib/utils"
import { EyeClosedIcon, EyeIcon } from "lucide-react"
import { Button } from "./ui/button"

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
	const [showPassword, setShowPassword] = useState(false)

	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<div className="relative">
							<Input
								{...field}
								{...props}
								type={
									props.type === "password" && showPassword
										? "text"
										: props.type
								}
								className={cn(
									props.className,
									fieldState.invalid && "bg-destructive/50",
									props.type === "password" && "relative",
								)}
							/>
							{props.type === "password" && (
								<Button
									onClick={() => setShowPassword(!showPassword)}
									type="button"
									variant={fieldState.invalid ? "destructive" : "ghost"}
									className={cn(
										"absolute right-0 top-0 h-full rounded-l-none px-3",
										fieldState.invalid ? "bg-destructive/30" : "bg-accent/70",
									)}
								>
									{showPassword ? (
										<EyeClosedIcon className="size-6" />
									) : (
										<EyeIcon className="size-6" />
									)}
								</Button>
							)}
						</div>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					{/* <FormMessage /> */}
				</FormItem>
			)}
		/>
	)
}
