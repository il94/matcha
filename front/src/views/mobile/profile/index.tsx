import { Button } from "@/components/ui/button"

type StatProps = {
	value: number
	label: string
}

function Stat({ value, label }: StatProps) {
	return (
		<div className="flex flex-col items-center">
			<p className="text-3xl font-bold">{value}</p>
			<p className="text-1xl">{label}</p>
		</div>
	)
}

export default function ProfilePage() {
	const user = {
		firstName: "Loremosowddsd",
		profilePicture: "/model.JPG",
		elo: 48,
		views: 128,
		matchs: 204,
		dates: 203,
	}

	return (
		<div className="flex h-full flex-col items-center justify-between overflow-y-hidden px-3 py-8">
			<h2 className="text-4xl">Hi, {user.firstName}</h2>

			<div className="flex h-full w-full flex-col items-center justify-evenly">
				<img
					src={user.profilePicture}
					className="size-32 rounded-full object-cover"
				/>
				<div className="flex w-full justify-evenly">
					<Stat value={user.elo} label="Rating" />
					<Stat value={user.views} label="Views" />
				</div>
				<div className="flex w-full justify-evenly">
					<Stat value={user.matchs} label="Matchs" />
					<Stat value={user.dates} label="Dates" />
				</div>
			</div>

			<div className="w-full space-y-3">
				<Button variant="dark" className="h-10 w-full rounded-xl">
					Edit profile
				</Button>
				<Button variant="dark" className="h-10 w-full rounded-xl">
					Preview
				</Button>
			</div>
		</div>
	)
}
