import { Control, FieldValues, Path } from "react-hook-form"
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "../ui/form"
import { Input } from "../ui/input"
import { ChangeEvent, InputHTMLAttributes, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { PlusIcon, XIcon } from "lucide-react"
import imageCompression from "browser-image-compression"

type FieldProps<T extends FieldValues> =
	InputHTMLAttributes<HTMLInputElement> & {
		control: Control<T>
		name: Path<T>
		label?: string
		description?: string
		withClearButton?: boolean
		initialValue?: string
	}

export default function InputImageFileField<T extends FieldValues>({
	control,
	name,
	label,
	description,
	withClearButton,
	initialValue,
	...props
}: FieldProps<T>) {
	const [imagePreview, setImagePreview] = useState(initialValue)

	const inputRef = useRef<HTMLInputElement>(null)
	const fileRef = control.register(name)

	const handleClick = () => {
		inputRef.current?.click()
	}

	async function compressImage(file: File) {
		const options = {
			maxSizeMB: 3,
			maxWidthOrHeight: 1440,
			initialQuality: 0.5,
			useWebWorker: true,
			name: file.name,
		}

		const compressedFile = await imageCompression(file, options)
		const renamedFile = new File([compressedFile], file.name, {
			type: compressedFile.type,
			lastModified: compressedFile.lastModified,
		})

		return renamedFile
	}

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
								type="file"
								accept="image/jpeg,image/png,image/webp"
								{...props}
								{...fileRef}
								onChange={async (event) => {
									const file = event.target?.files?.[0] ?? undefined
									if (!file) return
									try {
										const fileCompressed = await compressImage(file)
										field.onChange(fileCompressed)
										setImagePreview(URL.createObjectURL(fileCompressed))
										props.onChange?.(event)
									} catch {
										control.setError(name, {
											message:
												"This file doesn't seem ready to shine, try another one !",
										})
									}
								}}
								className="hidden"
								ref={inputRef}
							/>
							<button
								onClick={handleClick}
								type="button"
								className={cn(
									props.className,
									fieldState.invalid && "bg-destructive/50",
								)}
								disabled={props.disabled}
							>
								{imagePreview ? (
									<img
										src={imagePreview}
										alt="preview"
										className="h-full w-full object-cover"
									/>
								) : (
									<PlusIcon className="size-4" />
								)}
							</button>
							{imagePreview && withClearButton && (
								<Button
									onClick={() => {
										setImagePreview(undefined)
										field.onChange(undefined)
										props.onChange?.(
											null as unknown as ChangeEvent<HTMLInputElement>,
										)
									}}
									variant="destructive"
									size="icon"
									className="absolute right-0 top-0 size-4 -translate-y-1/3 translate-x-1/3 rounded-full bg-red-400"
								>
									<XIcon className="size-3.5" />
								</Button>
							)}
						</div>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
				</FormItem>
			)}
		/>
	)
}
