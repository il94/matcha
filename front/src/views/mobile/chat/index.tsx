import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import getUserChats from "@/services/getUserChats"
import { useQuery } from "@tanstack/react-query"
import { Calendar, MapPinned } from "lucide-react"
import { Link } from "react-router"

type ChatProps = {
	title: User["firstName"]
	avatar: Image["name"]
	lastMessage: Message["content"]
}

function Chat({ title, avatar, lastMessage }: ChatProps) {
	return (
		<div className="flex items-center gap-x-2.5 py-2">
			<img
				src={avatar}
				className="size-14 shrink-0 rounded-full object-cover"
			/>
			<div className="w-full overflow-hidden text-sm">
				<p className="font-bold">{title}</p>
				<div className="flex">
					<p className="truncate">{lastMessage}</p>
					<p className="shrink-0">&nbsp;·&nbsp;3d</p>
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
		queryFn: () =>
			getUserChats({ userId: "f09206cc-bac5-4f20-8df2-0abdacff9e57" }),
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
							<Chat
								title={chat.title}
								avatar={chat.avatar}
								lastMessage={chat.lastMessage}
							/>
						</Link>
					)
				})}
			</ScrollArea>
		</div>
	)
}
