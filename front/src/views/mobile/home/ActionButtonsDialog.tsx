import AnimateDislike from "@/components/AnimateDislike"
import AnimateHeart from "@/components/AnimateHeart"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { InfoIcon } from "lucide-react"
import { ReactNode } from "react"

type ActionItemProps = {
	component: ReactNode
	children: string
}

function ActionItem({ component, children }: ActionItemProps) {
	return (
		<span className="flex items-center gap-3">
			{component}
			<p className="text-sm">{children}</p>
		</span>
	)
}

export default function ActionButtonsDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="icon" variant="ghost" className="size-12 rounded-full">
					<InfoIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="gap-6">
				<ActionItem component={<AnimateDislike />}>
					Not your type ? Tap to pass.
				</ActionItem>
				<ActionItem component={<AnimateDislike isDisliked />}>
					No match made here.
				</ActionItem>
				<ActionItem component={<AnimateDislike isLiked />}>
					Changed your mind? Tap to undo the like.
				</ActionItem>
				<ActionItem component={<AnimateHeart />}>
					Feeling a spark? Tap to like.
				</ActionItem>
				<ActionItem component={<AnimateHeart isLiked />}>
					You've shown them some love.
				</ActionItem>
				<ActionItem component={<AnimateHeart heLiked />}>
					They liked you first… Care to return the favor ?
				</ActionItem>
				<ActionItem component={<AnimateHeart isMatched />}>
					You've matched ! Time to start the conversation.
				</ActionItem>
			</DialogContent>
		</Dialog>
	)
}
