import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"
import { ChangeEvent, useState } from "react"

type InputSelectProps = {
	onInput: (value: ChangeEvent<HTMLTextAreaElement>) => void
	onSelect: (value: string) => void
	input: string
	items?: string[]
	isLoading?: boolean
	placeholder?: string

	className?: string
}

export default function InputSelect({
	onInput,
	onSelect,
	input,
	items,
	isLoading,
	placeholder,
	className,
}: InputSelectProps) {
	const [isFocusInput, setIsFocusInput] = useState(false)

	return (
		<div
			className={cn(
				"flex max-w-full flex-col overflow-hidden rounded-lg",
				isFocusInput && "outline-none ring-1 ring-ring",
			)}
		>
			<Textarea
				onInput={onInput}
				onFocus={() => setIsFocusInput(true)}
				onBlur={() => setIsFocusInput(false)}
				value={input}
				placeholder={placeholder}
				autoSize
				className={cn("text-sm", className)}
			/>
			{isLoading ? (
				<Button
					type="button"
					variant="outline"
					disabled
					className={cn(
						"justify-center rounded-none px-3 py-1 last:rounded-b-lg",
					)}
				>
					<Loader2Icon className="animate-spin" />
				</Button>
			) : (
				<>
					{items?.map((suggestion, index) => (
						<Button
							key={index}
							onClick={() => onSelect(suggestion)}
							type="button"
							variant="outline"
							className={cn(
								"justify-start rounded-none px-3 py-1 last:rounded-b-lg",
							)}
						>
							<p className="truncate">{suggestion}</p>
						</Button>
					))}

					{items?.length === 0 && (
						<Button
							type="button"
							variant="outline"
							disabled
							className={cn(
								"justify-start rounded-none px-3 py-1 last:rounded-b-lg",
							)}
						>
							<p className="truncate">No results found</p>
						</Button>
					)}
				</>
			)}
		</div>
	)
}
