import { ScrollArea } from "@/components/ui/scroll-area"
import getUserLikes from "@/services/getUserLikes"
import { useQuery } from "@tanstack/react-query"

type UserListItemProps = {
	src: User["principalPicture"]["name"]
	username: User["firstName"]
}

function UserListItem({ src, username }: UserListItemProps) {
	return (
		<li className="flex w-full items-center gap-1.5 py-1.5 last:pb-4">
			<img src={src} className="size-10 rounded-full object-cover" />
			<p>{username}</p>
		</li>
	)
}

export default function ProfileLikesPage() {
	const {
		data: users,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["likes"],
		queryFn: getUserLikes,
	})

	if (isError) throw error // TODO
	if (isPending) return <p>Load</p> // TODO

	return (
		<main className="flex h-full flex-col overflow-y-hidden px-3 pt-6">
			<h2 className="text-2xl">Likes</h2>
			<ScrollArea className="pt-1">
				<ol>
					{users.map((user) => (
						<UserListItem
							key={user.id}
							src={user.principalPicture.name}
							username={user.firstName}
						/>
					))}
				</ol>
			</ScrollArea>
		</main>
	)
}
