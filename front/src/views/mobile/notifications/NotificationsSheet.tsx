import { useEffect } from "react"
import { ChevronLeftIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import dayjs from "@/lib/dayjs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import useNavigateFrom from "@/hooks/useNavigateFrom"
import markNotificationsRead from "@/services/markNotificationsRead"

function NotificationsSkeleton() {
	return (
		<ul className="p-2">
			{Array.from({ length: 6 }).map((_, i) => (
				<li key={i} className="flex items-center gap-3 p-2">
					<Skeleton className="size-11 shrink-0 rounded-full" />
					<div className="min-w-0 grow space-y-1.5">
						<Skeleton className="h-4 w-3/5" />
						<Skeleton className="h-3 w-16" />
					</div>
				</li>
			))}
		</ul>
	)
}

function notificationLabel(notification: Notification) {
	const name = (
		<span className="font-semibold">{notification.sender.username}</span>
	)

	switch (notification.type) {
		case "like":
			return <>{name} liked you.</>
		case "match":
			return <>New match with {name}!</>
		case "view":
			return <>{name} viewed your profile.</>
		case "unlike":
			return <>{name} no longer likes you.</>
		case "message":
			return <>{name} sent you a message.</>
	}
}

type NotificationsSheetProps = {
	isOpen: boolean
	notifications: Notification[]
	isPending: boolean
	onClose: () => void
}

export default function NotificationsSheet({
	isOpen,
	notifications,
	isPending,
	onClose,
}: NotificationsSheetProps) {
	const navigateFrom = useNavigateFrom()
	const queryClient = useQueryClient()

	const { mutate: markRead } = useMutation({
		mutationFn: markNotificationsRead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] })
		},
	})

	// Ouvrir l'écran des notifs les marque toutes comme lues (pastille retirée).
	useEffect(() => {
		if (isOpen && notifications.some((notification) => !notification.read)) {
			markRead()
		}
	}, [isOpen, notifications, markRead])

	return (
		<div
			className={cn(
				"fixed top-12 z-20 flex h-[calc(100%-56px-48px)] w-full flex-col overflow-hidden bg-background transition-transform",
				isOpen ? "translate-x-0" : "translate-x-full",
			)}
		>
			<div className="flex shrink-0 items-center gap-2 border-b border-b-button p-2">
				<ChevronLeftIcon onClick={onClose} className="size-8 shrink-0" />
				<p className="text-lg font-bold">Notifications</p>
			</div>

			<ScrollArea className="grow">
				{isPending ? (
					<NotificationsSkeleton />
				) : notifications.length === 0 ? (
					<p className="p-4 text-center text-sm text-muted-foreground">
						No notifications yet.
					</p>
				) : (
					<ul className="p-2">
						{notifications.map((notification) => (
							<li key={notification.id} className="last:pb-4">
								<button
									onClick={() => {
										navigateFrom(`/preview/${notification.sender.id}`)
										onClose()
									}}
									className="flex w-full items-center gap-3 rounded-sm p-2 text-left transition-all hover:bg-muted/50"
								>
									<Avatar className="size-11 shrink-0">
										<AvatarImage
											src={notification.sender.avatar}
											className="object-cover"
										/>
										<AvatarFallback>
											{notification.sender.firstName?.[0]?.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="min-w-0 grow">
										<p className="text-sm">{notificationLabel(notification)}</p>
										<p className="text-xs text-muted-foreground">
											{dayjs(notification.createdAt).fromNow()}
										</p>
									</div>
									{!notification.read && (
										<span className="size-2.5 shrink-0 rounded-full bg-destructive" />
									)}
								</button>
							</li>
						))}
					</ul>
				)}
			</ScrollArea>
		</div>
	)
}
