import getUserLikes from "@/services/getUserLikes"
import { useQuery } from "@tanstack/react-query"
import UserList, { UserListSkeleton } from "../UserList"
import { Button } from "@/components/ui/button"
import { ErrorState } from "@/components/ui/error-state"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import { useNavigate } from "react-router"

export default function ProfileLikesPage() {
	const navigate = useNavigate()

	const {
		data: users,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["likes"],
		queryFn: DEBUG_ERRORS.profileLikes ? forcedError : getUserLikes,
	})

	return (
		<main className="flex h-full flex-col justify-between overflow-y-hidden px-1.5 pb-6 pt-6">
			<h2 className="pl-1.5 text-2xl">Likes</h2>
			{isPending ? (
				<UserListSkeleton />
			) : isError ? (
				<ErrorState
					className="m-auto"
					message="We couldn't load who's into you. Try again in a bit !"
				/>
			) : (
				<UserList users={users} />
			)}
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
