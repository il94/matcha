import AnimateHalo from "@/components/AnimateHalo"
import { cn } from "@/lib/utils"
import { MapPinIcon } from "lucide-react"
import {
	forwardRef,
	MouseEvent,
	useCallback,
	useImperativeHandle,
	useState,
} from "react"
import { motion } from "framer-motion"
import { FramerCallback } from "./types"

const dragElastic = 1
const rotateCard = 45

type SwipeableCardProps = {
	firstName: User["firstName"]
	age: number
	location: string
	status: string // TODO Definir
	images: User["images"]
	setNextCard: () => void
	parentWidth: number
}

export default forwardRef(function SwipeableCard(
	{
		firstName,
		age,
		location,
		status,
		images,
		setNextCard,
		parentWidth,
	}: SwipeableCardProps,
	ref,
) {
	const velocityThreshold = parentWidth * 2 // Seuil de vitesse pour valider le like/dislike
	const confrimThreshold = parentWidth / 3.5 // Seuil de distance pour valider le like/dislike
	const hideCardDistance = parentWidth * 1.5 // Distance à laquelle la carte doit être déplacée pour être cachée

	const [cardRotation, setCardRotation] = useState(0)
	const [cardX, setSwipeableCardX] = useState(0)

	const like = useCallback(() => {
		setSwipeableCardX(hideCardDistance)
		setCardRotation(rotateCard)
	}, [hideCardDistance])

	const dislike = useCallback(() => {
		setSwipeableCardX(-hideCardDistance)
		setCardRotation(-rotateCard)
	}, [hideCardDistance])

	useImperativeHandle(ref, () => ({ like, dislike }))

	const onDrag: FramerCallback = useCallback((_, info) => {
		setCardRotation(info.offset.x / 10)
	}, [])
	const onDragEnd: FramerCallback = useCallback(
		(_, info) => {
			if (
				info.velocity.x > velocityThreshold ||
				info.offset.x > confrimThreshold
			)
				like()
			else if (
				info.velocity.x < -velocityThreshold ||
				info.offset.x < -confrimThreshold
			)
				dislike()
			else setCardRotation(0)
		},
		[like, dislike, confrimThreshold, velocityThreshold],
	)

	const [displayedImage, setDisplayedImage] = useState(0)

	const displayPreviousImage = useCallback(() => {
		if (displayedImage <= 0) return
		setDisplayedImage(displayedImage - 1)
	}, [displayedImage])

	const displayNextImage = useCallback(() => {
		if (displayedImage >= images.length - 1) return
		setDisplayedImage(displayedImage + 1)
	}, [displayedImage, images])

	const handleImageClick = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			const { clientX, currentTarget } = event
			const clickPosition = clientX / currentTarget.offsetWidth

			if (clickPosition < 0.5) displayPreviousImage()
			else displayNextImage()
		},
		[displayPreviousImage, displayNextImage],
	)

	return (
		<motion.div
			drag="x"
			dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
			dragElastic={dragElastic}
			onDrag={onDrag}
			onDragEnd={onDragEnd}
			animate={{ x: cardX, rotate: cardRotation }}
			transition={{
				x: { duration: 0.2 },
				rotate: { ease: "backOut" },
			}}
			onAnimationComplete={(latest: { x: number }) => {
				if (latest.x) setNextCard()
			}}
			onClick={handleImageClick}
			className="absolute h-full w-full overflow-hidden rounded-xl"
		>
			{images.map((image, index) => (
				<img
					key={`test_${index}`}
					src={image}
					className={cn(
						"absolute hidden size-full object-cover",
						index === displayedImage && "block",
					)}
				/>
			))}

			{images.length > 1 && (
				<div className="absolute top-2 flex h-1 w-full bg-background/20">
					{images.map((_, index) => (
						<div
							key={`image_${index}`}
							className={cn(
								"mx-0.5 h-full grow rounded-full bg-foreground",
								index !== displayedImage && "opacity-20",
							)}
						/>
					))}
				</div>
			)}
			<motion.div
				className="absolute left-0 top-0 h-full w-full"
				initial={{ backgroundColor: "hsl(0 0% 0%)" }}
				animate={{
					backgroundColor:
						cardRotation > 0
							? "hsl(139 35% 47%)"
							: cardRotation < 0
								? "hsl(0 91%, 71%)"
								: "hsl(0 0% 0%)",
					opacity: (0.5 * Math.abs(cardRotation)) / 15,
				}}
			/>
			<div className="absolute bottom-0 flex h-48 w-full flex-col justify-end bg-gradient-to-b from-transparent to-background p-3">
				<p className="text-3xl">
					{firstName} <span className="text-2xl">{age}</span>
				</p>
				<div className="flex items-center gap-2">
					<MapPinIcon className="ml-0.5 size-4" />
					<p>{location}</p>
				</div>
				<div className="flex items-center gap-2 pl-0.5">
					<AnimateHalo size={4} />
					<p>{status}</p>
				</div>
			</div>
		</motion.div>
	)
})
