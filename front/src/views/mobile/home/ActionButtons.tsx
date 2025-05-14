import AnimateHeart from "@/components/AnimateHeart"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

type ActionButtonsProps = {
	onLike: () => void
	onDislike: () => void
	isPreview?: boolean
}

export default function ActionButtons({
	onLike,
	onDislike,
	isPreview,
}: ActionButtonsProps) {
	return (
		<div className="flex h-16 w-full items-center justify-evenly">
			<Button
				onClick={onDislike}
				size="icon"
				variant="ghost"
				disabled={isPreview}
				className="size-16 rounded-full"
			>
				<XIcon className="size-10 stroke-red-400 stroke-[3.5]" />
			</Button>
			<Button
				onClick={onLike}
				size="icon"
				variant="ghost"
				disabled={isPreview}
				className="size-16 rounded-full"
			>
				<AnimateHeart />
			</Button>
		</div>
	)
}
