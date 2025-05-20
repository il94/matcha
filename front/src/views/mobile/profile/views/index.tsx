import getUserViews from "@/services/getUserViews"
import { useQuery } from "@tanstack/react-query"
import UserList from "../UserList"

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
		<main className="flex h-full flex-col overflow-y-hidden px-1.5 pt-6">
			<h2 className="pl-1.5 text-2xl">Views</h2>
			<UserList users={users} />
		</main>
	)
}
