import getUserViews from "@/services/getUserViews"
import { useQuery } from "@tanstack/react-query"
import UserList, { UserListSkeleton } from "../UserList"
import { Button } from "@/components/ui/button"
import { ErrorState } from "@/components/ui/error-state"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import { useNavigate } from "react-router"

export default function ProfileViewsPage() {
	const navigate = useNavigate()

	const {
		data: users,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["views"],
		queryFn: DEBUG_ERRORS.profileViews ? forcedError : getUserViews,
	})

	return (
		<main className="flex h-full flex-col justify-between overflow-y-hidden px-1.5 pb-6 pt-6">
			<h2 className="pl-1.5 text-2xl">Views</h2>
			{isPending ? (
				<UserListSkeleton />
			) : isError ? (
				<ErrorState
					className="m-auto"
					message="We couldn't load your profile views. Please try again later."
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
