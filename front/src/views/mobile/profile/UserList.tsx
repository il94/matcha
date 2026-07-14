import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import UserListItem from "./UserListItem"

type UserListProps = {
	users: Pick<User, "id" | "firstName" | "principalPicture">[]
}

export default function UserList({ users }: UserListProps) {
	return (
		<ScrollArea className="h-full py-1">
			<ol>
				{users.map((user) => (
					<UserListItem
						key={user.id}
						userId={user.id}
						src={user.principalPicture.name}
						username={user.firstName}
					/>
				))}
			</ol>
		</ScrollArea>
	)
}

export function UserListSkeleton() {
	return (
		<ScrollArea className="h-full py-1">
			<ol>
				{Array.from({ length: 8 }).map((_, i) => (
					<li key={i} className="flex items-center gap-1.5 py-1.5 pl-1.5">
						<Skeleton className="size-10 shrink-0 rounded-full" />
						<Skeleton className="h-4 w-32" />
					</li>
				))}
			</ol>
		</ScrollArea>
	)
}
