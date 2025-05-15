import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeftIcon, PhoneIcon, SendIcon, VideoIcon } from "lucide-react"
import dayjs from "@/lib/dayjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import { useNavigate } from "react-router"
import getUserChatConversation from "@/services/getUserChatConversation"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"

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
	const { user, socket } = useAuthOutletContext()
	const chatId = useId()
	const [input, setInput] = useState("")
	const [messages, setMessages] = useState<Message[]>([])

	const {
		data: chat,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["chat", { chatId }],
		queryFn: () => getUserChatConversation({ chatId }),
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
				console.log("Message : ", data)

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

	if (isError) throw error

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		socket.send(
			JSON.stringify({
				content: input,
				chatId,
			}),
		)

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
				<div className="ml-3 flex grow items-center gap-x-1.5">
					<img
						src={chat?.avatar}
						className="size-9 rounded-full object-cover"
					/>
					<p className="text-lg font-bold">{chat?.title}</p>
				</div>
				<div className="flex items-center gap-x-3">
					<PhoneIcon className="size-7" />
					<VideoIcon className="size-8" />
				</div>
			</div>

			<ScrollArea className="w-full overflow-y-scroll px-3">
				<div className="relative space-y-2.5 py-2.5 pb-16">
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
