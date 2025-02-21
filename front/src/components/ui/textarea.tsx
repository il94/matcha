import * as React from "react"

import { cn } from "@/lib/utils"

const autoResize = (target: HTMLTextAreaElement) => {
	target.style.height = "0px"
	target.style.height = target.scrollHeight + 2 + "px"
}

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea"> & { autoSize?: boolean }
>(({ className, autoSize, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				"flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				autoSize && "resize-none",
				className,
			)}
			onInput={
				autoSize
					? (e) => autoResize(e.target as HTMLTextAreaElement)
					: props.onInput
			}
			ref={ref}
			{...props}
		/>
	)
})
Textarea.displayName = "Textarea"

export { Textarea }
