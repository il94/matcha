import AnimateHalo from "@/components/AnimateHalo"
import { cn } from "@/lib/utils"
import { MapPinIcon } from "lucide-react"
import {
	forwardRef,
	MouseEvent,
	useCallback,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { motion, MotionProps } from "framer-motion"
import { FramerCallback } from "@/types"
import dayjs from "dayjs"
import getDistanceLabel from "@/lib/getDistanceLabel"

function shufflePictures(pictures: Picture[]) {
	for (let i = pictures.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[pictures[i], pictures[j]] = [pictures[j], pictures[i]]
	}

	return pictures
}

const dragElastic = 1
const rotateCard = 45

type SwipeableCardProps = {
	firstName: User["firstName"]
	age: number
	location: string
	distance: number
	isOnline: boolean
	lastConnexion?: string
	principalPicture: User["principalPicture"]
	pictures: User["pictures"]
	setNextCard: () => void
	parentWidth: number
	disabled?: boolean
}

export default forwardRef(function SwipeableCard(
	{
		firstName,
		age,
		location,
		distance,
		isOnline,
		lastConnexion,
		principalPicture,
		pictures,
		setNextCard,
		parentWidth,
		disabled,
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

	const picturesList = useMemo(
		() => [principalPicture, ...shufflePictures(pictures)],
		[principalPicture, pictures],
	)

	const [displayedPicture, setDisplayedPicture] = useState(0)

	const displayPreviousPicture = useCallback(() => {
		if (displayedPicture <= 0) return
		setDisplayedPicture(displayedPicture - 1)
	}, [displayedPicture])

	const displayNextPicture = useCallback(() => {
		if (displayedPicture >= picturesList.length - 1) return
		setDisplayedPicture(displayedPicture + 1)
	}, [displayedPicture, picturesList])

	const handlePictureClick = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			const { clientX, currentTarget } = event
			const clickPosition = clientX / currentTarget.offsetWidth

			if (clickPosition < 0.5) displayPreviousPicture()
			else displayNextPicture()
		},
		[displayPreviousPicture, displayNextPicture],
	)

	const dragProps = disabled
		? undefined
		: {
				drag: "x" as const,
				dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
				dragElastic,
				onDrag,
				onDragEnd,
				animate: { x: cardX, rotate: cardRotation },
			}

	const dayjsLastConnexion = dayjs.utc(lastConnexion).tz(dayjs.tz.guess())

	const locationContainerRef = useRef<HTMLDivElement>(null)
	const locationTextRef = useRef<HTMLParagraphElement>(null)
	const [locationOverflow, setLocationOverflow] = useState(0)

	useLayoutEffect(() => {
		const container = locationContainerRef.current
		const text = locationTextRef.current
		if (!container || !text) return

		const scrollEndOffset = 6 // Marge arbitraire pour éviter que la fin du texte reste coupée
		const overflow = text.scrollWidth - container.clientWidth
		setLocationOverflow(overflow > 0 ? overflow + scrollEndOffset : 0)
	}, [location])

	const textOptions: MotionProps | undefined =
		locationOverflow > 0
			? {
					animate: { x: -locationOverflow },
					transition: {
						duration: locationOverflow / 30,
						delay: 2.5,
						ease: "linear",
						repeat: Infinity,
						repeatType: "reverse",
						repeatDelay: 2.5,
					},
				}
			: undefined

	return (
		<motion.div
			{...dragProps}
			transition={{
				x: { duration: 0.2 },
				rotate: { ease: "backOut" },
			}}
			onAnimationComplete={(latest: { x: number }) => {
				if (latest.x) setNextCard()
			}}
			onClick={handlePictureClick}
			className="absolute h-full w-full overflow-hidden rounded-xl"
		>
			{picturesList.map((picture, index) => (
				<img
					key={`test_${index}`}
					src={picture.name}
					className={cn(
						"absolute hidden size-full bg-background object-cover",
						index === displayedPicture && "block",
					)}
				/>
			))}

			{picturesList.length > 1 && (
				<div className="absolute top-2 flex h-1 w-full bg-background/20">
					{picturesList.map((_, index) => (
						<div
							key={`picture_${index}`}
							className={cn(
								"mx-0.5 h-full grow rounded-full bg-foreground",
								index !== displayedPicture && "opacity-20",
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
					<MapPinIcon className="ml-0.5 size-4 shrink-0" />
					<div
						ref={locationContainerRef}
						className="w-full overflow-hidden"
					>
						<motion.p
							ref={locationTextRef}
							{...textOptions}
							className="inline-block w-fit whitespace-nowrap"
						>
							{location}
						</motion.p>
					</div>
				</div>
				<p className="pl-7 text-sm">{getDistanceLabel(distance)}</p>
				{isOnline ? (
					<div className="flex items-center gap-2 pl-0.5 h-6">
						<AnimateHalo size={4} />
						<p>Online</p>
					</div>
				) : lastConnexion ? (
					<div className="flex items-center gap-2 pl-0.5 min-h-6">
						<AnimateHalo size={4} off />
						<p className="text-xs">
							Last connection : {dayjsLastConnexion.format("LL")} at{" "}
							{dayjsLastConnexion.format("HH:mm")}
						</p>
					</div>
				) : (
					<div className="flex items-center gap-2 pl-0.5">
						<AnimateHalo size={4} off />
						<p>Offline</p>
					</div>
				)}
			</div>
		</motion.div>
	)
})
