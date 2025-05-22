import AnimateHeart from "@/components/AnimateHeart"
import { Button } from "@/components/ui/button"
import ActionButtonsDialog from "./ActionButtonsDialog"
import AnimateDislike from "@/components/AnimateDislike"

type ActionButtonsProps = {
	onLike?: () => void
	onDeleteLike?: () => void
	onDislike?: () => void
	isLiked?: boolean
	isDisliked?: boolean
	heLiked?: boolean
	isMatched?: boolean
	disabled?: boolean
}

export default function ActionButtons({
	onLike,
	onDeleteLike,
	onDislike,
	isLiked,
	isDisliked,
	heLiked,
	isMatched,
	disabled,
}: ActionButtonsProps) {
	return (
		<div className="flex h-16 w-full items-center justify-center gap-4">
			<Button
				onClick={isLiked || isMatched ? onDeleteLike : onDislike}
				size="icon"
				variant="ghost"
				disabled={disabled || isDisliked}
				className="size-16 rounded-full"
			>
				<AnimateDislike
					isLiked={isLiked}
					isDisliked={isDisliked}
					isMatched={false}
				/>
			</Button>

			<ActionButtonsDialog />

			<Button
				onClick={onLike}
				size="icon"
				variant="ghost"
				disabled={disabled || isMatched || isLiked}
				className="size-16 rounded-full"
			>
				<AnimateHeart
					isLiked={isLiked}
					heLiked={heLiked}
					isMatched={isMatched}
				/>
			</Button>
		</div>
	)
}
