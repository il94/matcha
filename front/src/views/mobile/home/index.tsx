import { XIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import AnimateHeart from "@/components/AnimateHeart"
import ImagesSection from "./ImagesSection"
import BioSection from "./BioSection"
import EssentialsSection from "./EssentialsSection"
import TagsSection from "./TagsSection"

export default function Home() {
	const user = {
		firstName: "Loremosowddsd",
		lastName: "Moussochocolat",
		userName: "chouf",
		age: 27,
		gender: "F",
		sexualPreference: "Hetero",

		bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam okok",
		images: ["/model.JPG", "/model_2.JPG", "/model_3.JPG"],

		elo: 48,
		location: "Paris",
		status: "En ligne",
	}

	return (
		<div className="flex h-full flex-col justify-between overflow-y-hidden bg-background px-3 py-3">
			<div className="no-scrollbar h-full space-y-3 overflow-y-scroll">
				<ImagesSection
					firstName={user.firstName}
					age={user.age}
					location={user.location}
					status={user.status}
					images={user.images}
				/>
				<BioSection bio={user.bio} firstName={user.firstName} />
				<EssentialsSection
					firstName={user.firstName}
					lastName={user.lastName}
					userName={user.userName}
					age={user.age}
					gender={user.gender}
					sexualPreference={user.sexualPreference}
					location={user.location}
					elo={user.elo}
				/>
				<TagsSection />
				<Button variant="destructiveDark" className="h-10 w-full rounded-xl">
					Block {user.firstName}
				</Button>
				<Button variant="destructiveDark" className="h-10 w-full rounded-xl">
					Report {user.firstName}
				</Button>
			</div>
			<div className="flex h-16 w-full items-center justify-evenly">
				<Button className="size-16 rounded-full" size="icon" variant="ghost">
					<XIcon className="size-10 stroke-red-400 stroke-[3.5]" />
				</Button>
				<Button className="size-16 rounded-full" size="icon" variant="ghost">
					<AnimateHeart />
				</Button>
			</div>
		</div>
	)
}
