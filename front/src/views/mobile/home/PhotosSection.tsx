import { useEffect, useMemo, useRef, useState } from "react"
import SwipeableCard from "./SwipeableCard"
import dayjs from "dayjs"

type PhotosSectionProps = {
	users: User[]
}

export default function PhotosSection({ users }: PhotosSectionProps) {
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

	return (
		<section
			className="relative w-full overflow-hidden"
			style={{ height: cardContainerHeight }}
			ref={cardContainer}
		>
			{[...users].reverse().map((user) => {
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
					/>
				)
			})}
		</section>
	)
}
