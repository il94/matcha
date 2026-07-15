import { cn } from "@/lib/utils"

type ErrorStateProps = {
	message?: string
	className?: string
}

function ErrorState({
	message = "Looks like something went wrong. Don't worry, we're on it, try again shortly.",
	className,
}: ErrorStateProps) {
	return (
		<p className={cn("py-8 text-center text-sm opacity-50", className)}>
			{message}
		</p>
	)
}

export { ErrorState }
