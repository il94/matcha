import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const inputVariants = cva(
	"flex h-9 w-full rounded-lg border border-input bg-button px-3 py-1 text-base shadow-sm transition-colors duration-500 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			variant: {
				// default: "",
				// destructive:
				// 	"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				outline:
					"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				// secondary:
				// 	"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				// ghost: "hover:bg-accent hover:text-accent-foreground",
				// link: "text-primary underline-offset-4 hover:underline",

				// dark: "bg-button text-secondary-foreground shadow-sm hover:bg-primary",
				// destructiveDark:
				// 	"bg-button/15 text-destructive shadow-sm hover:bg-destructive/60 hover:text-destructive-foreground",
				// darkLink: "text-button hover:text-primary",
			},
		},
		// defaultVariants: {
		// 	variant: "default",
		// },
	},
)

const Input = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input"> &
		Pick<VariantProps<typeof inputVariants>, "variant">
>(({ className, type, variant, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				// "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				inputVariants({ variant, className }),
			)}
			ref={ref}
			{...props}
		/>
	)
})
Input.displayName = "Input"

export { Input, inputVariants }
