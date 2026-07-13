import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type MessageToastProps = {
	id: string | number
	authorUsername?: string
	authorFirstName?: string
	avatar?: string
	content: string
	onOpen: () => void
}

export default function MessageToast({
	id,
	authorUsername,
	authorFirstName,
	avatar,
	content,
	onOpen,
}: MessageToastProps) {
	return (
		<button
			onClick={() => {
				onOpen()
				toast.dismiss(id)
			}}
			className="flex w-full items-center gap-3 rounded-xl border bg-background p-3 text-left shadow-lg"
		>
			<Avatar className="size-11 shrink-0">
				<AvatarImage src={avatar} className="object-cover" />
				<AvatarFallback>
					{(authorFirstName ?? authorUsername)?.[0]?.toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0 grow">
				<p className="text-sm font-semibold">{authorUsername}</p>
				<p className="line-clamp-2 text-sm text-muted-foreground">{content}</p>
			</div>
		</button>
	)
}
