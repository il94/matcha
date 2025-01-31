import { XIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import AnimateHeart from "@/components/AnimateHeart"

import { useQuery } from "@tanstack/react-query"
import getUsers from "@/services/getUsers"
import { useMemo, useState } from "react"
import dayjs from "@/lib/dayjs"
import BioSection from "./BioSection"
import EssentialsSection from "./EssentialsSection"
import TagsSection from "./TagsSection"
import PhotosSection from "./PhotosSection"

export default function HomePage() {
	const {
		data: users,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
	})

	if (isError) throw error // TODO Gestion d'erreur

	const [currentCardIndex, setCurrentCardIndex] = useState(0)

	const today = useMemo(() => dayjs(), [])

	return (
		<div className="flex h-full flex-col justify-between overflow-y-hidden bg-background px-3 py-3">
			<div className="no-scrollbar relative h-full space-y-3 overflow-y-scroll">
				{isPending ? (
					<h1>Load</h1> // TODO Loader
				) : (
					<>
						<PhotosSection users={users} />
						<BioSection
							bio={users[currentCardIndex].bio}
							firstName={users[currentCardIndex].firstName}
						/>
						<EssentialsSection
							firstName={users[currentCardIndex].firstName}
							lastName={users[currentCardIndex].lastName}
							userName={users[currentCardIndex].userName}
							age={today.diff(users[currentCardIndex].birthDate, "year")}
							gender={users[currentCardIndex].gender}
							sexualOrientation={users[currentCardIndex].sexualOrientation}
							location={"Paris"}
							elo={users[currentCardIndex].elo}
						/>
						<TagsSection />
						<Button
							variant="destructiveDark"
							className="h-10 w-full rounded-xl"
						>
							Block {users[currentCardIndex].firstName}
						</Button>
						<Button
							variant="destructiveDark"
							className="h-10 w-full rounded-xl"
						>
							Report {users[currentCardIndex].firstName}
						</Button>
					</>
				)}
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
