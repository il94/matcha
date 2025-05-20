import { useNavigate } from "react-router"

type UserListItemProps = {
	userId: User["id"]
	src: User["principalPicture"]["name"]
	username: User["firstName"]
}

export default function UserListItem({
	userId,
	src,
	username,
}: UserListItemProps) {
	const navigate = useNavigate()

	return (
		<li className="last:pb-4">
			<button
				onClick={() => navigate(`/preview/${userId}`)}
				className="flex w-full items-center gap-1.5 rounded-sm py-1.5 pl-1.5 transition-all hover:bg-muted/50"
			>
				<img src={src} className="size-10 rounded-full object-cover" />
				<p>{username}</p>
			</button>
		</li>
	)
}
