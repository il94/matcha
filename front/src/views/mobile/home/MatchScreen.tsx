import { AnimatePresence, motion, useAnimation } from "motion/react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const radius = 80 // rayon du cercle en pixels
const animationDuration = 8 // durée d’un tour complet en secondes

type CircularMovingAvatarProps = {
	src: string
	alt: string
	angleOffset: number // angle de départ en degrés
}

function CircularMovingAvatar({
	src,
	alt,
	angleOffset,
}: CircularMovingAvatarProps) {
	const controls = useAnimation()
	const [angle, setAngle] = useState(angleOffset) // angle en degrés

	useEffect(() => {
		let start: number | null = null
		function animate(time: number) {
			if (!start) start = time
			const elapsed = (time - start) / 1000 // en secondes
			const newAngle = (angleOffset + (elapsed / animationDuration) * 360) % 360 // calcul angle cyclique
			setAngle(newAngle)
			requestAnimationFrame(animate)
		}
		const animId = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(animId)
	}, [angleOffset])

	// Calcul position x et y sur le cercle
	const rad = (angle * Math.PI) / 180
	const x = radius * Math.cos(rad)
	const y = radius * Math.sin(rad)

	return (
		<motion.img
			src={src}
			alt={alt}
			className="absolute size-36 rounded-full object-cover"
			style={{
				top: `calc(50% + ${y}px)`,
				left: `calc(50% + ${x}px)`,
				translateX: "-50%",
				translateY: "-50%",
			}}
			animate={controls}
		/>
	)
}

type MatchScreenProps = {
	open: boolean
	onClose: () => void
	user: User
	userTarget: User
	newChatId: Chat["id"]
}

export default function MatchScreen({
	open,
	onClose,
	user,
	userTarget,
	newChatId,
}: MatchScreenProps) {
	const navigate = useNavigate()
	const [disableButtons, setDisableButtons] = useState(true)

	useEffect(() => {
		if (open) {
			const timer = setTimeout(() => {
				setDisableButtons(false)
			}, 1500)

			return () => clearTimeout(timer)
		} else setDisableButtons(true)
	}, [open])

	return (
		<AnimatePresence mode="wait">
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					exit={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.5,
						ease: "easeInOut",
					}}
					className="absolute left-0 top-0 z-50 flex size-full flex-col items-center justify-between bg-background px-3 py-10"
				>
					<div>
						<h2 className="text-center text-5xl">It's a match !</h2>
						<p className="mt-2 text-center text-sm italic opacity-80">
							This could be the start of something new... Start chatting !
						</p>
					</div>
					<div className="flex w-full justify-evenly">
						<CircularMovingAvatar
							src={user.principalPicture.name}
							alt={`${user.firstName} picture`}
							angleOffset={0}
						/>
						<CircularMovingAvatar
							src={userTarget.principalPicture.name}
							alt={`${userTarget.firstName} picture`}
							angleOffset={180} // pour l’autre avatar, à l’opposé dans le cercle
						/>
					</div>
					<div>
						<Button
							onClick={() => {
								navigate(`/chat/${newChatId}`)
								onClose()
							}}
							disabled={disableButtons}
							className="mt-4 w-full max-w-[300px] select-none"
						>
							Say hello to {userTarget.firstName}
						</Button>
						<Button
							variant="outline"
							onClick={onClose}
							disabled={disableButtons}
							className="mt-4 w-full max-w-[300px] select-none"
						>
							Keep swiping
						</Button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
