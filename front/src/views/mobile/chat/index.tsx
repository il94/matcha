import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ui/error-state"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import { useQuery } from "@tanstack/react-query"
import dayjs from "@/lib/dayjs"
import { Calendar, MapPinned } from "lucide-react"
import { Link } from "react-router"
import getUserChats from "@/services/getUserChats"
import { cn } from "@/lib/utils"

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
					<p className={cn("truncate", !chat.lastMessage && "opacity-50")}>
						{chat.lastMessage?.content ?? "New match !"}
					</p>
					{chat.lastMessage && (
						<p className="shrink-0">
							&nbsp;·&nbsp;{dayjs(chat.lastMessage.createdAt).fromNow()}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

function ChatSkeleton() {
	return (
		<div className="flex items-center gap-x-2.5 py-2">
			<Skeleton className="size-14 shrink-0 rounded-full" />
			<div className="w-full space-y-2">
				<Skeleton className="h-4 w-1/3" />
				<Skeleton className="h-4 w-2/3" />
			</div>
		</div>
	)
}

export default function ChatPage() {
	const {
		data: chats,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["chats"],
		queryFn: DEBUG_ERRORS.chatList ? forcedError : getUserChats,
	})

	return (
		<main className="flex h-full flex-col overflow-y-hidden">
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
			{isError ? (
				<div className="flex grow items-center justify-center px-3">
					<ErrorState message="We couldn't pull up your chats. Give it another try!" />
				</div>
			) : (
				<ScrollArea className="my-4 px-3">
					{isPending
						? Array.from({ length: 5 }).map((_, i) => <ChatSkeleton key={i} />)
						: chats.map((chat) => {
								return (
									<Link to={`/chat/${chat.id}`} key={chat.id}>
										<Chat chat={chat} />
									</Link>
								)
							})}
				</ScrollArea>
			)}
		</main>
	)
}
