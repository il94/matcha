import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeftIcon, PhoneIcon, SendIcon, VideoIcon } from "lucide-react"
import dayjs from "@/lib/dayjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Fragment, useEffect, useRef } from "react"
import useId from "@/hooks/useId"
import { useQuery } from "@tanstack/react-query"
import getChatMessages from "@/services/getChatMessages"

type ChatDateProps = {
	date: string
}

function ChatDate({ date }: ChatDateProps) {
	return (
		<p className="text-center text-xs opacity-70">
			{dayjs(date).format("DD/MM/YYYY - hh:mm A")}
		</p>
	)
}

type ChatUserProps = {
	children: string
}

function ChatUser({ children }: ChatUserProps) {
	return (
		<div className="flex justify-end">
			<div className="flex w-3/5 justify-end">
				<p className="w-fit rounded-2xl bg-secondary px-4 py-2 text-sm text-primary-foreground">
					{children}
				</p>
			</div>
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
			<div className="w-3/5">
				<p className="w-fit rounded-2xl bg-gray-300 px-4 py-2 text-sm text-primary-foreground">
					{children}
				</p>
			</div>
		</div>
	)
}

export default function ChatIdPage() {
	const chatId = useId()

	const {
		data: messages,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["messages", { chatId }],
		queryFn: () => getChatMessages({ chatId }),
	})

	const scrollAreaRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!scrollAreaRef.current) return
		scrollAreaRef.current.scrollIntoView(false)
	}, [])

	if (isError) throw error

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

			<ScrollArea className="w-full overflow-y-scroll px-3">
				<div className="relative space-y-2.5 py-2.5 pb-16" ref={scrollAreaRef}>
					{isPending ? (
						<p>load</p>
					) : (
						messages.map((message, index) => {
							const previousDate =
								index > 0 ? messages[index - 1].createdAt : null
							const currentDate = message.createdAt
							const diff = dayjs(currentDate).diff(previousDate, "hours")
							const Date = !previousDate || diff > 8 ? ChatDate : null

							return (
								<Fragment key={message.id}>
									{Date && <Date date={message.createdAt} />}
									{message.authorId ===
									"f09206cc-bac5-4f20-8df2-0abdacff9e57" ? (
										<ChatUser>{message.content}</ChatUser>
									) : (
										<ChatSender avatar={message.avatar}>
											{message.content}
										</ChatSender>
									)}
								</Fragment>
							)
						})
					)}
				</div>
			</ScrollArea>
			<div className="absolute bottom-3 z-10 flex h-10 w-full gap-2 px-3">
				<Input
					placeholder="Message..."
					className="h-full rounded-xl bg-input"
				/>
				<Button className="h-full rounded-xl">
					<SendIcon />
				</Button>
			</div>
			<div className="backdrop absolute bottom-0 h-12 w-full backdrop-blur-sm" />
		</div>
	)
}
