import { cn } from "@/lib/utils"
import { HeartIcon, MessageCircleHeartIcon } from "lucide-react"
import { motion } from "motion/react"

type AnimateHeartProps = {
	isLiked?: boolean
	heLiked?: boolean
	isMatched?: boolean
}

export default function AnimateHeart({
	isLiked,
	heLiked,
	isMatched,
}: AnimateHeartProps) {
	return (
		<motion.div
			animate={{ scale: 1.2 }}
			transition={{
				repeat: Infinity,
				repeatType: "mirror",
				duration: isMatched ? 1 : heLiked ? 0.125 : 0.75,
			}}
		>
			{isMatched ? (
				<MessageCircleHeartIcon
					className={cn("size-10 fill-pink-300 stroke-pink-500 stroke-[2.5]")}
				/>
			) : (
				<HeartIcon
					className={cn(
						"size-10 stroke-[3.5]",
						isMatched
							? "fill-pink-300 stroke-pink-500"
							: heLiked
								? "fill-pink-300 stroke-pink-500"
								: isLiked
									? "fill-emerald-300 stroke-emerald-500"
									: "fill-pink-300 stroke-emerald-500",
					)}
				/>
			)}
		</motion.div>
	)
}
