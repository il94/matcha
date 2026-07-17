import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query"
import getUsers from "@/services/getUsers"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import dayjs from "@/lib/dayjs"
import BioSection from "./BioSection"
import EssentialsSection from "./EssentialsSection"
import TagsSection from "./TagsSection"
import PhotosSection from "./PhotosSection"
import WarningSection from "./WarningSection"
import ActionButtons from "./ActionButtons"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"
import createVote from "@/services/createVote"
import MatchScreen from "./MatchScreen"
import { ErrorState } from "@/components/ui/error-state"
import CardSkeleton from "./CardSkeleton"
import toast from "@/lib/toast"
import { DEBUG_ERRORS, forcedError } from "@/lib/debugError"

const BATCH_LIMIT = 15
const REFETCH_THRESHOLD = 5

export default function HomePage() {
	const { user, filters } = useAuthOutletContext()

	const {
		data: batch,
		isPending,
		isError,
		isFetching,
		refetch,
	} = useQuery({
		queryKey: ["users", filters],
		queryFn: DEBUG_ERRORS.homeUsers
			? forcedError
			: () =>
					getUsers({
						limit: BATCH_LIMIT,
						filters,
					}),
		placeholderData: keepPreviousData,
	})

	const queryClient = useQueryClient()

	const [isMatch, setIsMatch] = useState<number | undefined>()
	const [newChatId, setNewChatId] = useState("")

	const { mutate: createVoteMutation } = useMutation({
		mutationFn: DEBUG_ERRORS.vote ? forcedError : createVote,
		onMutate: async (variables) => {
			await scrollToTop()
			if (variables.vote) photoSectionRef.current?.like()
			else photoSectionRef.current?.dislike()
		},
		onSuccess: (data, variables) => {
			if (variables.vote) {
				if (data.match) {
					queryClient.invalidateQueries({ queryKey: ["chats"] })
					setNewChatId(data.chatId)
					setIsMatch(currentCardIndex)
				}
			} else photoSectionRef.current?.dislike()
		},
		onError: () => {
			toast.error("Couldn't register your choice. Give it another swipe !")
		},
	})

	const [users, setUsers] = useState<User[]>([])
	const [currentCardIndex, setCurrentCardIndex] = useState(0)

	useEffect(() => {
		setUsers([])
		setCurrentCardIndex(0)
	}, [filters])

	useEffect(() => {
		if (!batch) return

		setUsers((prev) => {
			const seen = new Set(prev.map((user) => user.id))
			const fresh = batch.filter((user) => !seen.has(user.id))

			return fresh.length ? [...prev, ...fresh] : prev
		})
	}, [batch])

	const photoSectionRef = useRef<{
		like: () => void
		dislike: () => void
	} | null>(null)

	const setNextCard = useCallback(() => {
		if (
			!isFetching &&
			users.length - (currentCardIndex + 1) <= REFETCH_THRESHOLD
		)
			refetch()

		setCurrentCardIndex((prev) => (prev >= users.length ? prev : prev + 1))
	}, [users.length, currentCardIndex, isFetching, refetch])

	const scrollToTop = useCallback(async () => {
		scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
		if (scrollRef.current?.scrollTop !== 0)
			await new Promise((resolve) => setTimeout(resolve, 300))
	}, [])

	const scrollRef = useRef<HTMLDivElement>(null)

	const today = useMemo(() => dayjs(), [])

	const handleBlock = useCallback(async () => {
		photoSectionRef.current?.dislike()
	}, [photoSectionRef])

	return (
		<main className="relative flex h-full flex-col justify-between overflow-y-hidden rounded-xl bg-background p-3">
			{isError ? (
				<ErrorState
					className="m-auto"
					message="We couldn't find your matches. Give it another try !"
				/>
			) : isPending || currentCardIndex >= users.length ? (
				<CardSkeleton />
			) : (
				<>
					<div
						className="no-scrollbar relative h-full space-y-3 overflow-y-scroll"
						ref={scrollRef}
					>
						<PhotosSection
							users={users}
							currentCardIndex={currentCardIndex}
							setNextCard={setNextCard}
							ref={photoSectionRef}
						/>
						<BioSection
							bio={users[currentCardIndex].bio}
							firstName={users[currentCardIndex].firstName}
						/>
						<EssentialsSection
							firstName={users[currentCardIndex].firstName}
							lastName={users[currentCardIndex].lastName}
							username={users[currentCardIndex].username}
							age={today.diff(users[currentCardIndex].birthDate, "year")}
							gender={users[currentCardIndex].gender}
							sexualOrientation={users[currentCardIndex].sexualOrientation}
							elo={users[currentCardIndex].elo}
						/>
						{users[currentCardIndex].tags.length ? (
							<TagsSection tags={users[currentCardIndex].tags} />
						) : null}
						<WarningSection
							user={users[currentCardIndex]}
							onBlock={handleBlock}
						/>
					</div>
					<ActionButtons
						onLike={() =>
							createVoteMutation({
								targetId: users[currentCardIndex].id,
								vote: true,
							})
						}
						onDislike={() =>
							createVoteMutation({
								targetId: users[currentCardIndex].id,
								vote: false,
							})
						}
						isLiked={users[currentCardIndex].isLiked}
						heLiked={users[currentCardIndex].heLiked}
						isMatched={users[currentCardIndex].isMatched}
					/>
				</>
			)}
			<MatchScreen
				open={isMatch !== undefined}
				onClose={() => setIsMatch(undefined)}
				user={user}
				userTarget={users[isMatch ?? 0]}
				newChatId={newChatId}
			/>
		</main>
	)
}
