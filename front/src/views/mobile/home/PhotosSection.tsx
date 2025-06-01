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
	disabled?: boolean
}

export default forwardRef(function PhotosSection(
	{ users, currentCardIndex, setNextCard, disabled }: PhotosSectionProps,
	ref,
) {
	const today = useMemo(() => dayjs(), [])

	const cardContainer = useRef<HTMLDivElement>(null)
	const [cardContainerSize, setCardContainerSize] = useState({
		width: 0,
		height: 0,
	})

	useEffect(() => {
		if (!cardContainer.current?.parentElement) return

		const resizeObserver = new ResizeObserver(() => {
			if (cardContainer.current?.parentElement)
				setCardContainerSize({
					width: cardContainer.current.parentElement.offsetWidth,
					height: cardContainer.current.parentElement.offsetHeight,
				})
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
			style={{ height: cardContainerSize.height }}
			ref={cardContainer}
		>
			{[...users].reverse().map((user, index) => {
				const age = today.diff(user.birthDate, "year")

				return (
					<SwipeableCard
						key={`card_${user.id}`}
						firstName={user.firstName}
						age={age}
						location={user.locationLabel}
						isOnline={user.isOnline}
						lastConnexion={user.lastConnexion}
						principalPicture={user.principalPicture}
						pictures={user.pictures}
						setNextCard={setNextCard}
						parentWidth={cardContainerSize.width}
						ref={cardRefs[Math.abs(index - users.length) - 1]}
						disabled={disabled}
					/>
				)
			})}
		</section>
	)
})
