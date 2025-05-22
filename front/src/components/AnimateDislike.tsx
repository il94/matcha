import { HeartCrackIcon, HeartOffIcon, XIcon } from "lucide-react"
import { motion } from "motion/react"

type AnimateHeartProps = {
	isLiked?: boolean
	isDisliked?: boolean
	isMatched?: boolean
}

export default function AnimateDislike({
	isLiked,
	isDisliked,
	isMatched,
}: AnimateHeartProps) {
	return (
		<motion.div
			animate={{
				x: [0, -2, 2, -2, 2, 0],
			}}
			transition={{
				duration: 0.5,
				repeat: Infinity,
				repeatType: "loop",
				repeatDelay: 1.5,
				ease: "easeInOut",
			}}
		>
			{isDisliked ? (
				<HeartCrackIcon className="size-10 stroke-red-400 stroke-[3]" />
			) : isLiked || isMatched ? (
				<HeartOffIcon className="size-10 stroke-red-400 stroke-[3]" />
			) : (
				<XIcon className="size-10 stroke-red-400 stroke-[3.5]" />
			)}
		</motion.div>
	)
}
