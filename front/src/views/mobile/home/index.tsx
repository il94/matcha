import { XIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import AnimateHeart from "@/components/AnimateHeart"

import { useQuery } from "@tanstack/react-query"
import getUsers from "@/services/getUsers"
import { useCallback, useMemo, useRef, useState } from "react"
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

	const photoSectionRef = useRef<{
		like: () => void
		dislike: () => void
	} | null>(null)

	const setNextCard = useCallback(() => {
		if (!users) return
		setCurrentCardIndex((prev) => (prev === users.length ? prev : prev + 1))
	}, [users])

	const onDislike = useCallback(() => {
		photoSectionRef.current?.dislike()
		setNextCard()
	}, [setNextCard])

	const onLike = useCallback(() => {
		photoSectionRef.current?.like()
		setNextCard()
	}, [setNextCard])

	const today = useMemo(() => dayjs(), [])

	return (
		<div className="flex h-full flex-col justify-between overflow-y-hidden bg-background px-3 py-3">
			{isPending || currentCardIndex === users.length ? (
				<h1>Load</h1> // TODO Loader
			) : (
				<>
					<div className="no-scrollbar relative h-full space-y-3 overflow-y-scroll">
						<PhotosSection
							users={users}
							currentCardIndex={currentCardIndex}
							ref={photoSectionRef}
						/>
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
					</div>
					<div className="flex h-16 w-full items-center justify-evenly">
						<Button
							onClick={onDislike}
							size="icon"
							variant="ghost"
							className="size-16 rounded-full"
						>
							<XIcon className="size-10 stroke-red-400 stroke-[3.5]" />
						</Button>
						<Button
							onClick={onLike}
							size="icon"
							variant="ghost"
							className="size-16 rounded-full"
						>
							<AnimateHeart />
						</Button>
					</div>
				</>
			)}
		</div>
	)
}
