import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ui/error-state"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import getUserChats from "@/services/getUserChats"
import dayjs from "@/lib/dayjs"
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

// "matches" = connexions sans message échangé, "messages" = conversations entamées.
export type ChatListFilter = "all" | "matches" | "messages"

type ChatListProps = {
	filter?: ChatListFilter
	emptyMessage?: string
	className?: string
}

export default function ChatList({
	filter = "all",
	emptyMessage,
	className,
}: ChatListProps) {
	const {
		data: chats,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["chats"],
		queryFn: DEBUG_ERRORS.chatList ? forcedError : getUserChats,
	})

	if (isError)
		return (
			<div
				className={cn("flex grow items-center justify-center px-3", className)}
			>
				<ErrorState message="We couldn't pull up your chats. Give it another try !" />
			</div>
		)

	if (isPending)
		return (
			<ScrollArea className={cn("my-4 px-3", className)}>
				{Array.from({ length: 5 }).map((_, i) => (
					<ChatSkeleton key={i} />
				))}
			</ScrollArea>
		)

	const visibleChats = chats.filter((chat) =>
		filter === "matches"
			? !chat.lastMessage
			: filter === "messages"
				? chat.lastMessage
				: true,
	)

	if (!visibleChats.length && emptyMessage)
		return (
			<div
				className={cn("flex grow items-center justify-center px-6", className)}
			>
				<p className="text-center text-sm opacity-50">{emptyMessage}</p>
			</div>
		)

	return (
		<ScrollArea className={cn("my-4 px-3", className)}>
			{visibleChats.map((chat) => (
				<Link to={`/chat/${chat.id}`} key={chat.id}>
					<Chat chat={chat} />
				</Link>
			))}
		</ScrollArea>
	)
}
