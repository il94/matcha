import { useEffect } from "react"
import { ChevronLeftIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import dayjs from "@/lib/dayjs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ui/error-state"
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

function notificationLabel(notification: AppNotification) {
	const name = (
		<span className="font-semibold">{notification.sender.username}</span>
	)

	switch (notification.type) {
		case "like":
			return <>{name} liked you.</>
		case "match":
			return <>New match with {name} !</>
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
	notifications: AppNotification[]
	isPending: boolean
	isError?: boolean
	onClose: () => void
}

export default function NotificationsSheet({
	isOpen,
	notifications,
	isPending,
	isError,
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

	useEffect(() => {
		if (isOpen && notifications.some((notification) => !notification.read)) {
			markRead()
		}
	}, [isOpen, notifications, markRead])

	return (
		<div
			className={cn(
				"fixed top-12 z-20 flex h-[calc(100%-56px-48px)] w-full flex-col overflow-hidden bg-background transition-transform",
				"lg:left-[360px] lg:top-0 lg:h-dvh lg:w-[360px] lg:border-r lg:border-button",
				isOpen ? "translate-x-0" : "translate-x-full lg:hidden",
			)}
		>
			<div className="flex shrink-0 items-center gap-2 border-b border-b-button p-2">
				<ChevronLeftIcon
					onClick={onClose}
					className="size-8 shrink-0 cursor-pointer"
				/>
				<p className="text-lg font-bold">Notifications</p>
			</div>

			<ScrollArea className="grow">
				{isPending ? (
					<NotificationsSkeleton />
				) : isError ? (
					<ErrorState
						className="px-4"
						message="We couldn't load your notifications. Try again in a bit !"
					/>
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
