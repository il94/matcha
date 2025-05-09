import { Button } from "@/components/ui/button"
import { ChevronRightIcon } from "lucide-react"

type SectionButtonProps = {
	label: string
	onClick: () => void
}

export default function SectionButton({ label, onClick }: SectionButtonProps) {
	return (
		<Button
			onClick={onClick}
			variant="outline"
			className="h-10 w-full justify-between"
		>
			{label}
			<ChevronRightIcon className="h-4 w-4" />
		</Button>
	)
}
