import { cn } from "@/lib/utils"

type ErrorStateProps = {
	message?: string
	className?: string
}

function ErrorState({
	message = "Something went wrong. Please try again later.",
	className,
}: ErrorStateProps) {
	return (
		<p className={cn("py-8 text-center text-sm opacity-50", className)}>
			{message}
		</p>
	)
}

export { ErrorState }
