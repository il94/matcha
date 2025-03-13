import { XIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import AnimateHeart from "@/components/AnimateHeart"

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query"
import getUsers from "@/services/getUsers"
import { useCallback, useMemo, useRef, useState } from "react"
import dayjs from "@/lib/dayjs"
import BioSection from "./BioSection"
import EssentialsSection from "./EssentialsSection"
import TagsSection from "./TagsSection"
import PhotosSection from "./PhotosSection"

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

	const onDislike = useCallback(async () => {
		await scrollToTop()
		photoSectionRef.current?.dislike()
	}, [scrollToTop])

	const onLike = useCallback(async () => {
		await scrollToTop()
		photoSectionRef.current?.like()
	}, [scrollToTop])

	const scrollRef = useRef<HTMLDivElement>(null)

	const today = useMemo(() => dayjs(), [])

	return (
		<main className="flex h-full flex-col justify-between overflow-y-hidden bg-background px-3 py-3">
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
		</main>
	)
}
