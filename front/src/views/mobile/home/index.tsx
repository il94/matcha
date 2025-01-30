import { XIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import AnimateHeart from "@/components/AnimateHeart"
import ImagesSection from "./ImagesSection"
import BioSection from "./BioSection"
import EssentialsSection from "./EssentialsSection"
import TagsSection from "./TagsSection"

import { useQuery } from "@tanstack/react-query"
import getUsers from "@/services/getUsers"
import { useMemo } from "react"
import dayjs from "@/lib/dayjs"

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

	const today = useMemo(() => dayjs(), [])

	return (
		<div className="flex h-full flex-col justify-between overflow-y-hidden bg-background px-3 py-3">
			<div className="no-scrollbar h-full space-y-3 overflow-y-scroll">
				{isPending ? <p>Load</p> : users.map((user) => { // TODO Loader

						const age = today.diff(user.birthDate, "year")
						const location = "Paris" // TODO Definir
						const status = "En ligne" // TODO Definir

						// TODO Vrai display pour les profils
						
						return (
							<> { /* TODO key */ }
								<ImagesSection
									firstName={user.firstName}
									age={age}
									location={location}
									status={status}
									images={user.images}
								/>
								<BioSection bio={user.bio} firstName={user.firstName} />
								<EssentialsSection
									firstName={user.firstName}
									lastName={user.lastName}
									userName={user.userName}
									age={age}
									gender={user.gender}
									sexualOrientation={user.sexualOrientation}
									location={location}
									elo={user.elo}
								/>
								<TagsSection />
								<Button
									variant="destructiveDark"
									className="h-10 w-full rounded-xl"
								>
									Block {user.firstName}
								</Button>
								<Button
									variant="destructiveDark"
									className="h-10 w-full rounded-xl"
								>
									Report {user.firstName}
								</Button>
							</>
						)
					})
				}
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
