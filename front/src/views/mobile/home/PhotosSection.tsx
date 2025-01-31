import {
	createRef,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react"
import SwipeableCard from "./SwipeableCard"
import dayjs from "dayjs"

type PhotosSectionProps = {
	users: User[]
	currentCardIndex: number
	setNextCard: () => void
}

export default forwardRef(function PhotosSection(
	{ users, currentCardIndex, setNextCard }: PhotosSectionProps,
	ref,
) {
	const today = useMemo(() => dayjs(), [])

	const cardContainer = useRef<HTMLDivElement>(null)
	const [cardContainerHeight, setSwipeableCardContainerHeight] = useState(0)

	useEffect(() => {
		if (!cardContainer.current?.parentElement) return

		const resizeObserver = new ResizeObserver(() => {
			if (cardContainer.current?.parentElement)
				setSwipeableCardContainerHeight(
					cardContainer.current.parentElement.offsetHeight,
				)
		})

		resizeObserver.observe(cardContainer.current.parentElement)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	const cardRefs = Array.from({ length: users.length }).map(() =>
		createRef<{ like: () => void; dislike: () => void } | null>(),
	)

	useImperativeHandle(ref, () => ({
		like: () => {
			cardRefs[currentCardIndex].current?.like()
		},
		dislike: () => {
			cardRefs[currentCardIndex].current?.dislike()
		},
	}))

	return (
		<section
			className="relative w-full overflow-hidden"
			style={{ height: cardContainerHeight }}
			ref={cardContainer}
		>
			{[...users].reverse().map((user, index) => {
				const age = today.diff(user.birthDate, "year")
				const location = "Paris" // TODO Definir
				const status = "En ligne" // TODO Definir

				return (
					<SwipeableCard
						key={`card_${user.id}`}
						firstName={user.firstName}
						age={age}
						location={location}
						status={status}
						images={user.images}
						setNextCard={setNextCard}
						ref={cardRefs[Math.abs(index - users.length) - 1]}
					/>
				)
			})}
		</section>
	)
})
