import getUserLikes from "@/services/getUserLikes"
import { useQuery } from "@tanstack/react-query"
import UserList from "../UserList"

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
		<main className="flex h-full flex-col overflow-y-hidden px-1.5 pt-6">
			<h2 className="pl-1.5 text-2xl">Views</h2>
			<UserList users={users} />
		</main>
	)
}
