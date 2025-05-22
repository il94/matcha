import {
	keepPreviousData,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query"
import getUsers from "@/services/getUsers"
import { useCallback, useMemo, useRef, useState } from "react"
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

export default function HomePage() {
	const {
		data,
		isPending,
		isError,
		error,

		fetchNextPage,
	} = useInfiniteQuery({
		queryKey: ["users"],
		queryFn: ({ pageParam: page }) =>
			getUsers({
				page,
				limit: 15,
			}),

		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			return lastPage.nextPage
		},
		placeholderData: keepPreviousData,
	})

	const { user } = useAuthOutletContext()
	const queryClient = useQueryClient()

	const [isMatch, setIsMatch] = useState<number | undefined>()
	const [newChatId, setNewChatId] = useState("")

	const { mutate: createVoteMutation } = useMutation({
		mutationFn: createVote,
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
		onError: (error) => {
			console.error("Error creating vote MUTATION:", error) // TODO
		},
	})

	if (isError) throw error // TODO Gestion d'erreur

	const users = useMemo(() => {
		return data?.pages.flatMap((page) => page.users) ?? []
	}, [data])

	const [currentCardIndex, setCurrentCardIndex] = useState(0)

	const photoSectionRef = useRef<{
		like: () => void
		dislike: () => void
	} | null>(null)

	const setNextCard = useCallback(() => {
		if (!users) return

		if (currentCardIndex % 15 === 0) fetchNextPage()

		setCurrentCardIndex((prev) => (prev === users.length ? prev : prev + 1))
	}, [users, currentCardIndex, fetchNextPage])

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
		<main className="relative flex h-full flex-col justify-between overflow-y-hidden bg-background p-3">
			{isPending || currentCardIndex === users.length ? (
				<h1>Load</h1> // TODO Loader
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
							location={"Paris"}
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
