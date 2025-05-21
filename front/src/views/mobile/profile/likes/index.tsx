import getUserLikes from "@/services/getUserLikes"
import { useQuery } from "@tanstack/react-query"
import UserList from "../UserList"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

export default function ProfileLikesPage() {
	const navigate = useNavigate()

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
		<main className="flex h-full flex-col justify-between overflow-y-hidden px-1.5 pb-6 pt-6">
			<h2 className="pl-1.5 text-2xl">Likes</h2>
			<UserList users={users} />
			<Button
				onClick={() => navigate(-1)}
				variant="dark"
				className="mx-1.5 h-10 rounded-xl"
			>
				Back
			</Button>
		</main>
	)
}
