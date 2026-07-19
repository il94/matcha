import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"

type SectionButtonProps = {
	label: string
	onClick: () => void
	selected?: boolean
}

export default function SectionButton({
	label,
	onClick,
	selected = false,
}: SectionButtonProps) {
	return (
		<Button
			onClick={onClick}
			variant="outline"
			className={cn(
				"h-10 w-full justify-between",
				selected &&
					"border-transparent bg-secondary/60 hover:border-transparent hover:bg-secondary hover:text-foreground",
			)}
		>
			{label}
			<ChevronRightIcon className="h-4 w-4" />
		</Button>
	)
}
