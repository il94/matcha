import { useQuery } from "@tanstack/react-query"
import { useMemo, useRef } from "react"
import dayjs from "@/lib/dayjs"
import BioSection from "@/views/mobile/home/BioSection"
import EssentialsSection from "@/views/mobile/home/EssentialsSection"
import TagsSection from "@/views/mobile/home/TagsSection"
import PhotosSection from "@/views/mobile/home/PhotosSection"
import WarningSection from "@/views/mobile/home/WarningSection"
import ActionButtons from "@/views/mobile/home/ActionButtons"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import getUser from "@/services/getUser"
import { useParams } from "react-router"

export default function PreviewPage() {
	const { userId } = useParams<{ userId?: string }>()
	const { user } = useAuthOutletContext()

	const {
		data: userTarget,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["user", userId],
		queryFn: () => getUser({ userId }),
		enabled: !!userId,
	})

	if (isError) throw error // TODO Gestion d'erreur

	const userToDisplay = userId && userTarget ? userTarget : user

	const scrollRef = useRef<HTMLDivElement>(null)

	const today = useMemo(() => dayjs(), [])

	return (
		<main className="relative flex h-full flex-col justify-between overflow-y-hidden bg-background p-3">
			{userId && isPending ? (
				<h1>Load</h1> // TODO Loader
			) : (
				<>
					<div
						className="no-scrollbar relative h-full space-y-3 overflow-y-scroll"
						ref={scrollRef}
					>
						<PhotosSection
							users={[userToDisplay]}
							currentCardIndex={0}
							setNextCard={() => {}}
							disabled
						/>
						<BioSection
							bio={userToDisplay.bio}
							firstName={userToDisplay.firstName}
						/>
						<EssentialsSection
							firstName={userToDisplay.firstName}
							lastName={userToDisplay.lastName}
							username={userToDisplay.username}
							age={today.diff(userToDisplay.birthDate, "year")}
							gender={userToDisplay.gender}
							sexualOrientation={userToDisplay.sexualOrientation}
							location={"Paris"}
							elo={userToDisplay.elo}
						/>
						{userToDisplay.tags.length ? (
							<TagsSection tags={userToDisplay.tags} />
						) : null}
						<WarningSection user={userToDisplay} isPreview={!userId} />
					</div>
					<ActionButtons isPreview />
				</>
			)}
		</main>
	)
}
