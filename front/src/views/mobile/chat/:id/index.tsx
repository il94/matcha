import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeftIcon, PhoneIcon, SendIcon, VideoIcon } from "lucide-react"
import dayjs from "@/lib/dayjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ui/error-state"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import {
	FormEvent,
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"
import useId from "@/hooks/useId"
import { useQuery } from "@tanstack/react-query"
import getUserChatConversation from "@/services/getUserChatConversation"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import useNavigateFrom from "@/hooks/useNavigateFrom"
import { useNavigate } from "react-router"
import socketSend from "@/lib/socketSend"
import { cn } from "@/lib/utils"

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
				<p className="w-fit rounded-2xl bg-secondary px-4 py-2 text-sm text-secondary-foreground">
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
				<p className="w-fit rounded-2xl bg-gray-300 px-4 py-2 text-sm text-background">
					{children}
				</p>
			</div>
		</div>
	)
}

function MessagesSkeleton() {
	const bubbles = [
		"h-9 w-1/2",
		"h-16 w-2/5",
		"h-9 w-3/5",
		"h-20 w-1/3",
		"h-9 w-1/2",
		"h-14 w-2/5",
	]

	return (
		<>
			{bubbles.map((bubble, index) =>
				index % 2 === 0 ? (
					<div key={index} className="flex items-end gap-x-2">
						<Skeleton className="size-7 shrink-0 rounded-full" />
						<Skeleton className={cn("rounded-2xl", bubble)} />
					</div>
				) : (
					<div key={index} className="flex justify-end">
						<Skeleton className={cn("rounded-2xl", bubble)} />
					</div>
				),
			)}
		</>
	)
}

export default function ChatIdPage() {
	const { user, socket } = useAuthOutletContext()
	const chatId = useId()
	const [input, setInput] = useState("")
	const [messages, setMessages] = useState<Message[]>([])

	const {
		data: chat,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["chat", { chatId }],
		queryFn: DEBUG_ERRORS.chatConversation
			? forcedError
			: () => getUserChatConversation({ chatId }),
	})

	useEffect(() => {
		if (chat?.messages) {
			setMessages(chat.messages)
		}
	}, [chat])

	const scrollBottomRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		scrollBottomRef.current?.scrollIntoView()
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const onMessage = useCallback(
		(event: MessageEvent) => {
			const data = JSON.parse(event.data)

			if (data.type === "message") {
				setMessages((prevMessages) => {
					return [
						...prevMessages,
						{
							authorId: data.authorId,
							createdAt: new Date(data.createdAt).toISOString(),
							content: data.content,
							avatar: data.avatar,
						},
					]
				})
			}
		},
		[setMessages],
	)

	useEffect(() => {
		if (!socket) return

		socket.addEventListener("message", onMessage)
		return () => {
			socket.removeEventListener("message", onMessage)
		}
	}, [onMessage, socket])

	const navigate = useNavigate()
	const navigateFrom = useNavigateFrom()

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		socketSend(socket, "message", {
			content: input,
			chatId,
		})

		setMessages((prevMessages) => {
			if (!prevMessages) return []
			return [
				...prevMessages,
				{
					authorId: user.id,
					createdAt: new Date().toISOString(),
					content: input,
					avatar: user.principalPicture.name,
				},
			]
		})
		setInput("")
		scrollToBottom()
	}

	return (
		<div className="relative flex h-full flex-col items-center overflow-y-hidden">
			<div className="flex w-full items-center border-b border-b-button p-3">
				<Button onClick={() => navigate(-1)} variant="ghost" size="icon">
					<ArrowLeftIcon className="size-9" />
				</Button>
				<button
					onClick={() => navigateFrom(`/preview/${chat?.id}`)}
					disabled={isPending}
					className="ml-3 flex grow items-center gap-x-1.5"
				>
					{isPending || isError ? (
						<>
							<Skeleton className="size-9 rounded-full" />
							<Skeleton className="h-5 w-32" />
						</>
					) : (
						<>
							<img
								src={chat.avatar}
								className="size-9 rounded-full object-cover"
							/>
							<p className="text-lg font-bold">{chat.title}</p>
						</>
					)}
				</button>
				<div className="flex items-center gap-x-3">
					<PhoneIcon className="size-7" />
					<VideoIcon className="size-8" />
				</div>
			</div>

			<ScrollArea className="w-full px-3">
				<div className="relative space-y-2.5 py-2.5 pb-16">
					{isPending ? (
						<MessagesSkeleton />
					) : isError ? (
						<ErrorState message="We couldn't load this conversation. Please try again later." />
					) : (
						messages.map((message, index) => {
							const previousDate =
								index > 0 ? messages[index - 1].createdAt : null
							const currentDate = message.createdAt
							const diff = dayjs(currentDate).diff(previousDate, "hours")
							const Date = !previousDate || diff > 8 ? ChatDate : null

							return (
								<Fragment key={index}>
									{Date && <Date date={message.createdAt} />}
									{message.authorId === user.id ? (
										<ChatUser>{message.content}</ChatUser>
									) : (
										<ChatSender avatar={chat.avatar}>
											{message.content}
										</ChatSender>
									)}
								</Fragment>
							)
						})
					)}
					<div ref={scrollBottomRef} />
				</div>
			</ScrollArea>
			<form
				onSubmit={handleSubmit}
				className="absolute bottom-3 z-10 flex h-10 w-full gap-2 px-3"
			>
				<Input
					onChange={(e) => setInput(e.target.value)}
					value={input}
					placeholder="Message..."
					className="h-full rounded-xl bg-input"
				/>
				<Button disabled={input.length === 0} className="h-full rounded-xl">
					<SendIcon />
				</Button>
			</form>
			<div className="backdrop absolute bottom-0 h-12 w-full backdrop-blur-sm" />
		</div>
	)
}
