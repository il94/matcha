import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import getUser from "@/services/getUser"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"

type StatProps = {
	value: number
	label: string
	isClickable?: boolean
}

function Stat({ value, label, isClickable }: StatProps) {
	const navigate = useNavigate()
	const Parent = isClickable ? "button" : "div"

	return (
		<Parent
			onClick={() => {
				if (isClickable) navigate(label.toLowerCase())
			}}
			className={cn(
				"flex w-20 flex-col items-center",
				isClickable && "cursor-pointer hover:text-primary",
			)}
		>
			<p className="text-3xl font-bold">{value}</p>
			<p
				className={cn(
					"text-1xl",
					isClickable && "underline underline-offset-8",
				)}
			>
				{label}
			</p>
		</Parent>
	)
}

export default function ProfilePage() {
	const navigate = useNavigate()

	const {
		data: user,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["user"],
		queryFn: () => getUser({}),
	})

	if (isError) throw error // TODO
	if (isPending) return <p>Load</p> // TODO

	return (
		<main className="flex h-full flex-col items-center justify-between overflow-y-hidden px-3 py-8">
			<h2 className="text-4xl">Hi, {user.firstName}</h2>

			<div className="flex h-full w-full flex-col items-center justify-evenly">
				<img
					src={user.principalPicture.name}
					className="size-32 rounded-full object-cover"
				/>
				<div className="flex w-full justify-evenly">
					<Stat value={user.views} label="Views" isClickable />
					<Stat value={user.likes} label="Likes" isClickable />
				</div>
				<div className="flex w-full justify-evenly">
					<Stat value={user.matchs} label="Matchs" />
					<Stat value={user.elo} label="Rating" />
				</div>
			</div>

			<div className="w-full space-y-3">
				<Button
					onClick={() => navigate("/settings")}
					variant="dark"
					className="h-10 w-full rounded-xl"
				>
					Edit profile
				</Button>
				<Button
					onClick={() => navigate("/preview")}
					variant="dark"
					className="h-10 w-full rounded-xl"
				>
					Preview
				</Button>
			</div>
		</main>
	)
}
