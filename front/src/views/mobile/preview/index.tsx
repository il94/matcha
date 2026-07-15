import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useMemo, useState } from "react"
import dayjs from "@/lib/dayjs"
import BioSection from "@/views/mobile/home/BioSection"
import EssentialsSection from "@/views/mobile/home/EssentialsSection"
import TagsSection from "@/views/mobile/home/TagsSection"
import PhotosSection from "@/views/mobile/home/PhotosSection"
import WarningSection from "@/views/mobile/home/WarningSection"
import ActionButtons from "@/views/mobile/home/ActionButtons"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import getUser from "@/services/getUser"
import { useLocation, useNavigate, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import createVote from "@/services/createVote"
import deleteVote from "@/services/deleteVote"
import MatchScreen from "../home/MatchScreen"
import CardSkeleton from "../home/CardSkeleton"
import { ErrorState } from "@/components/ui/error-state"
import toast from "@/lib/toast"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"

export default function PreviewPage() {
	const { userId } = useParams<{ userId?: string }>()
	const { user } = useAuthOutletContext()

	const navigate = useNavigate()
	const location = useLocation()

	const [isMatch, setIsMatch] = useState(false)
	const [newChatId, setNewChatId] = useState("")

	const {
		data: userTarget,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["user", userId],
		queryFn: DEBUG_ERRORS.previewUser ? forcedError : () => getUser({ userId }),
		enabled: !!userId,
	})

	const queryClient = useQueryClient()

	const { mutate: createVoteMutation } = useMutation({
		mutationFn: DEBUG_ERRORS.previewCreateVote ? forcedError : createVote,
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["user", userId] })
			if (variables.vote) {
				if (data.match) {
					queryClient.invalidateQueries({ queryKey: ["chats"] })
					setNewChatId(data.chatId)
					setIsMatch(true)
				}
			}
		},
		onError: () => {
			toast.error("Couldn't register your like. Try again!")
		},
	})

	const { mutate: deleteVoteMutation } = useMutation({
		mutationFn: DEBUG_ERRORS.previewDeleteVote ? forcedError : deleteVote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user", userId] })
		},
		onError: () => {
			toast.error("Couldn't remove your like. Try again!")
		},
	})

	const userToDisplay = userId && userTarget ? userTarget : user

	const today = useMemo(() => dayjs(), [])

	const handleBlock = useCallback(() => {
		if (location.state?.from.includes("/chat")) navigate("/chat")
		else if (location.state?.from.includes("/profile")) navigate(-1)
		else navigate("/home")
	}, [navigate, location])

	return (
		<main className="relative flex h-full flex-col justify-between overflow-y-hidden bg-background p-3">
			{userId && isError ? (
				<ErrorState
					className="m-auto"
					message="We couldn't load this profile. Try again in a bit!"
				/>
			) : userId && isPending ? (
				<CardSkeleton />
			) : (
				<>
					<div className="no-scrollbar relative h-full space-y-3 overflow-y-scroll">
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
							elo={userToDisplay.elo}
						/>
						{userToDisplay.tags.length ? (
							<TagsSection tags={userToDisplay.tags} />
						) : null}
						{userId && (
							<WarningSection user={userToDisplay} onBlock={handleBlock} />
						)}
						<Button
							onClick={() => navigate(-1)}
							variant="dark"
							className="h-10 w-full rounded-xl"
						>
							Back
						</Button>
					</div>
					<ActionButtons
						onLike={() =>
							createVoteMutation({
								targetId: userToDisplay.id,
								vote: true,
							})
						}
						onDeleteLike={() => {
							deleteVoteMutation({
								targetId: userToDisplay.id,
							})
						}}
						onDislike={() =>
							createVoteMutation({
								targetId: userToDisplay.id,
								vote: false,
							})
						}
						isLiked={userToDisplay.isLiked}
						isDisliked={userToDisplay.isDisliked}
						heLiked={userToDisplay.heLiked}
						isMatched={userToDisplay.isMatched}
						disabled={!userId}
					/>
					<MatchScreen
						open={isMatch}
						onClose={() => setIsMatch(false)}
						user={user}
						userTarget={userToDisplay}
						newChatId={newChatId}
						isPreview
					/>
				</>
			)}
		</main>
	)
}
