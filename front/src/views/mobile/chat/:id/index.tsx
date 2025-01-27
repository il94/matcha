import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeftIcon, PhoneIcon, SendIcon, VideoIcon } from "lucide-react"
import dayjs from "@/lib/dayjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

type ChatDateProps = {
	date: string
}

function ChatDate({ date }: ChatDateProps) {
	return <p className="text-center text-xs">{date}</p>
}

type ChatUserProps = {
	children: string
}

function ChatUser({ children }: ChatUserProps) {
	return (
		<div className="flex justify-end">
			<p className="w-3/5 rounded-2xl bg-secondary px-4 py-2 text-sm text-primary-foreground">
				{children}
			</p>
		</div>
	)
}

type ChatSenderProps = {
	avatar: string
	children: string
}

function ChatSender({ avatar, children }: ChatSenderProps) {
	return (
		<div className="flex items-end justify-start gap-x-2">
			<img src={avatar} className="size-7 rounded-full object-cover" />
			<p className="w-3/5 rounded-2xl bg-gray-300 px-4 py-2 text-sm text-primary-foreground">
				{children}
			</p>
		</div>
	)
}

export default function ChatIdPage() {
	const scrollAreaRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!scrollAreaRef.current) return
		scrollAreaRef.current.scrollIntoView(false)
	}, [])

	return (
		<div className="relative flex h-full flex-col items-center overflow-y-hidden">
			<div className="flex w-full items-center border-b border-b-button p-3">
				<ArrowLeftIcon className="size-9" />
				<div className="ml-3 flex grow items-center gap-x-1.5">
					<img src="/model.JPG" className="size-9 rounded-full object-cover" />
					<p className="text-lg font-bold">Loremosowddsd</p>
				</div>
				<div className="flex items-center gap-x-3">
					<PhoneIcon className="size-7" />
					<VideoIcon className="size-8" />
				</div>
			</div>

			<ScrollArea className="overflow-y-scroll px-3">
				<div className="relative space-y-2.5 py-2.5" ref={scrollAreaRef}>
					<ChatDate date={dayjs().format("MM/DD/YYYY - hh:mm A")} />
					<ChatUser>Salut tu es très beau quand même c'est vrai</ChatUser>
					<ChatSender avatar="/model.JPG">
						Salut tu es très beau quand même c'est vrai
					</ChatSender>
					<ChatUser>Salut tu es très beau quand</ChatUser>
					<ChatSender avatar="/model.JPG">
						Salut tu es très beau quand
					</ChatSender>
					<ChatDate date={dayjs().format("MM/DD/YYYY - hh:mm A")} />
					<ChatUser>
						Salut tu es très beau quand même c’est vraiSalut tu es très beau
						quand même c’est vraiSalut tu es très beau quand même c’est
						vraiSalut tu es très beau quand même c’est vrai
					</ChatUser>
					<ChatSender avatar="/model.JPG">
						Salut tu es très beau quand même c’est vraiSalut tu es très beau
						quand même c’est vraiSalut tu es très beau quand même c’est
						vraiSalut tu es très beau quand même c’est vrai
					</ChatSender>
					<ChatUser>Salut tu es très beau quand même c’est vrai</ChatUser>
					<ChatUser>Salut tu es très beau quand même c’est vrai</ChatUser>
					<ChatUser>Salut tu es très beau quand même c’est vrai</ChatUser>
					<ChatUser>Salut tu es très beau quand même c’est vrai</ChatUser>

					<div className="sticky bottom-3 z-10 flex h-10 gap-2">
						<Input
							placeholder="Message..."
							className="h-full rounded-xl bg-input"
						/>
						<Button className="h-full rounded-xl">
							<SendIcon />
						</Button>
					</div>
				</div>
				<div className="absolute bottom-0 h-12 w-full backdrop-blur-sm" />
			</ScrollArea>
		</div>
	)
}
