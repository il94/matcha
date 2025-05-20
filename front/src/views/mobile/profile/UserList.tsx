import { ScrollArea } from "@/components/ui/scroll-area"
import UserListItem from "./UserListItem"

type UserListProps = {
	users: Pick<User, "id" | "firstName" | "principalPicture">[]
}

export default function UserList({ users }: UserListProps) {
	return (
		<ScrollArea className="pt-1">
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
