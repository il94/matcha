import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ui/error-state"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"
import useNavigateFrom from "@/hooks/useNavigateFrom"
import { cn } from "@/lib/utils"
import getUser from "@/services/getUser"
import { useQuery } from "@tanstack/react-query"

type StatProps = {
	value: number
	label: string
	isButton?: boolean
}

function Stat({ value, label, isButton }: StatProps) {
	const navigateFrom = useNavigateFrom()
	const Parent = isButton ? "button" : "div"
	const isClickable = isButton && value > 0

	return (
		<Parent
			onClick={() => {
				if (isClickable) navigateFrom(label.toLowerCase())
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
					isClickable && value > 0 && "underline underline-offset-8",
				)}
			>
				{label}
			</p>
		</Parent>
	)
}

export default function ProfilePage() {
	const navigateFrom = useNavigateFrom()

	const {
		data: user,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["user"],
		queryFn: DEBUG_ERRORS.profile ? forcedError : () => getUser({}),
	})

	if (isError)
		return (
			<main className="flex h-full items-center justify-center px-3 py-8">
				<ErrorState message="We couldn't load your profile. Give it another shot!" />
			</main>
		)

	if (isPending)
		return (
			<main className="flex h-full flex-col items-center justify-between overflow-y-hidden px-3 py-8">
				<Skeleton className="h-10 w-40" />

				<div className="flex h-full w-full flex-col items-center justify-evenly">
					<Skeleton className="size-32 rounded-full" />
					<div className="flex w-full justify-evenly">
						<Skeleton className="h-16 w-20" />
						<Skeleton className="h-16 w-20" />
					</div>
					<div className="flex w-full justify-evenly">
						<Skeleton className="h-16 w-20" />
						<Skeleton className="h-16 w-20" />
					</div>
				</div>

				<div className="w-full space-y-3">
					<Skeleton className="h-10 w-full rounded-xl" />
					<Skeleton className="h-10 w-full rounded-xl" />
				</div>
			</main>
		)

	return (
		<main className="flex h-full flex-col items-center justify-between overflow-y-hidden px-3 py-8">
			<h2 className="text-4xl">Hi, {user.firstName}</h2>

			<div className="flex h-full w-full flex-col items-center justify-evenly">
				<img
					src={user.principalPicture.name}
					className="size-32 rounded-full object-cover"
				/>
				<div className="flex w-full justify-evenly">
					<Stat value={user.views} label="Views" isButton />
					<Stat value={user.likes} label="Likes" isButton />
				</div>
				<div className="flex w-full justify-evenly">
					<Stat value={user.matchs} label="Matchs" />
					<Stat value={user.elo} label="Rating" />
				</div>
			</div>

			<div className="w-full space-y-3">
				<Button
					onClick={() => navigateFrom("/settings")}
					variant="dark"
					className="h-10 w-full rounded-xl"
				>
					Edit profile
				</Button>
				<Button
					onClick={() => navigateFrom("/preview")}
					variant="dark"
					className="h-10 w-full rounded-xl"
				>
					Preview
				</Button>
			</div>
		</main>
	)
}
