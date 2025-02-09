import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import getUserChats from "@/services/getUserChats"
import { useQuery } from "@tanstack/react-query"
import dayjs from "@/lib/dayjs"
import { Calendar, MapPinned } from "lucide-react"
import { Link } from "react-router"

type ChatProps = {
	chat: Chat
}

function Chat({ chat }: ChatProps) {
	return (
		<div className="flex items-center gap-x-2.5 py-2">
			<img
				src={chat.avatar}
				className="size-14 shrink-0 rounded-full object-cover"
			/>
			<div className="w-full overflow-hidden text-sm">
				<p className="font-bold">{chat.title}</p>
				<div className="flex">
					<p className="truncate">{chat.lastMessage.content}</p>
					<p className="shrink-0">
						&nbsp;·&nbsp;{dayjs(chat.lastMessage.createdAt).fromNow()}
					</p>
				</div>
			</div>
		</div>
	)
}

export default function ChatPage() {
	const {
		data: chats,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["chats"],
		queryFn: getUserChats,
	})

	if (isPending) return <div>Loading...</div> // TODO
	if (isError) throw error // TODO

	return (
		<div className="flex h-full flex-col overflow-y-hidden">
			<div className="flex h-24 shrink-0 items-center justify-center gap-3 border-b border-b-button px-3">
				<Button variant="dark" className="h-11 w-full rounded-xl">
					<MapPinned />
					Discover
				</Button>
				<Button variant="dark" className="h-11 w-full rounded-xl">
					<Calendar />
					Dates
				</Button>
			</div>
			<ScrollArea className="my-4 overflow-y-scroll px-3">
				{chats.map((chat) => {
					return (
						<Link to={`/chat/${chat.id}`} key={chat.id}>
							<Chat chat={chat} />
						</Link>
					)
				})}
			</ScrollArea>
		</div>
	)
}
