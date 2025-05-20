import { ScrollArea } from "@/components/ui/scroll-area"
import getUserViews from "@/services/getUserViews"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"

type UserListItemProps = {
	userId: User["id"]
	src: User["principalPicture"]["name"]
	username: User["firstName"]
}

function UserListItem({ userId, src, username }: UserListItemProps) {
	const navigate = useNavigate()

	return (
		<li className="last:pb-4">
			<button
				onClick={() => navigate(`/preview/${userId}`)}
				className="flex w-full items-center gap-1.5 py-1.5"
			>
				<img src={src} className="size-10 rounded-full object-cover" />
				<p>{username}</p>
			</button>
		</li>
	)
}

export default function ProfileViewsPage() {
	const {
		data: users,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["views"],
		queryFn: getUserViews,
	})

	if (isError) throw error // TODO
	if (isPending) return <p>Load</p> // TODO

	return (
		<main className="flex h-full flex-col overflow-y-hidden px-3 pt-6">
			<h2 className="text-2xl">Views</h2>
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
		</main>
	)
}
