import {
	AtSignIcon,
	FlameIcon,
	HeartIcon,
	IdCardIcon,
	SquareUserIcon,
	UserIcon,
} from "lucide-react"

type EssentialsSectionProps = {
	firstName: User["firstName"]
	lastName: User["lastName"]
	username: User["lastName"]
	age: number
	gender: User["gender"]
	sexualOrientation: User["sexualOrientation"]
	elo: User["elo"]
}

export default function EssentialsSection({
	firstName,
	lastName,
	username,
	age,
	gender,
	sexualOrientation,
	elo,
}: EssentialsSectionProps) {
	return (
		<section className="space-y-3 rounded-xl bg-primary p-4 text-black">
			<div className="flex space-x-2">
				<SquareUserIcon className="stroke-[2.3]" />
				<p className="font-bold">Essentials</p>
			</div>
			<div className="space-y-2">
				<div className="flex items-center space-x-2">
					<IdCardIcon />
					<p className="text-sm">
						{firstName} {lastName}
					</p>
				</div>
				<div className="flex items-center space-x-2">
					<AtSignIcon />
					<p className="text-sm">{username}</p>
				</div>
				<div className="flex items-center space-x-2">
					<UserIcon />
					<p className="text-sm">
						{age}
						{gender ? ` - ${gender}` : ""}
					</p>
				</div>
				<div className="flex items-center space-x-2">
					<HeartIcon />
					<p className="text-sm">{sexualOrientation}</p>
				</div>
				<div className="flex items-center space-x-2">
					<FlameIcon />
					<p className="text-sm">{elo}</p>
				</div>
			</div>
		</section>
	)
}
